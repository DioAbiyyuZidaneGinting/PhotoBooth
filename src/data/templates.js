/**
 * Konfigurasi Template Photobox - Four-Corner Quadrilateral Coordinate System
 *
 * Setiap template memiliki:
 *   - id: string unik, aman untuk URL
 *   - name: nama tampilan yang ramah user
 *   - subtitle: deskripsi tema template
 *   - photoCount: JUMLAH FOTO yang dibutuhkan oleh template ini (3 | 4 | 6)
 *   - image: path publik ke file PNG template asli
 *   - width, height: dimensi asli file PNG template
 *   - backgroundColor: warna latar dasar
 *   - slots: Array konfigurasi photo slot dengan 4 corner points
 *
 * Struktur Slot Four-Corner Points:
 *   points: [
 *     { x: TL_x, y: TL_y }, // 1. Top-Left
 *     { x: TR_x, y: TR_y }, // 2. Top-Right
 *     { x: BR_x, y: BR_y }, // 3. Bottom-Right
 *     { x: BL_x, y: BL_y }  // 4. Bottom-Left
 *   ]
 */

export const TEMPLATES = [
  // ============================================================
  // 4 FOTO (PRIORITAS UTAMA)
  // ============================================================

  {
    id: 'template-4-v4',
    name: 'Template 4',
    subtitle: 'Good Friends • Dark Horror (4 Polaroid Tilted)',
    photoCount: 4,
    image: '/templates/template-4-v4.png',
    width: 1024,
    height: 1536,
    backgroundColor: '#110b0b',
    slots: [
      {
        id: 'slot-1',
        label: 'Foto 1 (Kiri Atas)',
        points: [
          { x: 233, y: 276 },
          { x: 568, y: 338 },
          { x: 503, y: 690 },
          { x: 168, y: 628 }
        ]
      },
      {
        id: 'slot-2',
        label: 'Foto 2 (Kanan Atas)',
        points: [
          { x: 576, y: 394 },
          { x: 898, y: 343 },
          { x: 951, y: 679 },
          { x: 629, y: 730 }
        ]
      },
      {
        id: 'slot-3',
        label: 'Foto 3 (Kiri Bawah)',
        points: [
          { x: 95, y: 804 },
          { x: 439, y: 727 },
          { x: 508, y: 1041 },
          { x: 164, y: 1117 }
        ]
      },
      {
        id: 'slot-4',
        label: 'Foto 4 (Kanan Bawah)',
        points: [
          { x: 601, y: 789 },
          { x: 928, y: 841 },
          { x: 874, y: 1180 },
          { x: 547, y: 1128 }
        ]
      }
    ]
  },

  // ============================================================
  // 3 FOTO
  // ============================================================

  {
    id: 'template-2-v3',
    name: 'Template 2',
    subtitle: 'Wanted Dead or Alive • Western (3 Horizontal Strips)',
    photoCount: 3,
    image: '/templates/template-2-v3.png',
    width: 946,
    height: 1663,
    backgroundColor: '#d4a96b',
    slots: [
      {
        id: 'slot-1',
        label: 'Foto 1 (Atas)',
        points: [
          { x: 261, y: 311 },
          { x: 718, y: 311 },
          { x: 717, y: 637 },
          { x: 262, y: 637 }
        ]
      },
      {
        id: 'slot-2',
        label: 'Foto 2 (Tengah)',
        points: [
          { x: 266, y: 710 },
          { x: 718, y: 708 },
          { x: 717, y: 1022 },
          { x: 263, y: 1020 }
        ]
      },
      {
        id: 'slot-3',
        label: 'Foto 3 (Bawah)',
        points: [
          { x: 256, y: 1088 },
          { x: 728, y: 1086 },
          { x: 717, y: 1376 },
          { x: 264, y: 1378 }
        ]
      }
    ]
  },

  {
    id: 'template-3-v3',
    name: 'Template 3',
    subtitle: 'The 1975 • Diagonal Film Strip',
    photoCount: 3,
    image: '/templates/template-3-v3.png',
    width: 1152,
    height: 2048,
    backgroundColor: '#f5f2eb',
    slots: [
      {
        id: 'slot-1',
        label: 'Foto 1 (Atas)',
        points: [
          { x: 297, y: 727 },
          { x: 722, y: 765 },
          { x: 684, y: 1182 },
          { x: 259, y: 1144 }
        ]
      },
      {
        id: 'slot-2',
        label: 'Foto 2 (Tengah)',
        points: [
          { x: 258, y: 1171 },
          { x: 683, y: 1209 },
          { x: 645, y: 1625 },
          { x: 222, y: 1586 }
        ]
      },
      {
        id: 'slot-3',
        label: 'Foto 3 (Bawah)',
        points: [
          { x: 218, y: 1617 },
          { x: 642, y: 1655 },
          { x: 607, y: 2047 },
          { x: 181, y: 2035 }
        ]
      }
    ]
  },

  // ============================================================
  // 6 FOTO
  // ============================================================

  {
    id: 'template-2-v6',
    name: 'Template 2',
    subtitle: 'Wanted Dead or Alive • Western (6 Grid)',
    photoCount: 6,
    image: '/templates/template-2-v6.png',
    width: 1024,
    height: 1536,
    backgroundColor: '#d4a96b',
    slots: [
      {
        id: 'slot-1',
        label: 'Foto 1 (Kiri Atas)',
        points: [
          { x: 64, y: 367 },
          { x: 334, y: 368 },
          { x: 335, y: 710 },
          { x: 64, y: 713 }
        ]
      },
      {
        id: 'slot-2',
        label: 'Foto 2 (Tengah Atas)',
        points: [
          { x: 383, y: 368 },
          { x: 651, y: 368 },
          { x: 652, y: 705 },
          { x: 384, y: 713 }
        ]
      },
      {
        id: 'slot-3',
        label: 'Foto 3 (Kanan Atas)',
        points: [
          { x: 701, y: 371 },
          { x: 969, y: 368 },
          { x: 962, y: 713 },
          { x: 709, y: 713 }
        ]
      },
      {
        id: 'slot-4',
        label: 'Foto 4 (Kiri Bawah)',
        points: [
          { x: 64, y: 788 },
          { x: 334, y: 788 },
          { x: 333, y: 1126 },
          { x: 64, y: 1134 }
        ]
      },
      {
        id: 'slot-5',
        label: 'Foto 5 (Tengah Bawah)',
        points: [
          { x: 385, y: 790 },
          { x: 652, y: 788 },
          { x: 645, y: 1134 },
          { x: 384, y: 1126 }
        ]
      },
      {
        id: 'slot-6',
        label: 'Foto 6 (Kanan Bawah)',
        points: [
          { x: 701, y: 788 },
          { x: 962, y: 788 },
          { x: 969, y: 1133 },
          { x: 703, y: 1128 }
        ]
      }
    ]
  },

  {
    id: 'template-4-v6',
    name: 'Template 4',
    subtitle: 'Good Friends • Dark Horror (6 Polaroid Tilted)',
    photoCount: 6,
    image: '/templates/template-4-v6.png',
    width: 1024,
    height: 1536,
    backgroundColor: '#110b0b',
    slots: [
      {
        id: 'slot-1',
        label: 'Foto 1 (Kiri Atas)',
        points: [
          { x: 205, y: 250 },
          { x: 466, y: 218 },
          { x: 505, y: 475 },
          { x: 214, y: 545 }
        ]
      },
      {
        id: 'slot-2',
        label: 'Foto 2 (Kanan Atas)',
        points: [
          { x: 590, y: 268 },
          { x: 866, y: 289 },
          { x: 852, y: 548 },
          { x: 546, y: 517 }
        ]
      },
      {
        id: 'slot-3',
        label: 'Foto 3 (Kiri Tengah)',
        points: [
          { x: 212, y: 624 },
          { x: 491, y: 637 },
          { x: 467, y: 908 },
          { x: 182, y: 920 }
        ]
      },
      {
        id: 'slot-4',
        label: 'Foto 4 (Kanan Tengah)',
        points: [
          { x: 582, y: 624 },
          { x: 869, y: 679 },
          { x: 797, y: 951 },
          { x: 544, y: 906 }
        ]
      },
      {
        id: 'slot-5',
        label: 'Foto 5 (Kiri Bawah)',
        points: [
          { x: 156, y: 1076 },
          { x: 433, y: 1008 },
          { x: 470, y: 1288 },
          { x: 184, y: 1312 }
        ]
      },
      {
        id: 'slot-6',
        label: 'Foto 6 (Kanan Bawah)',
        points: [
          { x: 512, y: 1042 },
          { x: 832, y: 1011 },
          { x: 856, y: 1284 },
          { x: 587, y: 1317 }
        ]
      }
    ]
  },

  {
    id: 'template-woodz-v6',
    name: 'Template Woodz',
    subtitle: 'Classic Vintage • 6 Photo Collage',
    photoCount: 6,
    image: '/templates/template-woodz-v6.png',
    width: 800,
    height: 1200,
    backgroundColor: '#1a1a2e',
    slots: [
      {
        id: 'slot-1',
        label: 'Foto 1 (Kiri Atas)',
        points: [
          { x: 50, y: 120 },
          { x: 375, y: 120 },
          { x: 375, y: 440 },
          { x: 50, y: 440 }
        ]
      },
      {
        id: 'slot-2',
        label: 'Foto 2 (Kanan Atas)',
        points: [
          { x: 425, y: 120 },
          { x: 750, y: 120 },
          { x: 750, y: 440 },
          { x: 425, y: 440 }
        ]
      },
      {
        id: 'slot-3',
        label: 'Foto 3 (Kiri Tengah)',
        points: [
          { x: 50, y: 470 },
          { x: 375, y: 470 },
          { x: 375, y: 790 },
          { x: 50, y: 790 }
        ]
      },
      {
        id: 'slot-4',
        label: 'Foto 4 (Kanan Tengah)',
        points: [
          { x: 425, y: 470 },
          { x: 750, y: 470 },
          { x: 750, y: 790 },
          { x: 425, y: 790 }
        ]
      },
      {
        id: 'slot-5',
        label: 'Foto 5 (Kiri Bawah)',
        points: [
          { x: 50, y: 820 },
          { x: 375, y: 820 },
          { x: 375, y: 1140 },
          { x: 50, y: 1140 }
        ]
      },
      {
        id: 'slot-6',
        label: 'Foto 6 (Kanan Bawah)',
        points: [
          { x: 425, y: 820 },
          { x: 750, y: 820 },
          { x: 750, y: 1140 },
          { x: 425, y: 1140 }
        ]
      }
    ]
  }
];

/**
 * Mendapatkan daftar jumlah foto yang tersedia (berdasarkan template yang ada)
 */
export const AVAILABLE_PHOTO_COUNTS = [...new Set(TEMPLATES.map(t => t.photoCount))].sort((a, b) => a - b);

/**
 * Filter template berdasarkan jumlah foto
 * @param {number} photoCount
 * @returns {Array}
 */
export function getTemplatesByPhotoCount(photoCount) {
  return TEMPLATES.filter(t => t.photoCount === photoCount);
}
