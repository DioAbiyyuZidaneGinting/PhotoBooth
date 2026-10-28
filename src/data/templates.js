/**
 * Konfigurasi Template Photobox - Multi-Shape Slot System
 *
 * Setiap template memiliki:
 *   - id: string unik, aman untuk URL
 *   - name: nama tampilan yang ramah user
 *   - subtitle: deskripsi tema template
 *   - photoCount: JUMLAH FOTO yang dibutuhkan oleh template ini (2 | 3 | 4 | 5 | 6)
 *   - image: path publik ke file PNG/JPEG template asli
 *   - width, height: dimensi asli file template
 *   - backgroundColor: warna latar dasar
 *   - isTransparentFrame: boolean (true jika frame memiliki slot transparan yang harus berada di atas foto)
 *   - slots: Array konfigurasi photo slot dengan properti spesifik per slot
 *
 * Properti Slot:
 *   - id: identifier slot
 *   - label: label slot
 *   - x, y: posisi slot (koordinat pixel template asli)
 *   - width, height: ukuran slot (pixel)
 *   - shape: 'rect' | 'roundedRect' | 'polygon'
 *   - radius: radius sudut jika shape === 'roundedRect' (pixel)
 *   - rotation: sudut rotasi slot (derajat)
 *   - fit: 'cover' | 'contain'
 *   - points: 4-corner polygon points [TL, TR, BR, BL] untuk backward compatibility & transformasi miring
 */

