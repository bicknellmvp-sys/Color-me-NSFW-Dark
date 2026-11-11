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

// Curated Dark Color-By-Number Templates including the user's uploaded master illustrations
export const COLOR_BY_NUMBER_TEMPLATES: ColorByNumberTemplate[] = [
  {
    id: 'cbn-demon-queen',
    title: 'Demon Queen & Skull Throne',
    subtitle: 'Uploaded Master Plate — Horned Queen & Skulls',
    category: 'Sigils & Occult',
    difficulty: 'Master',
    description: 'Paint-by-numbers mode for your uploaded Demon Queen masterpiece. Color the gothic window, horns, and skull stack.',
    defaultPaletteId: 'abyssal-blood',
    viewBox: '0 0 800 800',
    regions: [
      { id: 'dq-bg-1', number: 1, d: 'M0 0 L400 0 L400 400 L0 400 Z', cx: 100, cy: 100, name: 'Background Void Left' },
      { id: 'dq-bg-2', number: 1, d: 'M400 0 L800 0 L800 400 L400 400 Z', cx: 700, cy: 100, name: 'Background Void Right' },
      { id: 'dq-throne-1', number: 2, d: 'M100 400 A300 300 0 0 1 700 400 L650 400 A250 250 0 0 0 150 400 Z', cx: 400, cy: 150, name: 'Gothic Rose Arch' },
      { id: 'dq-horns-l', number: 3, d: 'M350 200 C300 120 180 80 100 120 C150 160 250 220 320 250 Z', cx: 200, cy: 150, name: 'Left Horn' },
      { id: 'dq-horns-r', number: 3, d: 'M450 200 C500 120 620 80 700 120 C650 160 550 220 480 250 Z', cx: 600, cy: 150, name: 'Right Horn' },
      { id: 'dq-hair', number: 4, d: 'M250 180 C200 220 180 320 220 420 C260 320 300 250 350 220 Z', cx: 220, cy: 300, name: 'Cascading Hair Left' },
      { id: 'dq-face', number: 5, d: 'M360 200 C350 260 370 320 400 320 C430 320 450 260 440 200 Z', cx: 400, cy: 260, name: 'Fierce Visage' },
      { id: 'dq-chains', number: 6, d: 'M320 320 L480 320 L450 420 L350 420 Z', cx: 400, cy: 370, name: 'Spiked Chain Regalia' },
      { id: 'dq-skulls-stack', number: 7, d: 'M300 500 L500 500 L550 750 L250 750 Z', cx: 400, cy: 620, name: 'Skull Throne Foundation' },
      { id: 'dq-core-accent', number: 8, d: 'M380 580 L420 580 L400 640 Z', cx: 400, cy: 610, name: 'Central Ritual Ember' },
    ]
  },
  {
    id: 'cbn-thorn-siren',
    title: 'Thorn Circle Siren',
    subtitle: 'Uploaded Master Plate — Wreath & Fluid Linework',
    category: 'Erotic Geometry',
    difficulty: 'Intricate',
    description: 'Paint-by-numbers mode for your uploaded Thorn Circle Siren masterpiece. Fill the botanical thorns and silk curves.',
    defaultPaletteId: 'abyssal-blood',
    viewBox: '0 0 800 800',
    regions: [
      { id: 'ts-bg-1', number: 1, d: 'M0 0 L800 0 L800 300 L0 300 Z', cx: 400, cy: 150, name: 'Atmospheric Void' },
      { id: 'ts-wreath-top', number: 2, d: 'M200 100 C300 50 500 50 600 100 C500 150 300 150 200 100 Z', cx: 400, cy: 80, name: 'Thorny Canopy' },
      { id: 'ts-hair-flow', number: 3, d: 'M220 150 C180 250 200 400 280 450 C240 320 250 200 320 160 Z', cx: 240, cy: 280, name: 'Flowing Hair Waves' },
      { id: 'ts-figure-torso', number: 4, d: 'M340 300 L460 300 L450 500 L350 500 Z', cx: 400, cy: 400, name: 'Sensual Torso & Lacing' },
      { id: 'ts-lower-drape', number: 5, d: 'M300 500 L500 500 L600 750 L200 750 Z', cx: 400, cy: 620, name: 'Cascading Silk & Thorns' },
      { id: 'ts-thorns-left', number: 6, d: 'M50 250 L200 300 L150 450 L50 350 Z', cx: 110, cy: 350, name: 'Thorn Vine Cluster West' },
      { id: 'ts-thorns-right', number: 6, d: 'M750 250 L600 300 L650 450 L750 350 Z', cx: 690, cy: 350, name: 'Thorn Vine Cluster East' },
      { id: 'ts-glow-accent', number: 8, d: 'M380 380 L420 380 L400 430 Z', cx: 400, cy: 405, name: 'Heart Pendant Gem' },
    ]
  },
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
      { id: 'bf-bg-1', number: 1, d: 'M0 0 L400 0 L400 400 L0 400 Z', cx: 120, cy: 120, name: 'Void Quadrant NW' },
      { id: 'bf-bg-2', number: 1, d: 'M400 0 L800 0 L800 400 L400 400 Z', cx: 680, cy: 120, name: 'Void Quadrant NE' },
      { id: 'bf-bg-3', number: 1, d: 'M0 400 L400 400 L400 800 L0 800 Z', cx: 120, cy: 680, name: 'Void Quadrant SW' },
      { id: 'bf-bg-4', number: 1, d: 'M400 400 L800 400 L800 800 L400 800 Z', cx: 680, cy: 680, name: 'Void Quadrant SE' },
      { id: 'bf-ring-top', number: 2, d: 'M400 50 A350 350 0 0 1 750 400 L710 400 A310 310 0 0 0 400 90 Z', cx: 580, cy: 200, name: 'Outer Arc Superior' },
      { id: 'bf-ring-right', number: 2, d: 'M750 400 A350 350 0 0 1 400 750 L400 710 A310 310 0 0 0 710 400 Z', cx: 600, cy: 600, name: 'Outer Arc Inferior East' },
      { id: 'bf-ring-bottom', number: 2, d: 'M400 750 A350 350 0 0 1 50 400 L90 400 A310 310 0 0 0 400 710 Z', cx: 200, cy: 600, name: 'Outer Arc Inferior West' },
      { id: 'bf-ring-left', number: 2, d: 'M50 400 A350 350 0 0 1 400 50 L400 90 A310 310 0 0 0 90 400 Z', cx: 220, cy: 200, name: 'Outer Arc Superior West' },
      { id: 'bf-tri-top', number: 3, d: 'M400 120 L580 400 L400 340 Z', cx: 460, cy: 270, name: 'Inverted Apex Right' },
      { id: 'bf-tri-top-l', number: 3, d: 'M400 120 L220 400 L400 340 Z', cx: 340, cy: 270, name: 'Inverted Apex Left' },
      { id: 'bf-cord-upper-left', number: 4, d: 'M180 280 Q400 340 620 280 L620 310 Q400 370 180 310 Z', cx: 300, cy: 320, name: 'Torso Restraint Band 1' },
      { id: 'bf-cord-mid', number: 4, d: 'M190 380 Q400 440 610 380 L610 410 Q400 470 190 410 Z', cx: 500, cy: 420, name: 'Torso Restraint Band 2' },
      { id: 'bf-body-head', number: 5, d: 'M400 150 C430 150 450 180 450 220 C450 260 420 280 400 280 C380 280 350 260 350 220 C350 180 370 150 400 150 Z', cx: 400, cy: 215, name: 'Veiled Visage' },
      { id: 'bf-body-torso-l', number: 5, d: 'M360 280 C320 350 310 430 330 500 L400 480 L400 280 Z', cx: 355, cy: 370, name: 'Ribs & Flank Left' },
      { id: 'bf-body-torso-r', number: 5, d: 'M440 280 C480 350 490 430 470 500 L400 480 L400 280 Z', cx: 445, cy: 370, name: 'Ribs & Flank Right' },
      { id: 'bf-shadow-l1', number: 6, d: 'M140 160 L240 240 L180 320 Z', cx: 185, cy: 240, name: 'Side Shadow Wedge Left' },
      { id: 'bf-glyph-top', number: 7, d: 'M370 70 L430 70 L400 110 Z', cx: 400, cy: 85, name: 'Northern Sigil Crown' },
      { id: 'bf-center-heart', number: 8, d: 'M400 360 C420 330 450 340 450 370 C450 410 400 440 400 440 C400 440 350 410 350 370 C350 340 380 330 400 360 Z', cx: 400, cy: 385, name: 'Occult Heart Center' },
    ]
  }
];
