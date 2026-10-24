export interface ColorNumberItem {
  number: number;
  hex: string;
  name: string;
  textColor?: string;
}

export interface ColorByNumberPalette {
  id: string;
  name: string;
  description: string;
  colors: ColorNumberItem[];
}

export interface ColorRegion {
  id: string;
  number: number; // 1 to 8
  d: string; // SVG path data
  cx: number; // Label X coordinate
  cy: number; // Label Y coordinate
  name: string;
}

export interface ColorByNumberTemplate {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: 'Novice' | 'Intricate' | 'Master';
  description: string;
  defaultPaletteId: string;
  viewBox: string;
  regions: ColorRegion[];
  outlineSvgOverlay?: string; // decorative borders & accents
}

// 4 Rich, Darker-Themed Palettes
export const DARK_THEMED_PALETTES: ColorByNumberPalette[] = [
  {
    id: 'abyssal-blood',
    name: 'Abyssal Blood & Onyx',
    description: 'Deep arterial crimsons, congealed wines, bruised plums, and infinite obsidian.',
    colors: [
      { number: 1, hex: '#0a0a0d', name: 'Obsidian Void', textColor: '#ffffff' },
      { number: 2, hex: '#1c0307', name: 'Congealed Gore', textColor: '#ffffff' },
      { number: 3, hex: '#3b0610', name: 'Sanguine Wine', textColor: '#ffffff' },
      { number: 4, hex: '#730517', name: 'Arterial Crimson', textColor: '#ffffff' },
      { number: 5, hex: '#16151f', name: 'Nocturne Charcoal', textColor: '#ffffff' },
      { number: 6, hex: '#311429', name: 'Bruised Plum', textColor: '#ffffff' },
      { number: 7, hex: '#4d2015', name: 'Scorched Amber', textColor: '#ffffff' },
      { number: 8, hex: '#9e1b2d', name: 'Vampire Red', textColor: '#ffffff' },
    ]
  },
  {
    id: 'gothic-crypt',
    name: 'Gothic Crypt & Bronze',
    description: 'Tarnished antique golds, ancient reliquary bronzes, abyssal verdigris, and crypt moss.',
    colors: [
      { number: 1, hex: '#080808', name: 'Crypt Pitch', textColor: '#ffffff' },
      { number: 2, hex: '#1a1711', name: 'Smoked Umber', textColor: '#ffffff' },
      { number: 3, hex: '#3b2f14', name: 'Antique Bronze', textColor: '#ffffff' },
      { number: 4, hex: '#695116', name: 'Tarnished Gold', textColor: '#ffffff' },
      { number: 5, hex: '#111d1a', name: 'Catacomb Teal', textColor: '#ffffff' },
      { number: 6, hex: '#1d332c', name: 'Abyssal Verdigris', textColor: '#ffffff' },
      { number: 7, hex: '#26242c', name: 'Mausoleum Basalt', textColor: '#ffffff' },
      { number: 8, hex: '#473d36', name: 'Ashen Bone', textColor: '#ffffff' },
    ]
  },
  {
    id: 'cyber-nightshade',
    name: 'Cyber Void & Nightshade',
    description: 'Cold synthetic void blacks, deep violet shadows, dark petroleum teals, and poisoned neon.',
    colors: [
      { number: 1, hex: '#040406', name: 'System Blackout', textColor: '#ffffff' },
      { number: 2, hex: '#120822', name: 'Deep Nightshade', textColor: '#ffffff' },
      { number: 3, hex: '#290c42', name: 'Bruised Violet', textColor: '#ffffff' },
      { number: 4, hex: '#570a73', name: 'Neon Sanguine', textColor: '#ffffff' },
      { number: 5, hex: '#0a1a1f', name: 'Synthetic Petroleum', textColor: '#ffffff' },
      { number: 6, hex: '#143336', name: 'Murky Cyan', textColor: '#ffffff' },
      { number: 7, hex: '#1d1d26', name: 'Matte Carbon', textColor: '#ffffff' },
      { number: 8, hex: '#800c40', name: 'Electric Velvet', textColor: '#ffffff' },
    ]
  },
  {
    id: 'monochrome-ash',
    name: 'Scorched Ash & Solitary Blood',
    description: 'Monochromatic pencil noir, graphite gradients, and a solitary crimson accent drop.',
    colors: [
      { number: 1, hex: '#050505', name: 'Absolute Dark', textColor: '#ffffff' },
      { number: 2, hex: '#131313', name: 'Carbon Black', textColor: '#ffffff' },
      { number: 3, hex: '#212121', name: 'Dark Slate', textColor: '#ffffff' },
      { number: 4, hex: '#333333', name: 'Graphite Shadow', textColor: '#ffffff' },
      { number: 5, hex: '#474747', name: 'Iron Shading', textColor: '#ffffff' },
      { number: 6, hex: '#5e5e5e', name: 'Muted Pewter', textColor: '#ffffff' },
      { number: 7, hex: '#787878', name: 'Crypt Fog', textColor: '#ffffff' },
      { number: 8, hex: '#b3001e', name: 'Ritual Blood Drop', textColor: '#ffffff' },
    ]
  }
];

