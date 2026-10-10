import Peer from 'peerjs';

/**
 * Service untuk sinkronisasi Realtime Online Photobox (Couple / LDR Mode)
 * Mendukung WebRTC P2P DataChannel (Remote Internet) + BroadcastChannel (Multi-tab local).
 */

const ROOM_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateRoomCode(length = 6) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ROOM_CODE_CHARS.charAt(Math.floor(Math.random() * ROOM_CODE_CHARS.length));
  }
  return result;
}

export class RoomManager {
  constructor() {
    this.peer = null;
    this.connection = null;
    this.broadcastChannel = null;
    this.role = null; // 'HOST' | 'PARTNER'
    this.roomCode = null;
    this.userName = '';
    this.isReady = false;

    this.listeners = {
      stateChange: [],
      participantChange: [],
      photoReceived: [],
      countdownSync: [],
      error: [],
      connectionStatus: []
    };

    // State internal room
    this.roomState = {
      roomCode: '',
      status: 'IDLE', // 'WAITING_PARTNER' | 'READY' | 'COUNTDOWN' | 'CAPTURING' | 'UPLOADING' | 'COMPLETED'
      templateId: '',
      photoCount: 4,
      slotAssignments: {}, // { 'slot-1': 'HOST', 'slot-2': 'PARTNER', ... }
      currentSlotIndex: 0,
      photos: {}, // { 'slot-1': dataUrl, ... }
      participants: {
        host: { name: '', connected: false, ready: false },
        partner: { name: '', connected: false, ready: false }
      },
      lastUpdated: Date.now()
    };
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  notify(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in room listener [${event}]:`, e);
        }
      });
    }
  }

  setConnectionStatus(status, message = '') {
    this.notify('connectionStatus', { status, message });
  }

  // Helper untuk setup local BroadcastChannel (sinkronisasi multi-tab)
  setupBroadcastChannel(roomCode) {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (this.broadcastChannel) {
        this.broadcastChannel.close();
      }
      this.broadcastChannel = new BroadcastChannel(`photobox_ldr_room_${roomCode}`);
      this.broadcastChannel.onmessage = (event) => {
        const msg = event.data;
        if (!msg || msg.senderRole === this.role) return;
        this.handleIncomingMessage(msg);
      };
    }
  }

  // Mengirim pesan ke partner (lewat P2P WebRTC dan BroadcastChannel)
  sendMessage(type, payload = {}) {
    const message = {
      type,
      senderRole: this.role,
      roomCode: this.roomCode,
      timestamp: Date.now(),
      payload
    };

    // Kirim via WebRTC P2P DataChannel
    if (this.connection && this.connection.open) {
      try {
        this.connection.send(message);
      } catch (e) {
        console.warn('Gagal kirim via WebRTC:', e);
      }
    }

    // Kirim via BroadcastChannel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(message);
      } catch (e) {
        console.warn('Gagal kirim via BroadcastChannel:', e);
      }
    }
  }

  // Handle pesan yang masuk dari partner
  handleIncomingMessage(msg) {
    const { type, payload, senderRole } = msg;

    switch (type) {
      case 'PARTICIPANT_JOINED': {
        this.roomState.participants.partner = {
          name: payload.partnerName || 'Partner',
          connected: true,
          ready: true
        };
        this.roomState.status = 'READY';
        this.notify('stateChange', { ...this.roomState });
        this.notify('participantChange', this.roomState.participants);
        this.setConnectionStatus('CONNECTED', `Partner "${payload.partnerName}" telah terhubung.`);
        
        // Host membalas dengan state room terkini
        if (this.role === 'HOST') {
          this.sendMessage('ROOM_STATE_SYNC', { roomState: this.roomState });
        }
        break;
      }

      case 'ROOM_STATE_SYNC': {
        if (payload.roomState) {
          this.roomState = { ...this.roomState, ...payload.roomState };
          this.notify('stateChange', { ...this.roomState });
          this.notify('participantChange', this.roomState.participants);
        }
        break;
      }

      case 'UPDATE_TEMPLATE': {
        this.roomState.templateId = payload.templateId;
        this.roomState.photoCount = payload.photoCount;
        this.roomState.slotAssignments = payload.slotAssignments;
        this.notify('stateChange', { ...this.roomState });
        break;
      }

      case 'START_COUNTDOWN': {
        this.roomState.status = 'COUNTDOWN';
        this.roomState.currentSlotIndex = payload.slotIndex;
        this.notify('countdownSync', payload);
        this.notify('stateChange', { ...this.roomState });
        break;
      }

      case 'PHOTO_CAPTURED': {
        const { slotId, photoDataUrl, nextSlotIndex, isCompleted } = payload;
        this.roomState.photos[slotId] = photoDataUrl;
        this.roomState.currentSlotIndex = nextSlotIndex;
        if (isCompleted) {
          this.roomState.status = 'COMPLETED';
        } else {
          this.roomState.status = 'READY';
        }
        this.notify('photoReceived', { slotId, photoDataUrl, role: senderRole });
        this.notify('stateChange', { ...this.roomState });
        break;
      }

      case 'RETAKE_ROOM': {
        this.roomState.photos = {};
        this.roomState.currentSlotIndex = 0;
        this.roomState.status = 'READY';
        this.notify('stateChange', { ...this.roomState });
        break;
      }

      case 'PARTICIPANT_LEFT': {
        if (senderRole === 'HOST') {
          this.roomState.participants.host.connected = false;
        } else {
          this.roomState.participants.partner.connected = false;
        }
        this.roomState.status = 'WAITING_PARTNER';
        this.notify('stateChange', { ...this.roomState });
        this.notify('participantChange', this.roomState.participants);
        this.setConnectionStatus('DISCONNECTED', 'Partner terputus dari room.');
        break;
      }

      default:
        break;
    }
  }

  /**
   * Membuat Room Baru sebagai HOST
   */
  async createRoom(hostName = 'Host', initialTemplate, initialPhotoCount = 4) {
    this.role = 'HOST';
    this.userName = hostName || 'Host';
    const roomCode = generateRoomCode(6);
    this.roomCode = roomCode;

    // Default slot assignment: alternating (Slot 1 -> HOST, Slot 2 -> PARTNER, etc.)
    const slotAssignments = {};
    const slots = initialTemplate?.slots || [];
    slots.forEach((s, idx) => {
      slotAssignments[s.id] = idx % 2 === 0 ? 'HOST' : 'PARTNER';
    });

    this.roomState = {
      roomCode,
      status: 'WAITING_PARTNER',
      templateId: initialTemplate?.id || 'woodz-day-6slot',
      photoCount: initialPhotoCount,
      slotAssignments,
      currentSlotIndex: 0,
      photos: {},
      participants: {
        host: { name: this.userName, connected: true, ready: true },
        partner: { name: '', connected: false, ready: false }
      },
      lastUpdated: Date.now()
    };

    this.setupBroadcastChannel(roomCode);
    this.setConnectionStatus('CONNECTING', 'Menyiapkan Room Online...');

    try {
      const peerId = `photobox-room-${roomCode.toLowerCase()}-host`;
      this.peer = new Peer(peerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      this.peer.on('open', (id) => {
        this.setConnectionStatus('WAITING_PARTNER', `Room aktif: ${roomCode}. Menunggu partner bergabung...`);
        this.notify('stateChange', { ...this.roomState });
      });

      this.peer.on('connection', (conn) => {
        this.connection = conn;
        this.setupConnectionHandlers(conn);
      });

      this.peer.on('error', (err) => {
        console.warn('Peer error (host):', err);
        // Tetap jalan via broadcastchannel / fallback
        this.setConnectionStatus('WAITING_PARTNER', `Room aktif: ${roomCode}. (Ready for multi-tab/P2P)`);
      });

    } catch (err) {
      console.warn('Inisialisasi WebRTC host fallback:', err);
    }

    return {
      roomCode,
      shareUrl: `${window.location.origin}${window.location.pathname}?room=${roomCode}`
    };
  }

  /**
   * Bergabung ke Room sebagai PARTNER
   */
  async joinRoom(roomCode, partnerName = 'Partner') {
    const code = (roomCode || '').toUpperCase().trim();
    if (!code || code.length < 4) {
      throw new Error('Kode room tidak valid');
    }

    this.role = 'PARTNER';
    this.userName = partnerName || 'Partner';
    this.roomCode = code;

    this.setupBroadcastChannel(code);
    this.setConnectionStatus('CONNECTING', `Menghubungkan ke room ${code}...`);

    try {
      const myPeerId = `photobox-room-${code.toLowerCase()}-partner-${Date.now().toString(36)}`;
      const targetHostPeerId = `photobox-room-${code.toLowerCase()}-host`;

      this.peer = new Peer(myPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      this.peer.on('open', () => {
        // Hubungkan ke host peer
        const conn = this.peer.connect(targetHostPeerId, { reliable: true });
        this.connection = conn;
        this.setupConnectionHandlers(conn);
      });

      this.peer.on('error', (err) => {
        console.warn('Peer error (partner):', err);
      });

    } catch (err) {
      console.warn('Inisialisasi WebRTC partner fallback:', err);
    }

    // Broadcast penggabungan
    setTimeout(() => {
      this.sendMessage('PARTICIPANT_JOINED', { partnerName: this.userName });
      this.setConnectionStatus('CONNECTED', `Terhubung ke Room ${code}`);
    }, 600);

    return { roomCode: code };
  }

  setupConnectionHandlers(conn) {
    conn.on('open', () => {
      if (this.role === 'PARTNER') {
        this.sendMessage('PARTICIPANT_JOINED', { partnerName: this.userName });
      }
    });

    conn.on('data', (data) => {
      this.handleIncomingMessage(data);
    });

    conn.on('close', () => {
      this.setConnectionStatus('DISCONNECTED', 'Koneksi P2P ditutup.');
    });

    conn.on('error', (err) => {
      console.warn('Koneksi WebRTC error:', err);
    });
  }

  /**
   * Mengubah template dan pembagian slot (oleh Host)
   */
  updateTemplate(template, photoCount, customAssignments = null) {
    const slots = template?.slots || [];
    let slotAssignments = customAssignments;

    if (!slotAssignments) {
      slotAssignments = {};
      slots.forEach((s, idx) => {
        slotAssignments[s.id] = idx % 2 === 0 ? 'HOST' : 'PARTNER';
      });
    }

    this.roomState.templateId = template.id;
    this.roomState.photoCount = photoCount || slots.length;
    this.roomState.slotAssignments = slotAssignments;

    this.sendMessage('UPDATE_TEMPLATE', {
      templateId: template.id,
      photoCount: this.roomState.photoCount,
      slotAssignments
    });

    this.notify('stateChange', { ...this.roomState });
  }

  /**
   * Memulai countdown untuk slot tertentu
   */
  startSlotCapture(slotIndex, seconds = 3) {
    this.roomState.status = 'COUNTDOWN';
    this.roomState.currentSlotIndex = slotIndex;

    const payload = {
      slotIndex,
      seconds,
      startTime: Date.now()
    };

    this.sendMessage('START_COUNTDOWN', payload);
    this.notify('countdownSync', payload);
    this.notify('stateChange', { ...this.roomState });
  }

  /**
   * Menyimpan dan broadcast foto yang baru diambil
   */
  submitSlotPhoto(slotId, photoDataUrl, totalSlots) {
    this.roomState.photos[slotId] = photoDataUrl;
    const nextSlotIndex = this.roomState.currentSlotIndex + 1;
    const isCompleted = Object.keys(this.roomState.photos).length >= totalSlots || nextSlotIndex >= totalSlots;

    this.roomState.currentSlotIndex = nextSlotIndex;
    this.roomState.status = isCompleted ? 'COMPLETED' : 'READY';

    this.sendMessage('PHOTO_CAPTURED', {
      slotId,
      photoDataUrl,
      nextSlotIndex,
      isCompleted
    });

    this.notify('photoReceived', { slotId, photoDataUrl, role: this.role });
    this.notify('stateChange', { ...this.roomState });
  }

  /**
   * Retake / reset foto di room
   */
  retakeAll() {
    this.roomState.photos = {};
    this.roomState.currentSlotIndex = 0;
    this.roomState.status = 'READY';

    this.sendMessage('RETAKE_ROOM', {});
    this.notify('stateChange', { ...this.roomState });
  }

  /**
   * Keluar dari room
   */
  leaveRoom() {
    this.sendMessage('PARTICIPANT_LEFT', {});

    if (this.connection) {
      try { this.connection.close(); } catch (e) {}
      this.connection = null;
    }
    if (this.peer) {
      try { this.peer.destroy(); } catch (e) {}
      this.peer = null;
    }
    if (this.broadcastChannel) {
      try { this.broadcastChannel.close(); } catch (e) {}
      this.broadcastChannel = null;
    }

    this.role = null;
    this.roomCode = null;
    this.isReady = false;
  }
}

export const roomService = new RoomManager();