export const TEMPLATES = [
  // ============================================================
  // 2 FOTO (11 Templates)
  // ============================================================
  {
    id: "template-couple-v2",
    name: "Couple Duo Strip",
    subtitle: "Minimalist Duo • Vertical Split Strip (2 Foto)",
    photoCount: 2,
    layoutType: "strip-vertical",
    image: "/templates/template-couple-v2.png",
    width: 800,
    height: 1200,
    backgroundColor: "#f5f3ed",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 60,
        y: 120,
        width: 680,
        height: 460,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 60, y: 120 },
          { x: 740, y: 120 },
          { x: 740, y: 580 },
          { x: 60, y: 580 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Bawah)",
        x: 60,
        y: 620,
        width: 680,
        height: 460,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 60, y: 620 },
          { x: 740, y: 620 },
          { x: 740, y: 1080 },
          { x: 60, y: 1080 }
        ]
      }
    ]
  },

  {
    id: "template-5-v2",
    name: "Template 5 (Versi 2)",
    subtitle: "Pastel Cute Duo • 2 Photo Square",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-5-v2.jpeg",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 302,
        y: 272,
        width: 660,
        height: 401,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 302, y: 272 },
          { x: 962, y: 272 },
          { x: 962, y: 673 },
          { x: 302, y: 673 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Bawah)",
        x: 302,
        y: 755,
        width: 660,
        height: 398,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 302, y: 755 },
          { x: 962, y: 755 },
          { x: 962, y: 1153 },
          { x: 302, y: 1153 }
        ]
      }
    ]
  },

  {
    id: "template-6-v2",
    name: "Template 6 (Versi 2)",
    subtitle: "Sweet Memory Duo • 2 Photo Square",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-6-v2.jpeg",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 326,
        y: 140,
        width: 612,
        height: 391,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 326, y: 140 },
          { x: 938, y: 140 },
          { x: 938, y: 531 },
          { x: 326, y: 531 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Bawah)",
        x: 326,
        y: 644,
        width: 612,
        height: 362,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 326, y: 644 },
          { x: 938, y: 644 },
          { x: 938, y: 1006 },
          { x: 326, y: 1006 }
        ]
      }
    ]
  },

  {
    id: "template-7-v2",
    name: "Template 7 (Versi 2)",
    subtitle: "Cherry Blossom Duo • 2 Photo Square",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-7-v2.jpeg",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 313,
        y: 167,
        width: 637,
        height: 392,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 313, y: 167 },
          { x: 950, y: 167 },
          { x: 950, y: 559 },
          { x: 313, y: 559 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Bawah)",
        x: 313,
        y: 602,
        width: 637,
        height: 386,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 313, y: 602 },
          { x: 950, y: 602 },
          { x: 950, y: 988 },
          { x: 313, y: 988 }
        ]
      }
    ]
  },

  {
    id: "template-7-v2-png",
    name: "Template 7 (Versi 2)",
    subtitle: "Template 7 (Versi 2) • Photobooth (2 Foto)",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-7-v2-png.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: true,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 404,
        y: 100,
        width: 461,
        height: 513,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 404, y: 100 },
          { x: 865, y: 100 },
          { x: 865, y: 613 },
          { x: 404, y: 613 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 404,
        y: 656,
        width: 461,
        height: 513,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 404, y: 656 },
          { x: 865, y: 656 },
          { x: 865, y: 1169 },
          { x: 404, y: 1169 }
        ]
      }
    ]
  },

  {
    id: "template-8-v2",
    name: "Template 8 (Versi 2)",
    subtitle: "Y2K Pink Duo • 2 Photo Square",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-8-v2.jpeg",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 342,
        y: 202,
        width: 581,
        height: 395,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 342, y: 202 },
          { x: 923, y: 202 },
          { x: 923, y: 597 },
          { x: 342, y: 597 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Bawah)",
        x: 342,
        y: 640,
        width: 581,
        height: 376,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 342, y: 640 },
          { x: 923, y: 640 },
          { x: 923, y: 1016 },
          { x: 342, y: 1016 }
        ]
      }
    ]
  },

  {
    id: "template-9-v2",
    name: "Template 9 (Versi 2)",
    subtitle: "Starry Dream Duo • 2 Photo Square",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-9-v2.jpeg",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 319,
        y: 256,
        width: 643,
        height: 410,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 319, y: 256 },
          { x: 962, y: 256 },
          { x: 962, y: 666 },
          { x: 319, y: 666 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Bawah)",
        x: 319,
        y: 708,
        width: 643,
        height: 420,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 319, y: 708 },
          { x: 962, y: 708 },
          { x: 962, y: 1128 },
          { x: 319, y: 1128 }
        ]
      }
    ]
  },

  {
    id: "template-10-v2",
    name: "Template 10 (Versi 2)",
    subtitle: "Retro Checker Duo • 2 Photo Square",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-10-v2.jpeg",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 333,
        y: 182,
        width: 597,
        height: 376,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 333, y: 182 },
          { x: 930, y: 182 },
          { x: 930, y: 558 },
          { x: 333, y: 558 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Bawah)",
        x: 333,
        y: 633,
        width: 597,
        height: 342,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 333, y: 633 },
          { x: 930, y: 633 },
          { x: 930, y: 975 },
          { x: 333, y: 975 }
        ]
      }
    ]
  },

  {
    id: "template-10-v2-png",
    name: "Template 10 (Versi 2)",
    subtitle: "Template 10 (Versi 2) • Photobooth (2 Foto)",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-10-v2-png.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 464,
        y: 164,
        width: 329,
        height: 449,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 464, y: 164 },
          { x: 793, y: 164 },
          { x: 793, y: 613 },
          { x: 464, y: 613 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 464,
        y: 664,
        width: 329,
        height: 453,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 464, y: 664 },
          { x: 793, y: 664 },
          { x: 793, y: 1117 },
          { x: 464, y: 1117 }
        ]
      }
    ]
  },

  {
    id: "template-12-v2",
    name: "Template 12 (Versi 2)",
    subtitle: "Template 12 (Versi 2) • Photobooth (2 Foto)",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-12-v2.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 392,
        y: 224,
        width: 477,
        height: 389,
        shape: "roundedRect",
        radius: 14,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 392, y: 224 },
          { x: 869, y: 224 },
          { x: 869, y: 613 },
          { x: 392, y: 613 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 392,
        y: 656,
        width: 477,
        height: 393,
        shape: "roundedRect",
        radius: 14,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 392, y: 656 },
          { x: 869, y: 656 },
          { x: 869, y: 1049 },
          { x: 392, y: 1049 }
        ]
      }
    ]
  },

  {
    id: "template-28-v2",
    name: "Template 28 (Versi 2)",
    subtitle: "Template 28 (Versi 2) • Photobooth (2 Foto)",
    photoCount: 2,
    layoutType: "collage-square",
    image: "/templates/template-28-v2.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 352,
        y: 296,
        width: 557,
        height: 381,
        shape: "roundedRect",
        radius: 17,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 352, y: 296 },
          { x: 909, y: 296 },
          { x: 909, y: 677 },
          { x: 352, y: 677 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 352,
        y: 724,
        width: 557,
        height: 381,
        shape: "roundedRect",
        radius: 17,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 352, y: 724 },
          { x: 909, y: 724 },
          { x: 909, y: 1105 },
          { x: 352, y: 1105 }
        ]
      }
    ]
  },

  // ============================================================
  // 3 FOTO (16 Templates)
  // ============================================================
  {
    id: "template-2-v3",
    name: "Template 2 (Wanted)",
    subtitle: "Wanted Dead or Alive • Western (3 Horizontal Strips)",
    photoCount: 3,
    layoutType: "strip-vertical",
    image: "/templates/template-2-v3.png",
    width: 946,
    height: 1663,
    backgroundColor: "#d4a96b",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 263,
        y: 311,
        width: 453,
        height: 324,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 263, y: 311 },
          { x: 716, y: 311 },
          { x: 716, y: 635 },
          { x: 263, y: 635 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Tengah)",
        x: 263,
        y: 709,
        width: 453,
        height: 313,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 263, y: 709 },
          { x: 716, y: 709 },
          { x: 716, y: 1022 },
          { x: 263, y: 1022 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Bawah)",
        x: 263,
        y: 1088,
        width: 453,
        height: 288,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 263, y: 1088 },
          { x: 716, y: 1088 },
          { x: 716, y: 1376 },
          { x: 263, y: 1376 }
        ]
      }
    ]
  },

  {
    id: "template-3-v3",
    name: "Template 3",
    subtitle: "The 1975 • Diagonal Film Strip",
    photoCount: 3,
    layoutType: "strip-vertical",
    image: "/templates/template-3-v3.png",
    width: 1152,
    height: 2048,
    backgroundColor: "#f5f2eb",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 259,
        y: 727,
        width: 463,
        height: 455,
        shape: "polygon",
        radius: 0,
        rotation: 5,
        fit: "cover",
        points: [
          { x: 297, y: 727 },
          { x: 722, y: 765 },
          { x: 684, y: 1182 },
          { x: 259, y: 1144 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Tengah)",
        x: 222,
        y: 1171,
        width: 461,
        height: 454,
        shape: "polygon",
        radius: 0,
        rotation: 5,
        fit: "cover",
        points: [
          { x: 258, y: 1171 },
          { x: 683, y: 1209 },
          { x: 645, y: 1625 },
          { x: 222, y: 1586 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Bawah)",
        x: 181,
        y: 1617,
        width: 461,
        height: 430,
        shape: "polygon",
        radius: 0,
        rotation: 5,
        fit: "cover",
        points: [
          { x: 218, y: 1617 },
          { x: 642, y: 1655 },
          { x: 607, y: 2047 },
          { x: 181, y: 2035 }
        ]
      }
    ]
  },

  {
    id: "template-5-v3",
    name: "Template 5 (Versi 3)",
    subtitle: "Classic Strip • Vertical Triplets (3 Foto)",
    photoCount: 3,
    layoutType: "strip-vertical",
    image: "/templates/template-5-v3.png",
    width: 582,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Atas)",
        x: 116,
        y: 185,
        width: 347,
        height: 278,
        shape: "roundedRect",
        radius: 15,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 116, y: 185 },
          { x: 463, y: 185 },
          { x: 463, y: 463 },
          { x: 116, y: 463 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Tengah)",
        x: 117,
        y: 516,
        width: 346,
        height: 272,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 117, y: 516 },
          { x: 463, y: 516 },
          { x: 463, y: 788 },
          { x: 117, y: 788 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Bawah)",
        x: 117,
        y: 842,
        width: 346,
        height: 278,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 117, y: 842 },
          { x: 463, y: 842 },
          { x: 463, y: 1120 },
          { x: 117, y: 1120 }
        ]
      }
    ]
  },

  {
    id: "template-11-v3",
    name: "Template 11 (Versi 3)",
    subtitle: "Template 11 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-11-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 488,
        y: 204,
        width: 277,
        height: 261,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 488, y: 204 },
          { x: 765, y: 204 },
          { x: 765, y: 465 },
          { x: 488, y: 465 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 492,
        y: 544,
        width: 273,
        height: 237,
        shape: "roundedRect",
        radius: 43,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 492, y: 544 },
          { x: 765, y: 544 },
          { x: 765, y: 781 },
          { x: 492, y: 781 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 492,
        y: 860,
        width: 273,
        height: 249,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 492, y: 860 },
          { x: 765, y: 860 },
          { x: 765, y: 1109 },
          { x: 492, y: 1109 }
        ]
      }
    ]
  },

  {
    id: "template-13-v3",
    name: "Template 13 (Versi 3)",
    subtitle: "Template 13 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-13-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 341,
        y: 147,
        width: 576,
        height: 365,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 341, y: 147 },
          { x: 917, y: 147 },
          { x: 917, y: 512 },
          { x: 341, y: 512 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 301,
        y: 566,
        width: 307,
        height: 444,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 301, y: 566 },
          { x: 608, y: 566 },
          { x: 608, y: 1010 },
          { x: 301, y: 1010 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 650,
        y: 566,
        width: 289,
        height: 447,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 650, y: 566 },
          { x: 939, y: 566 },
          { x: 939, y: 1013 },
          { x: 650, y: 1013 }
        ]
      }
    ]
  },

  {
    id: "template-22-v3",
    name: "Template 22 (Versi 3)",
    subtitle: "Template 22 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-22-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 440,
        y: 284,
        width: 429,
        height: 253,
        shape: "roundedRect",
        radius: 24,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 284 },
          { x: 869, y: 284 },
          { x: 869, y: 537 },
          { x: 440, y: 537 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 440,
        y: 564,
        width: 429,
        height: 249,
        shape: "roundedRect",
        radius: 27,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 564 },
          { x: 869, y: 564 },
          { x: 869, y: 813 },
          { x: 440, y: 813 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 440,
        y: 852,
        width: 429,
        height: 249,
        shape: "roundedRect",
        radius: 22,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 852 },
          { x: 869, y: 852 },
          { x: 869, y: 1101 },
          { x: 440, y: 1101 }
        ]
      }
    ]
  },

  {
    id: "template-23-v3",
    name: "Template 23 (Versi 3)",
    subtitle: "Template 23 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-23-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 348,
        y: 304,
        width: 573,
        height: 261,
        shape: "roundedRect",
        radius: 54,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 348, y: 304 },
          { x: 921, y: 304 },
          { x: 921, y: 565 },
          { x: 348, y: 565 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 348,
        y: 620,
        width: 573,
        height: 261,
        shape: "roundedRect",
        radius: 64,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 348, y: 620 },
          { x: 921, y: 620 },
          { x: 921, y: 881 },
          { x: 348, y: 881 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 348,
        y: 932,
        width: 573,
        height: 265,
        shape: "roundedRect",
        radius: 64,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 348, y: 932 },
          { x: 921, y: 932 },
          { x: 921, y: 1197 },
          { x: 348, y: 1197 }
        ]
      }
    ]
  },

  {
    id: "template-28-v3",
    name: "Template 28 (Versi 3)",
    subtitle: "Template 28 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-28-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 408,
        y: 300,
        width: 453,
        height: 249,
        shape: "roundedRect",
        radius: 19,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 300 },
          { x: 861, y: 300 },
          { x: 861, y: 549 },
          { x: 408, y: 549 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 404,
        y: 580,
        width: 457,
        height: 281,
        shape: "roundedRect",
        radius: 17,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 404, y: 580 },
          { x: 861, y: 580 },
          { x: 861, y: 861 },
          { x: 404, y: 861 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 408,
        y: 872,
        width: 453,
        height: 257,
        shape: "roundedRect",
        radius: 18,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 872 },
          { x: 861, y: 872 },
          { x: 861, y: 1129 },
          { x: 408, y: 1129 }
        ]
      }
    ]
  },

  {
    id: "template-30-v3",
    name: "Template 30 (Versi 3)",
    subtitle: "Template 30 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-30-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 440,
        y: 244,
        width: 385,
        height: 273,
        shape: "roundedRect",
        radius: 34,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 244 },
          { x: 825, y: 244 },
          { x: 825, y: 517 },
          { x: 440, y: 517 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 440,
        y: 560,
        width: 385,
        height: 273,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 560 },
          { x: 825, y: 560 },
          { x: 825, y: 833 },
          { x: 440, y: 833 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 440,
        y: 872,
        width: 385,
        height: 265,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 872 },
          { x: 825, y: 872 },
          { x: 825, y: 1137 },
          { x: 440, y: 1137 }
        ]
      }
    ]
  },

  {
    id: "template-32-v3",
    name: "Template 32 (Versi 3)",
    subtitle: "Template 32 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-32-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 436,
        y: 180,
        width: 381,
        height: 277,
        shape: "roundedRect",
        radius: 33,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 436, y: 180 },
          { x: 817, y: 180 },
          { x: 817, y: 457 },
          { x: 436, y: 457 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 436,
        y: 524,
        width: 385,
        height: 249,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 436, y: 524 },
          { x: 821, y: 524 },
          { x: 821, y: 773 },
          { x: 436, y: 773 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 436,
        y: 844,
        width: 385,
        height: 225,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 436, y: 844 },
          { x: 821, y: 844 },
          { x: 821, y: 1069 },
          { x: 436, y: 1069 }
        ]
      }
    ]
  },

  {
    id: "template-33-v3",
    name: "Template 33 (Versi 3)",
    subtitle: "Template 33 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-33-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 480,
        y: 144,
        width: 321,
        height: 245,
        shape: "roundedRect",
        radius: 29,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 480, y: 144 },
          { x: 801, y: 144 },
          { x: 801, y: 389 },
          { x: 480, y: 389 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 480,
        y: 432,
        width: 321,
        height: 245,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 480, y: 432 },
          { x: 801, y: 432 },
          { x: 801, y: 677 },
          { x: 480, y: 677 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 480,
        y: 724,
        width: 321,
        height: 245,
        shape: "roundedRect",
        radius: 47,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 480, y: 724 },
          { x: 801, y: 724 },
          { x: 801, y: 969 },
          { x: 480, y: 969 }
        ]
      }
    ]
  },

  {
    id: "template-36-v3",
    name: "Template 36 (Versi 3)",
    subtitle: "Template 36 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-36-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 444,
        y: 168,
        width: 365,
        height: 237,
        shape: "roundedRect",
        radius: 34,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 444, y: 168 },
          { x: 809, y: 168 },
          { x: 809, y: 405 },
          { x: 444, y: 405 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 448,
        y: 476,
        width: 365,
        height: 233,
        shape: "roundedRect",
        radius: 60,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 448, y: 476 },
          { x: 813, y: 476 },
          { x: 813, y: 709 },
          { x: 448, y: 709 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 456,
        y: 740,
        width: 353,
        height: 261,
        shape: "roundedRect",
        radius: 46,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 456, y: 740 },
          { x: 809, y: 740 },
          { x: 809, y: 1001 },
          { x: 456, y: 1001 }
        ]
      }
    ]
  },

  {
    id: "template-39-v3",
    name: "Template 39 (Versi 3)",
    subtitle: "Template 39 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-39-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 460,
        y: 188,
        width: 341,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 460, y: 188 },
          { x: 801, y: 188 },
          { x: 801, y: 465 },
          { x: 460, y: 465 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 460,
        y: 512,
        width: 341,
        height: 281,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 460, y: 512 },
          { x: 801, y: 512 },
          { x: 801, y: 793 },
          { x: 460, y: 793 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 460,
        y: 840,
        width: 341,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 460, y: 840 },
          { x: 801, y: 840 },
          { x: 801, y: 1117 },
          { x: 460, y: 1117 }
        ]
      }
    ]
  },

  {
    id: "template-40-v3",
    name: "Template 40 (Versi 3)",
    subtitle: "Template 40 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-40-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 356,
        y: 296,
        width: 561,
        height: 257,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 356, y: 296 },
          { x: 917, y: 296 },
          { x: 917, y: 553 },
          { x: 356, y: 553 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 352,
        y: 600,
        width: 565,
        height: 257,
        shape: "roundedRect",
        radius: 21,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 352, y: 600 },
          { x: 917, y: 600 },
          { x: 917, y: 857 },
          { x: 352, y: 857 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 356,
        y: 900,
        width: 561,
        height: 257,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 356, y: 900 },
          { x: 917, y: 900 },
          { x: 917, y: 1157 },
          { x: 356, y: 1157 }
        ]
      }
    ]
  },

  {
    id: "template-43-v3",
    name: "Template 43 (Versi 3)",
    subtitle: "Template 43 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-43-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 388,
        y: 292,
        width: 489,
        height: 217,
        shape: "roundedRect",
        radius: 15,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 292 },
          { x: 877, y: 292 },
          { x: 877, y: 509 },
          { x: 388, y: 509 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 388,
        y: 556,
        width: 489,
        height: 217,
        shape: "roundedRect",
        radius: 16,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 556 },
          { x: 877, y: 556 },
          { x: 877, y: 773 },
          { x: 388, y: 773 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 388,
        y: 808,
        width: 489,
        height: 225,
        shape: "roundedRect",
        radius: 22,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 808 },
          { x: 877, y: 808 },
          { x: 877, y: 1033 },
          { x: 388, y: 1033 }
        ]
      }
    ]
  },

  {
    id: "template-44-v3",
    name: "Template 44 (Versi 3)",
    subtitle: "Template 44 (Versi 3) • Photobooth (3 Foto)",
    photoCount: 3,
    layoutType: "collage-square",
    image: "/templates/template-44-v3.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 412,
        y: 336,
        width: 440,
        height: 240,
        shape: "roundedRect",
        radius: 12,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 412, y: 336 },
          { x: 852, y: 336 },
          { x: 852, y: 576 },
          { x: 412, y: 576 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 412,
        y: 636,
        width: 440,
        height: 244,
        shape: "roundedRect",
        radius: 13,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 412, y: 636 },
          { x: 852, y: 636 },
          { x: 852, y: 880 },
          { x: 412, y: 880 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 412,
        y: 940,
        width: 440,
        height: 244,
        shape: "roundedRect",
        radius: 65,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 412, y: 940 },
          { x: 852, y: 940 },
          { x: 852, y: 1184 },
          { x: 412, y: 1184 }
        ]
      }
    ]
  },

  // ============================================================
  // 4 FOTO (14 Templates)
  // ============================================================
  {
    id: "template-4-v4",
    name: "Template 4",
    subtitle: "Good Friends • Dark Horror (4 Polaroid Tilted)",
    photoCount: 4,
    layoutType: "collage-portrait",
    image: "/templates/template-4-v4.png",
    width: 1024,
    height: 1536,
    backgroundColor: "#110b0b",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Kiri Atas)",
        x: 168,
        y: 276,
        width: 400,
        height: 414,
        shape: "polygon",
        radius: 0,
        rotation: 10,
        fit: "cover",
        points: [
          { x: 233, y: 276 },
          { x: 568, y: 338 },
          { x: 503, y: 690 },
          { x: 168, y: 628 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Kanan Atas)",
        x: 576,
        y: 343,
        width: 375,
        height: 387,
        shape: "polygon",
        radius: 0,
        rotation: -9,
        fit: "cover",
        points: [
          { x: 576, y: 394 },
          { x: 898, y: 343 },
          { x: 951, y: 679 },
          { x: 629, y: 730 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Kiri Bawah)",
        x: 95,
        y: 727,
        width: 413,
        height: 390,
        shape: "polygon",
        radius: 0,
        rotation: -13,
        fit: "cover",
        points: [
          { x: 95, y: 804 },
          { x: 439, y: 727 },
          { x: 508, y: 1041 },
          { x: 164, y: 1117 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4 (Kanan Bawah)",
        x: 547,
        y: 789,
        width: 381,
        height: 391,
        shape: "polygon",
        radius: 0,
        rotation: 9,
        fit: "cover",
        points: [
          { x: 601, y: 789 },
          { x: 928, y: 841 },
          { x: 874, y: 1180 },
          { x: 547, y: 1128 }
        ]
      }
    ]
  },

  {
    id: "template-14-v4",
    name: "Template 14 (Versi 4)",
    subtitle: "Template 14 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-14-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 304,
        y: 236,
        width: 313,
        height: 365,
        shape: "roundedRect",
        radius: 32,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 304, y: 236 },
          { x: 617, y: 236 },
          { x: 617, y: 601 },
          { x: 304, y: 601 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 648,
        y: 236,
        width: 313,
        height: 365,
        shape: "roundedRect",
        radius: 34,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 648, y: 236 },
          { x: 961, y: 236 },
          { x: 961, y: 601 },
          { x: 648, y: 601 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 304,
        y: 632,
        width: 313,
        height: 365,
        shape: "roundedRect",
        radius: 33,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 304, y: 632 },
          { x: 617, y: 632 },
          { x: 617, y: 997 },
          { x: 304, y: 997 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 648,
        y: 632,
        width: 313,
        height: 365,
        shape: "roundedRect",
        radius: 33,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 648, y: 632 },
          { x: 961, y: 632 },
          { x: 961, y: 997 },
          { x: 648, y: 997 }
        ]
      }
    ]
  },

  {
    id: "template-17-v4",
    name: "Template 17 (Versi 4)",
    subtitle: "Case File Edition • 4 Photo Grid",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-17-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Kiri Atas)",
        x: 294,
        y: 224,
        width: 317,
        height: 397,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 294, y: 224 },
          { x: 611, y: 224 },
          { x: 611, y: 621 },
          { x: 294, y: 621 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Kanan Atas)",
        x: 653,
        y: 224,
        width: 316,
        height: 397,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 653, y: 224 },
          { x: 969, y: 224 },
          { x: 969, y: 621 },
          { x: 653, y: 621 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Kiri Bawah)",
        x: 294,
        y: 663,
        width: 317,
        height: 402,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 294, y: 663 },
          { x: 611, y: 663 },
          { x: 611, y: 1065 },
          { x: 294, y: 1065 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4 (Kanan Bawah)",
        x: 653,
        y: 662,
        width: 317,
        height: 403,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 653, y: 662 },
          { x: 970, y: 662 },
          { x: 970, y: 1065 },
          { x: 653, y: 1065 }
        ]
      }
    ]
  },

  {
    id: "template-23-v4",
    name: "Template 23 (Versi 4)",
    subtitle: "Template 23 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-23-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 352,
        y: 224,
        width: 397,
        height: 201,
        shape: "roundedRect",
        radius: 52,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 352, y: 224 },
          { x: 749, y: 224 },
          { x: 749, y: 425 },
          { x: 352, y: 425 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 352,
        y: 472,
        width: 397,
        height: 197,
        shape: "roundedRect",
        radius: 50,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 352, y: 472 },
          { x: 749, y: 472 },
          { x: 749, y: 669 },
          { x: 352, y: 669 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 352,
        y: 716,
        width: 397,
        height: 201,
        shape: "roundedRect",
        radius: 50,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 352, y: 716 },
          { x: 749, y: 716 },
          { x: 749, y: 917 },
          { x: 352, y: 917 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 352,
        y: 968,
        width: 397,
        height: 201,
        shape: "roundedRect",
        radius: 49,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 352, y: 968 },
          { x: 749, y: 968 },
          { x: 749, y: 1169 },
          { x: 352, y: 1169 }
        ]
      }
    ]
  },

  {
    id: "template-28-v4",
    name: "Template 28 (Versi 4)",
    subtitle: "Template 28 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-28-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 384,
        y: 288,
        width: 497,
        height: 177,
        shape: "roundedRect",
        radius: 19,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 384, y: 288 },
          { x: 881, y: 288 },
          { x: 881, y: 465 },
          { x: 384, y: 465 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 384,
        y: 500,
        width: 497,
        height: 177,
        shape: "roundedRect",
        radius: 18,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 384, y: 500 },
          { x: 881, y: 500 },
          { x: 881, y: 677 },
          { x: 384, y: 677 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 384,
        y: 708,
        width: 497,
        height: 205,
        shape: "roundedRect",
        radius: 19,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 384, y: 708 },
          { x: 881, y: 708 },
          { x: 881, y: 913 },
          { x: 384, y: 913 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 384,
        y: 920,
        width: 497,
        height: 185,
        shape: "roundedRect",
        radius: 19,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 384, y: 920 },
          { x: 881, y: 920 },
          { x: 881, y: 1105 },
          { x: 384, y: 1105 }
        ]
      }
    ]
  },

  {
    id: "template-29-v4",
    name: "Template 29 (Versi 4)",
    subtitle: "Template 29 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-29-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 561,
        y: 160,
        width: 211,
        height: 224,
        shape: "roundedRect",
        radius: 28,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 561, y: 160 },
          { x: 772, y: 160 },
          { x: 772, y: 384 },
          { x: 561, y: 384 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 551,
        y: 440,
        width: 218,
        height: 168,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 551, y: 440 },
          { x: 769, y: 440 },
          { x: 769, y: 608 },
          { x: 551, y: 608 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 443,
        y: 670,
        width: 377,
        height: 194,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 443, y: 670 },
          { x: 820, y: 670 },
          { x: 820, y: 864 },
          { x: 443, y: 864 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 443,
        y: 920,
        width: 375,
        height: 210,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 443, y: 920 },
          { x: 818, y: 920 },
          { x: 818, y: 1130 },
          { x: 443, y: 1130 }
        ]
      }
    ]
  },

  {
    id: "template-32-v4",
    name: "Template 32 (Versi 4)",
    subtitle: "Template 32 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-32-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 464,
        y: 144,
        width: 309,
        height: 221,
        shape: "roundedRect",
        radius: 39,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 464, y: 144 },
          { x: 773, y: 144 },
          { x: 773, y: 365 },
          { x: 464, y: 365 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 452,
        y: 388,
        width: 317,
        height: 213,
        shape: "roundedRect",
        radius: 42,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 388 },
          { x: 769, y: 388 },
          { x: 769, y: 601 },
          { x: 452, y: 601 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 460,
        y: 624,
        width: 317,
        height: 205,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 460, y: 624 },
          { x: 777, y: 624 },
          { x: 777, y: 829 },
          { x: 460, y: 829 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 464,
        y: 848,
        width: 317,
        height: 229,
        shape: "roundedRect",
        radius: 12,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 464, y: 848 },
          { x: 781, y: 848 },
          { x: 781, y: 1077 },
          { x: 464, y: 1077 }
        ]
      }
    ]
  },

  {
    id: "template-35-v4",
    name: "Template 35 (Versi 4)",
    subtitle: "Template 35 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-35-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 472,
        y: 144,
        width: 325,
        height: 233,
        shape: "roundedRect",
        radius: 45,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 472, y: 144 },
          { x: 797, y: 144 },
          { x: 797, y: 377 },
          { x: 472, y: 377 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 468,
        y: 448,
        width: 337,
        height: 205,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 468, y: 448 },
          { x: 805, y: 448 },
          { x: 805, y: 653 },
          { x: 468, y: 653 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 468,
        y: 688,
        width: 329,
        height: 205,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 468, y: 688 },
          { x: 797, y: 688 },
          { x: 797, y: 893 },
          { x: 468, y: 893 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 468,
        y: 912,
        width: 325,
        height: 221,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 468, y: 912 },
          { x: 793, y: 912 },
          { x: 793, y: 1133 },
          { x: 468, y: 1133 }
        ]
      }
    ]
  },

  {
    id: "template-37-v4",
    name: "Template 37 (Versi 4)",
    subtitle: "Template 37 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-37-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 452,
        y: 236,
        width: 357,
        height: 173,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 236 },
          { x: 809, y: 236 },
          { x: 809, y: 409 },
          { x: 452, y: 409 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 452,
        y: 444,
        width: 357,
        height: 173,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 444 },
          { x: 809, y: 444 },
          { x: 809, y: 617 },
          { x: 452, y: 617 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 452,
        y: 652,
        width: 357,
        height: 173,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 652 },
          { x: 809, y: 652 },
          { x: 809, y: 825 },
          { x: 452, y: 825 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 452,
        y: 864,
        width: 357,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 864 },
          { x: 809, y: 864 },
          { x: 809, y: 1041 },
          { x: 452, y: 1041 }
        ]
      }
    ]
  },

  {
    id: "template-38-v4",
    name: "Template 38 (Versi 4)",
    subtitle: "Template 38 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-38-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 468,
        y: 192,
        width: 329,
        height: 197,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 468, y: 192 },
          { x: 797, y: 192 },
          { x: 797, y: 389 },
          { x: 468, y: 389 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 464,
        y: 432,
        width: 329,
        height: 197,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 464, y: 432 },
          { x: 793, y: 432 },
          { x: 793, y: 629 },
          { x: 464, y: 629 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 468,
        y: 652,
        width: 329,
        height: 209,
        shape: "roundedRect",
        radius: 15,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 468, y: 652 },
          { x: 797, y: 652 },
          { x: 797, y: 861 },
          { x: 468, y: 861 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 468,
        y: 888,
        width: 329,
        height: 205,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 468, y: 888 },
          { x: 797, y: 888 },
          { x: 797, y: 1093 },
          { x: 468, y: 1093 }
        ]
      }
    ]
  },

  {
    id: "template-40-v4",
    name: "Template 40 (Versi 4)",
    subtitle: "Template 40 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-40-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 416,
        y: 304,
        width: 441,
        height: 197,
        shape: "roundedRect",
        radius: 50,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 416, y: 304 },
          { x: 857, y: 304 },
          { x: 857, y: 501 },
          { x: 416, y: 501 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 416,
        y: 532,
        width: 437,
        height: 201,
        shape: "roundedRect",
        radius: 44,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 416, y: 532 },
          { x: 853, y: 532 },
          { x: 853, y: 733 },
          { x: 416, y: 733 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 408,
        y: 760,
        width: 441,
        height: 205,
        shape: "roundedRect",
        radius: 32,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 760 },
          { x: 849, y: 760 },
          { x: 849, y: 965 },
          { x: 408, y: 965 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 416,
        y: 988,
        width: 433,
        height: 205,
        shape: "roundedRect",
        radius: 45,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 416, y: 988 },
          { x: 849, y: 988 },
          { x: 849, y: 1193 },
          { x: 416, y: 1193 }
        ]
      }
    ]
  },

  {
    id: "template-41-v4",
    name: "Template 41 (Versi 4)",
    subtitle: "Template 41 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-41-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 420,
        y: 280,
        width: 421,
        height: 161,
        shape: "roundedRect",
        radius: 50,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 420, y: 280 },
          { x: 841, y: 280 },
          { x: 841, y: 441 },
          { x: 420, y: 441 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 420,
        y: 476,
        width: 425,
        height: 161,
        shape: "roundedRect",
        radius: 50,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 420, y: 476 },
          { x: 845, y: 476 },
          { x: 845, y: 637 },
          { x: 420, y: 637 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 420,
        y: 676,
        width: 421,
        height: 161,
        shape: "roundedRect",
        radius: 48,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 420, y: 676 },
          { x: 841, y: 676 },
          { x: 841, y: 837 },
          { x: 420, y: 837 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 420,
        y: 872,
        width: 421,
        height: 161,
        shape: "roundedRect",
        radius: 50,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 420, y: 872 },
          { x: 841, y: 872 },
          { x: 841, y: 1033 },
          { x: 420, y: 1033 }
        ]
      }
    ]
  },

  {
    id: "template-42-v4",
    name: "Template 42 (Versi 4)",
    subtitle: "Template 42 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-42-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 336,
        y: 32,
        width: 589,
        height: 213,
        shape: "roundedRect",
        radius: 26,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 336, y: 32 },
          { x: 925, y: 32 },
          { x: 925, y: 245 },
          { x: 336, y: 245 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 404,
        y: 256,
        width: 433,
        height: 185,
        shape: "roundedRect",
        radius: 29,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 404, y: 256 },
          { x: 837, y: 256 },
          { x: 837, y: 441 },
          { x: 404, y: 441 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 408,
        y: 452,
        width: 429,
        height: 213,
        shape: "roundedRect",
        radius: 37,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 452 },
          { x: 837, y: 452 },
          { x: 837, y: 665 },
          { x: 408, y: 665 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 404,
        y: 708,
        width: 433,
        height: 185,
        shape: "roundedRect",
        radius: 29,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 404, y: 708 },
          { x: 837, y: 708 },
          { x: 837, y: 893 },
          { x: 404, y: 893 }
        ]
      }
    ]
  },

  {
    id: "template-43-v4",
    name: "Template 43 (Versi 4)",
    subtitle: "Template 43 (Versi 4) • Photobooth (4 Foto)",
    photoCount: 4,
    layoutType: "grid-2x2",
    image: "/templates/template-43-v4.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 424,
        y: 44,
        width: 413,
        height: 229,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 424, y: 44 },
          { x: 837, y: 44 },
          { x: 837, y: 273 },
          { x: 424, y: 273 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 428,
        y: 272,
        width: 425,
        height: 169,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 428, y: 272 },
          { x: 853, y: 272 },
          { x: 853, y: 441 },
          { x: 428, y: 441 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 428,
        y: 460,
        width: 425,
        height: 169,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 428, y: 460 },
          { x: 853, y: 460 },
          { x: 853, y: 629 },
          { x: 428, y: 629 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 428,
        y: 652,
        width: 425,
        height: 173,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 428, y: 652 },
          { x: 853, y: 652 },
          { x: 853, y: 825 },
          { x: 428, y: 825 }
        ]
      }
    ]
  },

  // ============================================================
  // 5 FOTO (16 Templates)
  // ============================================================
  {
    id: "template-strip-v5",
    name: "Story Five Strip",
    subtitle: "Midnight Edition • 5 Vertical Photostrip (5 Foto)",
    photoCount: 5,
    layoutType: "strip-vertical",
    image: "/templates/template-strip-v5.png",
    width: 800,
    height: 1500,
    backgroundColor: "#1a202c",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 70,
        y: 100,
        width: 660,
        height: 240,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 70, y: 100 },
          { x: 730, y: 100 },
          { x: 730, y: 340 },
          { x: 70, y: 340 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 70,
        y: 370,
        width: 660,
        height: 240,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 70, y: 370 },
          { x: 730, y: 370 },
          { x: 730, y: 610 },
          { x: 70, y: 610 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 70,
        y: 640,
        width: 660,
        height: 240,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 70, y: 640 },
          { x: 730, y: 640 },
          { x: 730, y: 880 },
          { x: 70, y: 880 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 70,
        y: 910,
        width: 660,
        height: 240,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 70, y: 910 },
          { x: 730, y: 910 },
          { x: 730, y: 1150 },
          { x: 70, y: 1150 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 70,
        y: 1180,
        width: 660,
        height: 240,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 70, y: 1180 },
          { x: 730, y: 1180 },
          { x: 730, y: 1420 },
          { x: 70, y: 1420 }
        ]
      }
    ]
  },

  {
    id: "template-6-v5",
    name: "Template 6 (Versi 5)",
    subtitle: "Template 6 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-6-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 440,
        y: 152,
        width: 373,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 152 },
          { x: 813, y: 152 },
          { x: 813, y: 329 },
          { x: 440, y: 329 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 440,
        y: 352,
        width: 373,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 352 },
          { x: 813, y: 352 },
          { x: 813, y: 529 },
          { x: 440, y: 529 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 440,
        y: 556,
        width: 373,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 556 },
          { x: 813, y: 556 },
          { x: 813, y: 733 },
          { x: 440, y: 733 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 440,
        y: 756,
        width: 373,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 756 },
          { x: 813, y: 756 },
          { x: 813, y: 933 },
          { x: 440, y: 933 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 440,
        y: 960,
        width: 373,
        height: 129,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 960 },
          { x: 813, y: 960 },
          { x: 813, y: 1089 },
          { x: 440, y: 1089 }
        ]
      }
    ]
  },

  {
    id: "template-8-v5",
    name: "Template 8 (Versi 5)",
    subtitle: "Template 8 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-8-v5.png",
    width: 1024,
    height: 1024,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 280,
        y: 128,
        width: 205,
        height: 241,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 280, y: 128 },
          { x: 485, y: 128 },
          { x: 485, y: 369 },
          { x: 280, y: 369 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 536,
        y: 184,
        width: 205,
        height: 269,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 536, y: 184 },
          { x: 741, y: 184 },
          { x: 741, y: 453 },
          { x: 536, y: 453 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 396,
        y: 356,
        width: 225,
        height: 317,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 396, y: 356 },
          { x: 621, y: 356 },
          { x: 621, y: 673 },
          { x: 396, y: 673 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 280,
        y: 640,
        width: 205,
        height: 261,
        shape: "roundedRect",
        radius: 51,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 280, y: 640 },
          { x: 485, y: 640 },
          { x: 485, y: 901 },
          { x: 280, y: 901 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 536,
        y: 616,
        width: 205,
        height: 285,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 536, y: 616 },
          { x: 741, y: 616 },
          { x: 741, y: 901 },
          { x: 536, y: 901 }
        ]
      }
    ]
  },

  {
    id: "template-9-v6",
    name: "Template 9 (Versi 6)",
    subtitle: "Template 9 (Versi 6) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-9-v6.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 306,
        y: 174,
        width: 303,
        height: 282,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 306, y: 174 },
          { x: 609, y: 174 },
          { x: 609, y: 456 },
          { x: 306, y: 456 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 656,
        y: 175,
        width: 302,
        height: 281,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 656, y: 175 },
          { x: 958, y: 175 },
          { x: 958, y: 456 },
          { x: 656, y: 456 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 398,
        y: 496,
        width: 467,
        height: 278,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 398, y: 496 },
          { x: 865, y: 496 },
          { x: 865, y: 774 },
          { x: 398, y: 774 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 307,
        y: 814,
        width: 301,
        height: 280,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 307, y: 814 },
          { x: 608, y: 814 },
          { x: 608, y: 1094 },
          { x: 307, y: 1094 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 655,
        y: 814,
        width: 301,
        height: 280,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 655, y: 814 },
          { x: 956, y: 814 },
          { x: 956, y: 1094 },
          { x: 655, y: 1094 }
        ]
      }
    ]
  },

  {
    id: "template-15-v5",
    name: "Template 15 (Versi 5)",
    subtitle: "Template 15 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-15-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 284,
        y: 160,
        width: 561,
        height: 181,
        shape: "roundedRect",
        radius: 28,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 284, y: 160 },
          { x: 845, y: 160 },
          { x: 845, y: 341 },
          { x: 284, y: 341 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 456,
        y: 364,
        width: 485,
        height: 189,
        shape: "roundedRect",
        radius: 12,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 456, y: 364 },
          { x: 941, y: 364 },
          { x: 941, y: 553 },
          { x: 456, y: 553 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 312,
        y: 580,
        width: 493,
        height: 197,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 312, y: 580 },
          { x: 805, y: 580 },
          { x: 805, y: 777 },
          { x: 312, y: 777 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 432,
        y: 800,
        width: 489,
        height: 193,
        shape: "roundedRect",
        radius: 13,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 432, y: 800 },
          { x: 921, y: 800 },
          { x: 921, y: 993 },
          { x: 432, y: 993 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 364,
        y: 1016,
        width: 441,
        height: 145,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 364, y: 1016 },
          { x: 805, y: 1016 },
          { x: 805, y: 1161 },
          { x: 364, y: 1161 }
        ]
      }
    ]
  },

  {
    id: "template-18-v5",
    name: "Template 18 (Versi 5)",
    subtitle: "Template 18 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-18-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 404,
        y: 128,
        width: 349,
        height: 181,
        shape: "roundedRect",
        radius: 14,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 404, y: 128 },
          { x: 753, y: 128 },
          { x: 753, y: 309 },
          { x: 404, y: 309 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 508,
        y: 332,
        width: 349,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 508, y: 332 },
          { x: 857, y: 332 },
          { x: 857, y: 509 },
          { x: 508, y: 509 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 404,
        y: 532,
        width: 349,
        height: 181,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 404, y: 532 },
          { x: 753, y: 532 },
          { x: 753, y: 713 },
          { x: 404, y: 713 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 508,
        y: 740,
        width: 349,
        height: 181,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 508, y: 740 },
          { x: 857, y: 740 },
          { x: 857, y: 921 },
          { x: 508, y: 921 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 400,
        y: 944,
        width: 353,
        height: 181,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 400, y: 944 },
          { x: 753, y: 944 },
          { x: 753, y: 1125 },
          { x: 400, y: 1125 }
        ]
      }
    ]
  },

  {
    id: "template-19-v5",
    name: "Template 19 (Versi 5)",
    subtitle: "Template 19 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-19-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 422,
        y: 124,
        width: 279,
        height: 193,
        shape: "roundedRect",
        radius: 18,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 422, y: 124 },
          { x: 701, y: 124 },
          { x: 701, y: 317 },
          { x: 422, y: 317 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 544,
        y: 324,
        width: 279,
        height: 196,
        shape: "roundedRect",
        radius: 18,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 544, y: 324 },
          { x: 823, y: 324 },
          { x: 823, y: 520 },
          { x: 544, y: 520 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 420,
        y: 531,
        width: 280,
        height: 192,
        shape: "roundedRect",
        radius: 18,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 420, y: 531 },
          { x: 700, y: 531 },
          { x: 700, y: 723 },
          { x: 420, y: 723 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 544,
        y: 733,
        width: 278,
        height: 194,
        shape: "roundedRect",
        radius: 18,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 544, y: 733 },
          { x: 822, y: 733 },
          { x: 822, y: 927 },
          { x: 544, y: 927 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 420,
        y: 938,
        width: 279,
        height: 194,
        shape: "roundedRect",
        radius: 18,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 420, y: 938 },
          { x: 699, y: 938 },
          { x: 699, y: 1132 },
          { x: 420, y: 1132 }
        ]
      }
    ]
  },

  {
    id: "template-20-v5",
    name: "Template 20 (Versi 5)",
    subtitle: "Template 20 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-20-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: true,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 312,
        y: 219,
        width: 288,
        height: 386,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 312, y: 219 },
          { x: 600, y: 219 },
          { x: 600, y: 605 },
          { x: 312, y: 605 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 646,
        y: 197,
        width: 308,
        height: 252,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 646, y: 197 },
          { x: 954, y: 197 },
          { x: 954, y: 449 },
          { x: 646, y: 449 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 646,
        y: 487,
        width: 307,
        height: 249,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 646, y: 487 },
          { x: 953, y: 487 },
          { x: 953, y: 736 },
          { x: 646, y: 736 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 312,
        y: 645,
        width: 288,
        height: 373,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 312, y: 645 },
          { x: 600, y: 645 },
          { x: 600, y: 1018 },
          { x: 312, y: 1018 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 645,
        y: 776,
        width: 309,
        height: 249,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 645, y: 776 },
          { x: 954, y: 776 },
          { x: 954, y: 1025 },
          { x: 645, y: 1025 }
        ]
      }
    ]
  },

  {
    id: "template-21-v6",
    name: "Template 21 (Versi 6)",
    subtitle: "Template 21 (Versi 6) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-21-v6.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 398,
        y: 120,
        width: 468,
        height: 240,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 398, y: 120 },
          { x: 866, y: 120 },
          { x: 866, y: 360 },
          { x: 398, y: 360 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 334,
        y: 410,
        width: 280,
        height: 260,
        shape: "roundedRect",
        radius: 65,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 334, y: 410 },
          { x: 614, y: 410 },
          { x: 614, y: 670 },
          { x: 334, y: 670 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 650,
        y: 410,
        width: 280,
        height: 260,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 650, y: 410 },
          { x: 930, y: 410 },
          { x: 930, y: 670 },
          { x: 650, y: 670 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 398,
        y: 720,
        width: 468,
        height: 240,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 398, y: 720 },
          { x: 866, y: 720 },
          { x: 866, y: 960 },
          { x: 398, y: 960 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 398,
        y: 990,
        width: 468,
        height: 220,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 398, y: 990 },
          { x: 866, y: 990 },
          { x: 866, y: 1210 },
          { x: 398, y: 1210 }
        ]
      }
    ]
  },

  {
    id: "template-23-v5",
    name: "Template 23 (Versi 5)",
    subtitle: "Template 23 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-23-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 556,
        y: 160,
        width: 377,
        height: 169,
        shape: "roundedRect",
        radius: 51,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 556, y: 160 },
          { x: 933, y: 160 },
          { x: 933, y: 329 },
          { x: 556, y: 329 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 552,
        y: 364,
        width: 381,
        height: 165,
        shape: "roundedRect",
        radius: 54,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 552, y: 364 },
          { x: 933, y: 364 },
          { x: 933, y: 529 },
          { x: 552, y: 529 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 556,
        y: 564,
        width: 377,
        height: 165,
        shape: "roundedRect",
        radius: 51,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 556, y: 564 },
          { x: 933, y: 564 },
          { x: 933, y: 729 },
          { x: 556, y: 729 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 552,
        y: 764,
        width: 381,
        height: 169,
        shape: "roundedRect",
        radius: 56,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 552, y: 764 },
          { x: 933, y: 764 },
          { x: 933, y: 933 },
          { x: 552, y: 933 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 556,
        y: 968,
        width: 377,
        height: 165,
        shape: "roundedRect",
        radius: 50,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 556, y: 968 },
          { x: 933, y: 968 },
          { x: 933, y: 1133 },
          { x: 556, y: 1133 }
        ]
      }
    ]
  },

  {
    id: "template-24-v5",
    name: "Template 24 (Versi 5)",
    subtitle: "Template 24 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-24-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 388,
        y: 284,
        width: 489,
        height: 141,
        shape: "roundedRect",
        radius: 53,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 284 },
          { x: 877, y: 284 },
          { x: 877, y: 425 },
          { x: 388, y: 425 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 388,
        y: 452,
        width: 489,
        height: 145,
        shape: "roundedRect",
        radius: 53,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 452 },
          { x: 877, y: 452 },
          { x: 877, y: 597 },
          { x: 388, y: 597 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 388,
        y: 624,
        width: 489,
        height: 141,
        shape: "roundedRect",
        radius: 54,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 624 },
          { x: 877, y: 624 },
          { x: 877, y: 765 },
          { x: 388, y: 765 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 388,
        y: 796,
        width: 489,
        height: 141,
        shape: "roundedRect",
        radius: 55,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 796 },
          { x: 877, y: 796 },
          { x: 877, y: 937 },
          { x: 388, y: 937 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 388,
        y: 964,
        width: 489,
        height: 149,
        shape: "roundedRect",
        radius: 52,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 964 },
          { x: 877, y: 964 },
          { x: 877, y: 1113 },
          { x: 388, y: 1113 }
        ]
      }
    ]
  },

  {
    id: "template-25-v5",
    name: "Template 25 (Versi 5)",
    subtitle: "Template 25 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-25-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 388,
        y: 300,
        width: 369,
        height: 149,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 300 },
          { x: 757, y: 300 },
          { x: 757, y: 449 },
          { x: 388, y: 449 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 388,
        y: 472,
        width: 369,
        height: 149,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 472 },
          { x: 757, y: 472 },
          { x: 757, y: 621 },
          { x: 388, y: 621 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 388,
        y: 648,
        width: 369,
        height: 149,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 648 },
          { x: 757, y: 648 },
          { x: 757, y: 797 },
          { x: 388, y: 797 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 388,
        y: 820,
        width: 369,
        height: 149,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 820 },
          { x: 757, y: 820 },
          { x: 757, y: 969 },
          { x: 388, y: 969 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 388,
        y: 996,
        width: 369,
        height: 149,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 388, y: 996 },
          { x: 757, y: 996 },
          { x: 757, y: 1145 },
          { x: 388, y: 1145 }
        ]
      }
    ]
  },

  {
    id: "template-26-v5",
    name: "Template 26 (Versi 5)",
    subtitle: "Template 26 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-26-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 372,
        y: 16,
        width: 525,
        height: 981,
        shape: "roundedRect",
        radius: 46,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 372, y: 16 },
          { x: 897, y: 16 },
          { x: 897, y: 997 },
          { x: 372, y: 997 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 452,
        y: 240,
        width: 373,
        height: 145,
        shape: "roundedRect",
        radius: 33,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 240 },
          { x: 825, y: 240 },
          { x: 825, y: 385 },
          { x: 452, y: 385 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 452,
        y: 412,
        width: 377,
        height: 145,
        shape: "roundedRect",
        radius: 33,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 412 },
          { x: 829, y: 412 },
          { x: 829, y: 557 },
          { x: 452, y: 557 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 452,
        y: 584,
        width: 373,
        height: 145,
        shape: "roundedRect",
        radius: 35,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 584 },
          { x: 825, y: 584 },
          { x: 825, y: 729 },
          { x: 452, y: 729 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 452,
        y: 756,
        width: 377,
        height: 321,
        shape: "roundedRect",
        radius: 34,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 452, y: 756 },
          { x: 829, y: 756 },
          { x: 829, y: 1077 },
          { x: 452, y: 1077 }
        ]
      }
    ]
  },

  {
    id: "template-27-v5",
    name: "Template 27 (Versi 5)",
    subtitle: "Template 27 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-27-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 436,
        y: 232,
        width: 365,
        height: 169,
        shape: "roundedRect",
        radius: 14,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 436, y: 232 },
          { x: 801, y: 232 },
          { x: 801, y: 401 },
          { x: 436, y: 401 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 436,
        y: 412,
        width: 365,
        height: 149,
        shape: "roundedRect",
        radius: 22,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 436, y: 412 },
          { x: 801, y: 412 },
          { x: 801, y: 561 },
          { x: 436, y: 561 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 440,
        y: 576,
        width: 361,
        height: 153,
        shape: "roundedRect",
        radius: 22,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 440, y: 576 },
          { x: 801, y: 576 },
          { x: 801, y: 729 },
          { x: 440, y: 729 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 436,
        y: 740,
        width: 365,
        height: 157,
        shape: "roundedRect",
        radius: 28,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 436, y: 740 },
          { x: 801, y: 740 },
          { x: 801, y: 897 },
          { x: 436, y: 897 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 456,
        y: 908,
        width: 345,
        height: 149,
        shape: "roundedRect",
        radius: 27,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 456, y: 908 },
          { x: 801, y: 908 },
          { x: 801, y: 1057 },
          { x: 456, y: 1057 }
        ]
      }
    ]
  },

  {
    id: "template-28-v5",
    name: "Template 28 (Versi 5)",
    subtitle: "Template 28 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-28-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 448,
        y: 276,
        width: 369,
        height: 141,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 448, y: 276 },
          { x: 817, y: 276 },
          { x: 817, y: 417 },
          { x: 448, y: 417 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 448,
        y: 440,
        width: 369,
        height: 145,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 448, y: 440 },
          { x: 817, y: 440 },
          { x: 817, y: 585 },
          { x: 448, y: 585 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 448,
        y: 596,
        width: 369,
        height: 149,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 448, y: 596 },
          { x: 817, y: 596 },
          { x: 817, y: 745 },
          { x: 448, y: 745 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 448,
        y: 756,
        width: 369,
        height: 137,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 448, y: 756 },
          { x: 817, y: 756 },
          { x: 817, y: 893 },
          { x: 448, y: 893 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 448,
        y: 916,
        width: 369,
        height: 149,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 448, y: 916 },
          { x: 817, y: 916 },
          { x: 817, y: 1065 },
          { x: 448, y: 1065 }
        ]
      }
    ]
  },

  {
    id: "template-31-v5",
    name: "Template 31 (Versi 5)",
    subtitle: "Template 31 (Versi 5) • Photobooth (5 Foto)",
    photoCount: 5,
    layoutType: "collage-square",
    image: "/templates/template-31-v5.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 476,
        y: 96,
        width: 313,
        height: 197,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 476, y: 96 },
          { x: 789, y: 96 },
          { x: 789, y: 293 },
          { x: 476, y: 293 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 476,
        y: 320,
        width: 313,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 476, y: 320 },
          { x: 789, y: 320 },
          { x: 789, y: 497 },
          { x: 476, y: 497 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 476,
        y: 520,
        width: 313,
        height: 177,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 476, y: 520 },
          { x: 789, y: 520 },
          { x: 789, y: 697 },
          { x: 476, y: 697 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 476,
        y: 724,
        width: 313,
        height: 181,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 476, y: 724 },
          { x: 789, y: 724 },
          { x: 789, y: 905 },
          { x: 476, y: 905 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 476,
        y: 928,
        width: 313,
        height: 181,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 476, y: 928 },
          { x: 789, y: 928 },
          { x: 789, y: 1109 },
          { x: 476, y: 1109 }
        ]
      }
    ]
  },

  // ============================================================
  // 6 FOTO (6 Templates)
  // ============================================================
  {
    id: "template-2-v6",
    name: "Template 2 (Wanted 6)",
    subtitle: "Wanted Dead or Alive • Western (6 Grid)",
    photoCount: 6,
    layoutType: "collage-portrait",
    image: "/templates/template-2-v6.png",
    width: 1024,
    height: 1536,
    backgroundColor: "#d4a96b",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Kiri Atas)",
        x: 64,
        y: 367,
        width: 271,
        height: 346,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 64, y: 367 },
          { x: 335, y: 367 },
          { x: 335, y: 713 },
          { x: 64, y: 713 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Tengah Atas)",
        x: 383,
        y: 368,
        width: 269,
        height: 345,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 383, y: 368 },
          { x: 652, y: 368 },
          { x: 652, y: 713 },
          { x: 383, y: 713 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Kanan Atas)",
        x: 701,
        y: 368,
        width: 268,
        height: 345,
        shape: "roundedRect",
        radius: 13,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 701, y: 368 },
          { x: 969, y: 368 },
          { x: 969, y: 713 },
          { x: 701, y: 713 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4 (Kiri Bawah)",
        x: 64,
        y: 788,
        width: 270,
        height: 346,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 64, y: 788 },
          { x: 334, y: 788 },
          { x: 334, y: 1134 },
          { x: 64, y: 1134 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5 (Tengah Bawah)",
        x: 384,
        y: 788,
        width: 268,
        height: 346,
        shape: "roundedRect",
        radius: 13,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 384, y: 788 },
          { x: 652, y: 788 },
          { x: 652, y: 1134 },
          { x: 384, y: 1134 }
        ]
      },
      {
        id: "slot-6",
        label: "Foto 6 (Kanan Bawah)",
        x: 701,
        y: 788,
        width: 268,
        height: 345,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 701, y: 788 },
          { x: 969, y: 788 },
          { x: 969, y: 1133 },
          { x: 701, y: 1133 }
        ]
      }
    ]
  },

  {
    id: "template-4-v6",
    name: "Template 4",
    subtitle: "Good Friends • Dark Horror (6 Polaroid Tilted)",
    photoCount: 6,
    layoutType: "collage-portrait",
    image: "/templates/template-4-v6.png",
    width: 1024,
    height: 1536,
    backgroundColor: "#110b0b",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Kiri Atas)",
        x: 205,
        y: 218,
        width: 300,
        height: 327,
        shape: "polygon",
        radius: 0,
        rotation: -7,
        fit: "cover",
        points: [
          { x: 205, y: 250 },
          { x: 466, y: 218 },
          { x: 505, y: 475 },
          { x: 214, y: 545 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Kanan Atas)",
        x: 546,
        y: 268,
        width: 320,
        height: 280,
        shape: "polygon",
        radius: 0,
        rotation: 4,
        fit: "cover",
        points: [
          { x: 590, y: 268 },
          { x: 866, y: 289 },
          { x: 852, y: 548 },
          { x: 546, y: 517 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Kiri Tengah)",
        x: 182,
        y: 624,
        width: 309,
        height: 296,
        shape: "polygon",
        radius: 0,
        rotation: 3,
        fit: "cover",
        points: [
          { x: 212, y: 624 },
          { x: 491, y: 637 },
          { x: 467, y: 908 },
          { x: 182, y: 920 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4 (Kanan Tengah)",
        x: 544,
        y: 624,
        width: 325,
        height: 327,
        shape: "polygon",
        radius: 0,
        rotation: 11,
        fit: "cover",
        points: [
          { x: 582, y: 624 },
          { x: 869, y: 679 },
          { x: 797, y: 951 },
          { x: 544, y: 906 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5 (Kiri Bawah)",
        x: 156,
        y: 1008,
        width: 314,
        height: 304,
        shape: "polygon",
        radius: 0,
        rotation: -14,
        fit: "cover",
        points: [
          { x: 156, y: 1076 },
          { x: 433, y: 1008 },
          { x: 470, y: 1288 },
          { x: 184, y: 1312 }
        ]
      },
      {
        id: "slot-6",
        label: "Foto 6 (Kanan Bawah)",
        x: 512,
        y: 1011,
        width: 344,
        height: 306,
        shape: "polygon",
        radius: 0,
        rotation: -6,
        fit: "cover",
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
    id: "template-16-v6",
    name: "Template 16 (Versi 6)",
    subtitle: "Template 16 (Versi 6) • Photobooth (6 Foto)",
    photoCount: 6,
    layoutType: "collage-square",
    image: "/templates/template-16-v6.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 276,
        y: 220,
        width: 325,
        height: 273,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 276, y: 220 },
          { x: 601, y: 220 },
          { x: 601, y: 493 },
          { x: 276, y: 493 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 660,
        y: 220,
        width: 325,
        height: 273,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 660, y: 220 },
          { x: 985, y: 220 },
          { x: 985, y: 493 },
          { x: 660, y: 493 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 276,
        y: 512,
        width: 325,
        height: 273,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 276, y: 512 },
          { x: 601, y: 512 },
          { x: 601, y: 785 },
          { x: 276, y: 785 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 660,
        y: 512,
        width: 325,
        height: 273,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 660, y: 512 },
          { x: 985, y: 512 },
          { x: 985, y: 785 },
          { x: 660, y: 785 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 276,
        y: 804,
        width: 325,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 276, y: 804 },
          { x: 601, y: 804 },
          { x: 601, y: 1081 },
          { x: 276, y: 1081 }
        ]
      },
      {
        id: "slot-6",
        label: "Foto 6",
        x: 660,
        y: 804,
        width: 325,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 660, y: 804 },
          { x: 985, y: 804 },
          { x: 985, y: 1081 },
          { x: 660, y: 1081 }
        ]
      }
    ]
  },

  {
    id: "template-18-v6",
    name: "Template 18 (Versi 6)",
    subtitle: "Template 18 (Versi 6) • Photobooth (6 Foto)",
    photoCount: 6,
    layoutType: "collage-square",
    image: "/templates/template-18-v6.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 356,
        y: 180,
        width: 249,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 356, y: 180 },
          { x: 605, y: 180 },
          { x: 605, y: 457 },
          { x: 356, y: 457 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 656,
        y: 184,
        width: 245,
        height: 273,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 656, y: 184 },
          { x: 901, y: 184 },
          { x: 901, y: 457 },
          { x: 656, y: 457 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 356,
        y: 496,
        width: 245,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 356, y: 496 },
          { x: 601, y: 496 },
          { x: 601, y: 773 },
          { x: 356, y: 773 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 656,
        y: 496,
        width: 245,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 656, y: 496 },
          { x: 901, y: 496 },
          { x: 901, y: 773 },
          { x: 656, y: 773 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 356,
        y: 812,
        width: 245,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 356, y: 812 },
          { x: 601, y: 812 },
          { x: 601, y: 1089 },
          { x: 356, y: 1089 }
        ]
      },
      {
        id: "slot-6",
        label: "Foto 6",
        x: 656,
        y: 812,
        width: 245,
        height: 277,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 656, y: 812 },
          { x: 901, y: 812 },
          { x: 901, y: 1089 },
          { x: 656, y: 1089 }
        ]
      }
    ]
  },

  {
    id: "template-28-v6",
    name: "Template 28 (Versi 6)",
    subtitle: "Template 28 (Versi 6) • Photobooth (6 Foto)",
    photoCount: 6,
    layoutType: "collage-square",
    image: "/templates/template-28-v6.png",
    width: 1264,
    height: 1264,
    backgroundColor: "#ffffff",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1",
        x: 620,
        y: 236,
        width: 229,
        height: 129,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 620, y: 236 },
          { x: 849, y: 236 },
          { x: 849, y: 365 },
          { x: 620, y: 365 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2",
        x: 408,
        y: 392,
        width: 441,
        height: 129,
        shape: "roundedRect",
        radius: 19,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 392 },
          { x: 849, y: 392 },
          { x: 849, y: 521 },
          { x: 408, y: 521 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3",
        x: 408,
        y: 552,
        width: 441,
        height: 133,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 552 },
          { x: 849, y: 552 },
          { x: 849, y: 685 },
          { x: 408, y: 685 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4",
        x: 408,
        y: 708,
        width: 441,
        height: 129,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 708 },
          { x: 849, y: 708 },
          { x: 849, y: 837 },
          { x: 408, y: 837 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5",
        x: 408,
        y: 868,
        width: 441,
        height: 133,
        shape: "roundedRect",
        radius: 20,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 868 },
          { x: 849, y: 868 },
          { x: 849, y: 1001 },
          { x: 408, y: 1001 }
        ]
      },
      {
        id: "slot-6",
        label: "Foto 6",
        x: 408,
        y: 1024,
        width: 441,
        height: 129,
        shape: "roundedRect",
        radius: 19,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 408, y: 1024 },
          { x: 849, y: 1024 },
          { x: 849, y: 1153 },
          { x: 408, y: 1153 }
        ]
      }
    ]
  },

  {
    id: "template-woodz-v6",
    name: "Template Woodz",
    subtitle: "Classic Vintage • 6 Photo Collage",
    photoCount: 6,
    layoutType: "collage-portrait",
    image: "/templates/template-woodz-v6.png",
    width: 800,
    height: 1200,
    backgroundColor: "#1a1a2e",
    isTransparentFrame: false,
    slots: [
      {
        id: "slot-1",
        label: "Foto 1 (Kiri Atas)",
        x: 50,
        y: 120,
        width: 325,
        height: 320,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 50, y: 120 },
          { x: 375, y: 120 },
          { x: 375, y: 440 },
          { x: 50, y: 440 }
        ]
      },
      {
        id: "slot-2",
        label: "Foto 2 (Kanan Atas)",
        x: 425,
        y: 120,
        width: 325,
        height: 320,
        shape: "roundedRect",
        radius: 43,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 425, y: 120 },
          { x: 750, y: 120 },
          { x: 750, y: 440 },
          { x: 425, y: 440 }
        ]
      },
      {
        id: "slot-3",
        label: "Foto 3 (Kiri Tengah)",
        x: 50,
        y: 470,
        width: 325,
        height: 320,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 50, y: 470 },
          { x: 375, y: 470 },
          { x: 375, y: 790 },
          { x: 50, y: 790 }
        ]
      },
      {
        id: "slot-4",
        label: "Foto 4 (Kanan Tengah)",
        x: 425,
        y: 470,
        width: 325,
        height: 320,
        shape: "roundedRect",
        radius: 62,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 425, y: 470 },
          { x: 750, y: 470 },
          { x: 750, y: 790 },
          { x: 425, y: 790 }
        ]
      },
      {
        id: "slot-5",
        label: "Foto 5 (Kiri Bawah)",
        x: 50,
        y: 820,
        width: 325,
        height: 320,
        shape: "rect",
        radius: 0,
        rotation: 0,
        fit: "cover",
        points: [
          { x: 50, y: 820 },
          { x: 375, y: 820 },
          { x: 375, y: 1140 },
          { x: 50, y: 1140 }
        ]
      },
      {
        id: "slot-6",
        label: "Foto 6 (Kanan Bawah)",
        x: 425,
        y: 820,
        width: 325,
        height: 320,
        shape: "roundedRect",
        radius: 53,
        rotation: 0,
        fit: "cover",
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