// Curated Dark Color-By-Number Templates with handcrafted vector regions
export const COLOR_BY_NUMBER_TEMPLATES: ColorByNumberTemplate[] = [
  {
    id: 'cbn-bound-form',
    title: 'Vol. 01 — The Bound Form',
    subtitle: 'Ceremonial Ties, Silhouette Contours & Sacred Altar',
    category: 'Bondage Studies',
    difficulty: 'Intricate',
    description: 'A study in tension and anatomy. Dark blood ropes and shadowed flesh beneath an occult halo.',
    defaultPaletteId: 'abyssal-blood',
    viewBox: '0 0 800 800',
    regions: [
      // 1: Background Void Outer
      { id: 'bf-bg-1', number: 1, d: 'M0 0 L400 0 L400 400 L0 400 Z', cx: 120, cy: 120, name: 'Void Quadrant NW' },
      { id: 'bf-bg-2', number: 1, d: 'M400 0 L800 0 L800 400 L400 400 Z', cx: 680, cy: 120, name: 'Void Quadrant NE' },
      { id: 'bf-bg-3', number: 1, d: 'M0 400 L400 400 L400 800 L0 800 Z', cx: 120, cy: 680, name: 'Void Quadrant SW' },
      { id: 'bf-bg-4', number: 1, d: 'M400 400 L800 400 L800 800 L400 800 Z', cx: 680, cy: 680, name: 'Void Quadrant SE' },

      // 2: Outer Ritual Rings & Concentric Sigils
      { id: 'bf-ring-top', number: 2, d: 'M400 50 A350 350 0 0 1 750 400 L710 400 A310 310 0 0 0 400 90 Z', cx: 580, cy: 200, name: 'Outer Arc Superior' },
      { id: 'bf-ring-right', number: 2, d: 'M750 400 A350 350 0 0 1 400 750 L400 710 A310 310 0 0 0 710 400 Z', cx: 600, cy: 600, name: 'Outer Arc Inferior East' },
      { id: 'bf-ring-bottom', number: 2, d: 'M400 750 A350 350 0 0 1 50 400 L90 400 A310 310 0 0 0 400 710 Z', cx: 200, cy: 600, name: 'Outer Arc Inferior West' },
      { id: 'bf-ring-left', number: 2, d: 'M50 400 A350 350 0 0 1 400 50 L400 90 A310 310 0 0 0 90 400 Z', cx: 220, cy: 200, name: 'Outer Arc Superior West' },

      // 3: Inner Sacred Geometry Triangles
      { id: 'bf-tri-top', number: 3, d: 'M400 120 L580 400 L400 340 Z', cx: 460, cy: 270, name: 'Inverted Apex Right' },
      { id: 'bf-tri-top-l', number: 3, d: 'M400 120 L220 400 L400 340 Z', cx: 340, cy: 270, name: 'Inverted Apex Left' },
      { id: 'bf-tri-bot', number: 3, d: 'M400 680 L580 400 L400 460 Z', cx: 460, cy: 530, name: 'Erect Apex Right' },
      { id: 'bf-tri-bot-l', number: 3, d: 'M400 680 L220 400 L400 460 Z', cx: 340, cy: 530, name: 'Erect Apex Left' },

      // 4: Sanguine Ceremonial Restraint Cords
      { id: 'bf-cord-upper-left', number: 4, d: 'M180 280 Q400 340 620 280 L620 310 Q400 370 180 310 Z', cx: 300, cy: 320, name: 'Torso Restraint Band 1' },
      { id: 'bf-cord-mid', number: 4, d: 'M190 380 Q400 440 610 380 L610 410 Q400 470 190 410 Z', cx: 500, cy: 420, name: 'Torso Restraint Band 2' },
      { id: 'bf-cord-lower', number: 4, d: 'M210 480 Q400 540 590 480 L590 510 Q400 570 210 510 Z', cx: 300, cy: 520, name: 'Hip Restraint Band 3' },
      { id: 'bf-cord-cross-1', number: 4, d: 'M250 200 L550 600 L520 620 L220 220 Z', cx: 280, cy: 240, name: 'Diagonal Bind Alpha' },
      { id: 'bf-cord-cross-2', number: 4, d: 'M550 200 L250 600 L220 580 L520 180 Z', cx: 520, cy: 240, name: 'Diagonal Bind Beta' },

      // 5: Body Silhouette Anatomy - Core Torso
      { id: 'bf-body-head', number: 5, d: 'M400 150 C430 150 450 180 450 220 C450 260 420 280 400 280 C380 280 350 260 350 220 C350 180 370 150 400 150 Z', cx: 400, cy: 215, name: 'Veiled Visage' },
      { id: 'bf-body-torso-l', number: 5, d: 'M360 280 C320 350 310 430 330 500 L400 480 L400 280 Z', cx: 355, cy: 370, name: 'Ribs & Flank Left' },
      { id: 'bf-body-torso-r', number: 5, d: 'M440 280 C480 350 490 430 470 500 L400 480 L400 280 Z', cx: 445, cy: 370, name: 'Ribs & Flank Right' },
      { id: 'bf-body-hips-l', number: 5, d: 'M330 500 C340 560 370 630 390 690 L400 690 L400 480 Z', cx: 370, cy: 590, name: 'Thigh & Hip Left' },
      { id: 'bf-body-hips-r', number: 5, d: 'M470 500 C460 560 430 630 410 690 L400 690 L400 480 Z', cx: 430, cy: 590, name: 'Thigh & Hip Right' },

      // 6: Deep Shadow Folds & Velvet Creases
      { id: 'bf-shadow-l1', number: 6, d: 'M140 160 L240 240 L180 320 Z', cx: 185, cy: 240, name: 'Side Shadow Wedge Left' },
      { id: 'bf-shadow-r1', number: 6, d: 'M660 160 L560 240 L620 320 Z', cx: 615, cy: 240, name: 'Side Shadow Wedge Right' },
      { id: 'bf-shadow-l2', number: 6, d: 'M140 640 L240 560 L180 480 Z', cx: 185, cy: 560, name: 'Lower Shadow Wedge Left' },
      { id: 'bf-shadow-r2', number: 6, d: 'M660 640 L560 560 L620 480 Z', cx: 615, cy: 560, name: 'Lower Shadow Wedge Right' },

      // 7: Arcane Sigil Glyphs
      { id: 'bf-glyph-top', number: 7, d: 'M370 70 L430 70 L400 110 Z', cx: 400, cy: 85, name: 'Northern Sigil Crown' },
      { id: 'bf-glyph-bottom', number: 7, d: 'M370 730 L430 730 L400 690 Z', cx: 400, cy: 715, name: 'Southern Sigil Root' },
      { id: 'bf-glyph-left', number: 7, d: 'M70 370 L70 430 L110 400 Z', cx: 85, cy: 400, name: 'Western Sigil Gate' },
      { id: 'bf-glyph-right', number: 7, d: 'M730 370 L730 430 L690 400 Z', cx: 715, cy: 400, name: 'Eastern Sigil Gate' },

      // 8: Accent Solitary Ember Core
      { id: 'bf-center-heart', number: 8, d: 'M400 360 C420 330 450 340 450 370 C450 410 400 440 400 440 C400 440 350 410 350 370 C350 340 380 330 400 360 Z', cx: 400, cy: 385, name: 'Occult Heart Center' },
      { id: 'bf-center-flame-1', number: 8, d: 'M380 440 L420 440 L400 480 Z', cx: 400, cy: 460, name: 'Crucible Ember' },
    ]
  },
  {
    id: 'cbn-sigil-abyss',
    title: 'Plate 08 — Sigil of the Abyss',
    subtitle: 'Solomonic Pentagram & Demonic Gatekeepers',
    category: 'Sigils & Occult',
    difficulty: 'Novice',
    description: 'A five-pointed demonological ward. Intricate geometric chambers that channel infernal majesty.',
    defaultPaletteId: 'abyssal-blood',
    viewBox: '0 0 800 800',
    regions: [
      // 1: Outer Abyssal Void
      { id: 'sig-void-1', number: 1, d: 'M0 0 L800 0 L800 200 L0 200 Z', cx: 400, cy: 100, name: 'Upper Firmament' },
      { id: 'sig-void-2', number: 1, d: 'M0 600 L800 600 L800 800 L0 800 Z', cx: 400, cy: 700, name: 'Lower Tartarus' },
      { id: 'sig-void-3', number: 1, d: 'M0 200 L200 200 L200 600 L0 600 Z', cx: 100, cy: 400, name: 'Western Chasm' },
      { id: 'sig-void-4', number: 1, d: 'M600 200 L800 200 L800 600 L600 600 Z', cx: 700, cy: 400, name: 'Eastern Chasm' },

      // 2: Outer Demonic Ward Ring
      { id: 'sig-ring-ne', number: 2, d: 'M400 80 A320 320 0 0 1 720 400 L680 400 A280 280 0 0 0 400 120 Z', cx: 580, cy: 220, name: 'Ward Ring North-East' },
      { id: 'sig-ring-se', number: 2, d: 'M720 400 A320 320 0 0 1 400 720 L400 680 A280 280 0 0 0 680 400 Z', cx: 580, cy: 580, name: 'Ward Ring South-East' },
      { id: 'sig-ring-sw', number: 2, d: 'M400 720 A320 320 0 0 1 80 400 L120 400 A280 280 0 0 0 400 680 Z', cx: 220, cy: 580, name: 'Ward Ring South-West' },
      { id: 'sig-ring-nw', number: 2, d: 'M80 400 A320 320 0 0 1 400 80 L400 120 A280 280 0 0 0 120 400 Z', cx: 220, cy: 220, name: 'Ward Ring North-West' },

      // 3: The 5 Pentagram Outer Horn Points
      { id: 'sig-horn-top', number: 3, d: 'M400 120 L450 260 L350 260 Z', cx: 400, cy: 190, name: 'Top Vertex Ray' },
      { id: 'sig-horn-tr', number: 3, d: 'M660 300 L530 350 L560 250 Z', cx: 600, cy: 300, name: 'Upper Right Ray' },
      { id: 'sig-horn-br', number: 3, d: 'M570 630 L450 540 L530 480 Z', cx: 520, cy: 560, name: 'Lower Right Ray' },
      { id: 'sig-horn-bl', number: 3, d: 'M230 630 L270 480 L350 540 Z', cx: 280, cy: 560, name: 'Lower Left Ray' },
      { id: 'sig-horn-tl', number: 3, d: 'M140 300 L240 250 L270 350 Z', cx: 200, cy: 300, name: 'Upper Left Ray' },

      // 4: Pentagram Interlocking Web Bands
      { id: 'sig-web-1', number: 4, d: 'M350 260 L450 260 L500 370 L400 370 Z', cx: 420, cy: 310, name: 'Upper Web Cell A' },
      { id: 'sig-web-2', number: 4, d: 'M270 350 L350 260 L400 370 L300 420 Z', cx: 320, cy: 340, name: 'Left Web Cell B' },
      { id: 'sig-web-3', number: 4, d: 'M530 350 L450 260 L400 370 L500 420 Z', cx: 480, cy: 340, name: 'Right Web Cell C' },
      { id: 'sig-web-4', number: 4, d: 'M300 420 L400 370 L400 470 L350 540 Z', cx: 360, cy: 450, name: 'Lower Left Web D' },
      { id: 'sig-web-5', number: 4, d: 'M500 420 L400 370 L400 470 L450 540 Z', cx: 440, cy: 450, name: 'Lower Right Web E' },

      // 5: Horned Demon Silhouette Contours
      { id: 'sig-demon-horn-l', number: 5, d: 'M400 320 C340 280 280 200 290 140 C320 180 360 260 400 300 Z', cx: 330, cy: 220, name: 'Sinister Horn' },
      { id: 'sig-demon-horn-r', number: 5, d: 'M400 320 C460 280 520 200 510 140 C480 180 440 260 400 300 Z', cx: 470, cy: 220, name: 'Dexter Horn' },
      { id: 'sig-demon-brow', number: 5, d: 'M360 330 L440 330 L400 370 Z', cx: 400, cy: 345, name: 'Occult Brow' },

      // 6: Concentric Arcane Inscriptions
      { id: 'sig-glyph-c1', number: 6, d: 'M160 380 L180 420 L140 420 Z', cx: 160, cy: 405, name: 'Western Seal Point' },
      { id: 'sig-glyph-c2', number: 6, d: 'M640 380 L660 420 L620 420 Z', cx: 640, cy: 405, name: 'Eastern Seal Point' },
      { id: 'sig-glyph-c3', number: 6, d: 'M380 660 L420 660 L400 620 Z', cx: 400, cy: 645, name: 'Infernal Gate Pivot' },

      // 7: Inner Sacred Pentagram Core
      { id: 'sig-core-pent', number: 7, d: 'M400 370 L430 420 L400 450 L370 420 Z', cx: 400, cy: 410, name: 'Core Altar Sanctuary' },

      // 8: All-Seeing Eye of Baphomet Center
      { id: 'sig-eye-sclera', number: 8, d: 'M375 410 Q400 395 425 410 Q400 425 375 410 Z', cx: 400, cy: 410, name: 'Eye of Lucifer' },
    ]
  },
  {
    id: 'cbn-obsidian-silk',
    title: 'Vol. 03 — Obsidian & Silk',
    subtitle: 'Latex Reflection, Flowing Contours & Velvet Ribbons',
    category: 'Latex & Silhouette',
    difficulty: 'Master',
    description: 'Sleek dark latex reflections juxtaposed against liquid noir silk. High contrast shine and shadows.',
    defaultPaletteId: 'cyber-nightshade',
    viewBox: '0 0 800 800',
    regions: [
      // 1: Heavy Shadow Drape
      { id: 'obs-bg-left', number: 1, d: 'M0 0 L300 0 L150 800 L0 800 Z', cx: 120, cy: 400, name: 'Deep Velvet Drape Left' },
      { id: 'obs-bg-right', number: 1, d: 'M500 0 L800 0 L800 800 L650 800 Z', cx: 680, cy: 400, name: 'Deep Velvet Drape Right' },

      // 2: Liquid Silk Waves Left
      { id: 'obs-silk-1', number: 2, d: 'M300 0 C250 200 350 400 200 800 L250 800 C400 400 300 200 350 0 Z', cx: 280, cy: 350, name: 'Silk Ribbon Layer Alpha' },
      { id: 'obs-silk-2', number: 2, d: 'M500 0 C550 200 450 400 600 800 L550 800 C400 400 500 200 450 0 Z', cx: 520, cy: 350, name: 'Silk Ribbon Layer Beta' },

      // 3: Latex Silhouette Contours
      { id: 'obs-latex-corset', number: 3, d: 'M350 240 C340 350 360 450 380 560 L420 560 C440 450 460 350 450 240 Z', cx: 400, cy: 400, name: 'High-Gloss Corset Body' },
      { id: 'obs-latex-collar', number: 3, d: 'M370 180 L430 180 L420 230 L380 230 Z', cx: 400, cy: 205, name: 'Polished Choker Ring' },

      // 4: Secondary Sheen Bands
      { id: 'obs-sheen-1', number: 4, d: 'M370 260 C380 340 370 420 385 500 L395 500 C380 420 390 340 380 260 Z', cx: 382, cy: 380, name: 'Latex Specular Highlight Left' },
      { id: 'obs-sheen-2', number: 4, d: 'M430 260 C420 340 430 420 415 500 L405 500 C420 420 410 340 420 260 Z', cx: 418, cy: 380, name: 'Latex Specular Highlight Right' },

      // 5: Silk Flounces
      { id: 'obs-flounce-l', number: 5, d: 'M250 800 C300 650 350 600 380 560 L360 560 C320 620 260 680 200 800 Z', cx: 310, cy: 680, name: 'Lower Flare Left' },
      { id: 'obs-flounce-r', number: 5, d: 'M550 800 C500 650 450 600 420 560 L440 560 C480 620 540 680 600 800 Z', cx: 490, cy: 680, name: 'Lower Flare Right' },

      // 6: Upper Frame Arch
      { id: 'obs-arch-top', number: 6, d: 'M250 0 C250 150 550 150 550 0 L500 0 C500 110 300 110 300 0 Z', cx: 400, cy: 80, name: 'Gothic Vault Drape' },

      // 7: Back Ribbons & Lacing
      { id: 'obs-lace-1', number: 7, d: 'M380 290 L420 330 L410 340 L370 300 Z', cx: 395, cy: 315, name: 'Corset Cross Lace 1' },
      { id: 'obs-lace-2', number: 7, d: 'M420 290 L380 330 L390 340 L430 300 Z', cx: 405, cy: 315, name: 'Corset Cross Lace 2' },
      { id: 'obs-lace-3', number: 7, d: 'M380 360 L420 400 L410 410 L370 370 Z', cx: 395, cy: 385, name: 'Corset Cross Lace 3' },
      { id: 'obs-lace-4', number: 7, d: 'M420 360 L380 400 L390 410 L430 370 Z', cx: 405, cy: 385, name: 'Corset Cross Lace 4' },

      // 8: Ruby Jewel Clasp
      { id: 'obs-clasp-heart', number: 8, d: 'M400 235 L415 250 L400 265 L385 250 Z', cx: 400, cy: 250, name: 'Crimson Blood Gem Clasp' },
    ]
  },
  {
    id: 'cbn-basement-protocol',
    title: 'Vol. 02 — Basement Protocol',
    subtitle: 'Industrial Chains, Rivets & Cold Steel Lattice',
    category: 'Industrial Chains',
    difficulty: 'Intricate',
    description: 'Heavy industrial dungeon architecture. Interlocking welded steel rings and cold mechanical symmetry.',
    defaultPaletteId: 'monochrome-ash',
    viewBox: '0 0 800 800',
    regions: [
      // 1: Concrete Bunker Chamber
      { id: 'bp-chamber-l', number: 1, d: 'M0 0 L250 0 L150 800 L0 800 Z', cx: 100, cy: 400, name: 'Reinforced Bulkhead West' },
      { id: 'bp-chamber-r', number: 1, d: 'M550 0 L800 0 L800 800 L650 800 Z', cx: 700, cy: 400, name: 'Reinforced Bulkhead East' },

      // 2: Steel Truss Pillars
      { id: 'bp-truss-l', number: 2, d: 'M250 0 L290 0 L290 800 L250 800 Z', cx: 270, cy: 400, name: 'Vertical Girder Left' },
      { id: 'bp-truss-r', number: 2, d: 'M510 0 L550 0 L550 800 L510 800 Z', cx: 530, cy: 400, name: 'Vertical Girder Right' },

      // 3: Cross Beams
      { id: 'bp-beam-top', number: 3, d: 'M290 120 L510 120 L510 160 L290 160 Z', cx: 400, cy: 140, name: 'Suspension Beam Alpha' },
      { id: 'bp-beam-bot', number: 3, d: 'M290 640 L510 640 L510 680 L290 680 Z', cx: 400, cy: 660, name: 'Anchor Beam Beta' },

      // 4: Diagonal Rigging Chains
      { id: 'bp-chain-diag-1', number: 4, d: 'M290 160 L510 640 L480 640 L260 160 Z', cx: 360, cy: 380, name: 'Load Bearing Chain A' },
      { id: 'bp-chain-diag-2', number: 4, d: 'M510 160 L290 640 L320 640 L540 160 Z', cx: 440, cy: 380, name: 'Load Bearing Chain B' },

      // 5: Heavy Central Shackle Rings
      { id: 'bp-ring-c1', number: 5, d: 'M400 300 C450 300 480 340 480 400 C480 460 450 500 400 500 C350 500 320 460 320 400 C320 340 350 300 400 300 Z', cx: 400, cy: 330, name: 'Central Rigging Collar' },

      // 6: Steel Links
      { id: 'bp-link-1', number: 6, d: 'M370 200 L430 200 L430 270 L370 270 Z', cx: 400, cy: 235, name: 'Ceiling Hook Link' },
      { id: 'bp-link-2', number: 6, d: 'M370 530 L430 530 L430 600 L370 600 Z', cx: 400, cy: 565, name: 'Floor Tether Link' },

      // 7: Rivet Plates
      { id: 'bp-rivet-plate-l', number: 7, d: 'M260 370 L280 370 L280 430 L260 430 Z', cx: 270, cy: 400, name: 'Stress Plate Left' },
      { id: 'bp-rivet-plate-r', number: 7, d: 'M520 370 L540 370 L540 430 L520 430 Z', cx: 530, cy: 400, name: 'Stress Plate Right' },

      // 8: Warning Indicator Core
      { id: 'bp-core-warning', number: 8, d: 'M370 380 L430 380 L400 420 Z', cx: 400, cy: 395, name: 'Hydraulic Gauge Glow' },
    ]
  },
  {
    id: 'cbn-erotic-geometry',
    title: 'Plate 36 — Erotic Geometry',
    subtitle: 'Sacred Fibonacci Spiral & Noir Torso Curvature',
    category: 'Erotic Geometry',
    difficulty: 'Master',
    description: 'Golden spiral mathematical curves enveloping sensuous body silhouettes in obsidian space.',
    defaultPaletteId: 'gothic-crypt',
    viewBox: '0 0 800 800',
    regions: [
      // 1: Exterior Mathematical Quadrants
      { id: 'eg-quad-1', number: 1, d: 'M0 0 L400 0 L400 400 L0 400 Z', cx: 150, cy: 150, name: 'Quadrant 1' },
      { id: 'eg-quad-2', number: 1, d: 'M400 0 L800 0 L800 400 L400 400 Z', cx: 650, cy: 150, name: 'Quadrant 2' },
      { id: 'eg-quad-3', number: 1, d: 'M400 400 L800 400 L800 800 L400 800 Z', cx: 650, cy: 650, name: 'Quadrant 3' },
      { id: 'eg-quad-4', number: 1, d: 'M0 400 L400 400 L400 800 L0 800 Z', cx: 150, cy: 650, name: 'Quadrant 4' },

      // 2: Fibonacci Primary Spiral Arc
      { id: 'eg-spiral-outer', number: 2, d: 'M100 700 C100 200 600 100 700 400 C750 550 650 700 500 700 C400 700 350 600 350 500 Z', cx: 550, cy: 300, name: 'Golden Ratio Outer Spiral' },

      // 3: Female Form Curve Silhouette
      { id: 'eg-torso-flank', number: 3, d: 'M340 250 C380 320 420 420 360 560 L440 560 C500 420 460 320 420 250 Z', cx: 400, cy: 380, name: 'Anatomical Center Arc' },

      // 4: Intersecting Chords
      { id: 'eg-chord-1', number: 4, d: 'M200 200 L600 600 L560 620 L160 220 Z', cx: 280, cy: 300, name: 'Golden Diagonal Alpha' },
      { id: 'eg-chord-2', number: 4, d: 'M600 200 L200 600 L240 620 L640 220 Z', cx: 520, cy: 300, name: 'Golden Diagonal Beta' },

      // 5: Inner Spiral Core
      { id: 'eg-spiral-inner', number: 5, d: 'M350 500 C350 420 420 420 440 460 C460 500 420 530 400 530 Z', cx: 400, cy: 470, name: 'Fibonacci Vortex Eye' },

      // 6: Harmonic Ellipse
      { id: 'eg-ellipse-tilt', number: 6, d: 'M250 400 C250 300 550 300 550 400 C550 500 250 500 250 400 Z', cx: 400, cy: 330, name: 'Orbital Resonance Ring' },

      // 7: Tangent Rhombus
      { id: 'eg-rhombus', number: 7, d: 'M400 200 L480 350 L400 500 L320 350 Z', cx: 400, cy: 260, name: 'Sacred Vesica Diamond' },

      // 8: Singularity Focal Point
      { id: 'eg-focal-point', number: 8, d: 'M385 470 A15 15 0 1 1 415 470 A15 15 0 1 1 385 470 Z', cx: 400, cy: 470, name: 'Divine Singularity' },
    ]
  }
];
