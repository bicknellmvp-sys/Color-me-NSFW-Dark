import { 
  basementProtocolImg, 
  midnightCrossfireImg, 
  steelPulseImg, 
  primalReckoningImg, 
  laceAndLongingImg, 
  tattooFlashImg 
} from './volumes';

export interface PlateItem {
  id: string;
  plateNumber: number;
  title: string;
  category: 'Bondage Studies' | 'Sigils & Occult' | 'Industrial Chains' | 'Latex & Silhouette' | 'Erotic Geometry';
  description: string;
  svgDataUri: string;
  isOriginalArtwork?: boolean;
  badge?: string;
}

// Helper to generate crisp, dark gothic vector line art SVGs for all 42 plates
export function generatePlateSVG(plateNum: number, title: string, category: string): string {
  const rotation = (plateNum * 17) % 360;
  const strokeColor = plateNum % 3 === 0 ? '#e60026' : '#ffffff';
  const accentColor = plateNum % 2 === 0 ? '#e60026' : '#ffb3ae';
  
  // Varying geometric shapes and linework paths for 42 unique line art plates
  let paths = '';

  if (plateNum % 5 === 1) {
    // Bondage / Restriction Studies
    paths = `
      <circle cx="400" cy="400" r="320" stroke="${accentColor}" stroke-width="2"/>
      <circle cx="400" cy="400" r="280" stroke="#333333" stroke-dasharray="6 6"/>
      <polygon points="400,120 640,560 160,560" stroke="#ffffff" stroke-width="2"/>
      <polygon points="400,680 160,240 640,240" stroke="#ffffff" stroke-width="2"/>
      <path d="M400 200 Q440 280 430 380 Q460 480 430 580 Q400 660 400 700 Q390 660 370 580 Q340 480 370 380 Q360 280 400 200 Z" stroke="#ffffff" stroke-width="2.5"/>
      <path d="M180 250 Q400 320 620 250 M180 350 Q400 420 620 350 M180 450 Q400 520 620 450 M180 550 Q400 620 620 550" stroke="${accentColor}" stroke-width="2" stroke-dasharray="8 4"/>
    `;
  } else if (plateNum % 5 === 2) {
    // Industrial Chains & Rigging
    paths = `
      <rect x="80" y="80" width="640" height="640" stroke="#333333" stroke-width="2"/>
      <line x1="80" y1="200" x2="720" y2="200" stroke="${accentColor}" stroke-width="2" stroke-dasharray="10 5"/>
      <line x1="80" y1="400" x2="720" y2="400" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="80" y1="600" x2="720" y2="600" stroke="${accentColor}" stroke-width="2" stroke-dasharray="10 5"/>
      <path d="M200 80 L200 720 M600 80 L600 720" stroke="#ffffff" stroke-width="2"/>
      <circle cx="400" cy="400" r="220" stroke="#ffffff" stroke-width="2"/>
      <path d="M150 200 C300 450 500 450 650 200 M150 600 C300 350 500 350 650 600" stroke="#ffffff" stroke-width="3"/>
    `;
  } else if (plateNum % 5 === 3) {
    // Sigils & Occult Geometry
    paths = `
      <circle cx="400" cy="400" r="340" stroke="${accentColor}" stroke-width="3"/>
      <circle cx="400" cy="400" r="310" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="400,90 490,270 690,270 530,390 590,590 400,470 210,590 270,390 110,270 310,270" stroke="#ffffff" stroke-width="2.5"/>
      <circle cx="400" cy="400" r="150" stroke="${accentColor}" stroke-width="2"/>
      <path d="M300 300 L500 500 M500 300 L300 500" stroke="#ffffff" stroke-width="3"/>
      <ellipse cx="400" cy="400" rx="250" ry="80" stroke="#ffffff" stroke-width="1.5" transform="rotate(${rotation} 400 400)"/>
    `;
  } else if (plateNum % 5 === 4) {
    // Latex & Silhouette Contour
    paths = `
      <path d="M120 120 L680 120 L680 680 L120 680 Z" stroke="#333333" stroke-width="2"/>
      <path d="M250 150 C380 250 420 400 320 650 M550 150 C420 250 380 400 480 650" stroke="#ffffff" stroke-width="3"/>
      <path d="M150 280 C320 320 480 320 650 280 M150 480 C320 520 480 520 650 480" stroke="${accentColor}" stroke-width="2"/>
      <circle cx="400" cy="220" r="60" stroke="#ffffff" stroke-width="2"/>
      <path d="M340 220 L460 220 M400 160 L400 280" stroke="${accentColor}" stroke-width="2"/>
    `;
  } else {
    // Erotic Geometry
    paths = `
      <polygon points="400,70 730,400 400,730 70,400" stroke="${accentColor}" stroke-width="2.5"/>
      <polygon points="400,150 650,400 400,650 150,400" stroke="#ffffff" stroke-width="1.5"/>
      <ellipse cx="400" cy="400" rx="120" ry="220" stroke="#ffffff" stroke-width="2"/>
      <ellipse cx="400" cy="400" rx="220" ry="120" stroke="#ffffff" stroke-width="2"/>
      <circle cx="400" cy="400" r="60" stroke="${accentColor}" stroke-width="3"/>
    `;
  }

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" fill="#0c0c0c"/>
  <g stroke-linecap="round" stroke-linejoin="round" fill="none">
    ${paths}
    <text x="400" y="750" text-anchor="middle" fill="${accentColor}" font-family="sans-serif" font-weight="bold" font-size="14" letter-spacing="6">
      COLOR ME NSFW • PLATE ${plateNum < 10 ? '0' + plateNum : plateNum} — ${title.toUpperCase()}
    </text>
  </g>
</svg>
`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

// Custom mapping of authentic artist illustrations
const AUTHENTIC_PLATES_MAP: Record<number, { image: string; badge: string }> = {
  1: { image: basementProtocolImg, badge: 'Official Plate' },
  2: { image: midnightCrossfireImg, badge: 'Official Plate' },
  3: { image: steelPulseImg, badge: 'Official Plate' },
  4: { image: primalReckoningImg, badge: 'Official Plate' },
  5: { image: laceAndLongingImg, badge: 'Official Plate' },
  6: { image: tattooFlashImg, badge: 'Official Plate' },
};

// Titles & Categories for the 42 plates in the book
const PLATE_TITLES = [
  { title: "Basement Protocol", category: "Industrial Chains", desc: "Heavy underground concrete chamber with exposed pipes, bare bulb, and captive chair tension linework." },
  { title: "Midnight Crossfire", category: "Latex & Silhouette", desc: "Classic film noir detective leaping across a vintage coupe hood firing into rainy neon streets." },
  { title: "Steel Pulse", category: "Industrial Chains", desc: "Biomechanical cyber-minotaur cyborg with exposed hydraulic ribcage and battle axe." },
  { title: "Primal Reckoning", category: "Sigils & Occult", desc: "Long-haired barbarian warrior with broadsword battling a shadowy hellhound demon under Gothic stained glass." },
  { title: "Lace & Longing", category: "Erotic Geometry", desc: "Art Nouveau siren dancing in sheer floral lace negligee framed by ornate circular botanical filigree." },
  { title: "Tattoo Flash & Mandalas", category: "Bondage Studies", desc: "Studio sketchbook flash sheet featuring traditional eagle, wild poppies, roaring tiger, and sacred mandalas." },
  { title: "The Bound Form", category: "Bondage Studies", desc: "Classic rope harness linework with anatomical tension vectors." },
  { title: "Obsidian & Silk", category: "Erotic Geometry", desc: "Geometric drape study contrasting smooth silk curves with sharp stone angles." },
  { title: "Solomonic Sigil I", category: "Sigils & Occult", desc: "Occult ceremonial pentacle with classical grimoire lettering." },
  { title: "Latex Gloss Study", category: "Latex & Silhouette", desc: "Reflective highlight contours on high-gloss body-suit forms." },
  { title: "Shibari Lattice", category: "Bondage Studies", desc: "Intricate chest diamond harness with diamond knot details." },
  { title: "Iron Suspensions", category: "Industrial Chains", desc: "Ceiling-suspended steel ring line art with heavy anchor pins." },
  { title: "Arcane Sigil II", category: "Sigils & Occult", desc: "Double-ring demon invocation circle with planetary glyphs." },
  { title: "Velvet Restraint", category: "Bondage Studies", desc: "Soft strap line art study exploring gentle wrist binding." },
  { title: "Monolith Contour", category: "Erotic Geometry", desc: "Minimalist torso silhouette framed by brutalist pillars." },
  { title: "The Gag & Collar", category: "Bondage Studies", desc: "Detailed leather grain linework and brass ring collar study." },
  { title: "Steel Cage Perspective", category: "Industrial Chains", desc: "Deep vanishing point line art of an industrial dungeon chamber." },
  { title: "Gothic Arch Silhouette", category: "Latex & Silhouette", desc: "Pointed arch framing a hooded latex figure." },
  { title: "Grimoire Seal III", category: "Sigils & Occult", desc: "Complex 7-pointed star seal for ceremonial ink coloring." },
  { title: "Suspension Frame", category: "Industrial Chains", desc: "A-frame rigging with pulley systems and rope spools." },
  { title: "Knot Matrix", category: "Bondage Studies", desc: "Close-up line art tutorial study of traditional jute rope knots." },
  { title: "Vinyl Reflections", category: "Latex & Silhouette", desc: "Dramatic chiaroscuro line art capturing high-contrast light reflections." },
  { title: "Demon Sigil IV", category: "Sigils & Occult", desc: "Goetia-inspired invocation seal with intricate flourishes." },
  { title: "Brutalist Corridor", category: "Industrial Chains", desc: "Heavy geometric corridors with overhead pipework." },
  { title: "Silk Wrap Silhouette", category: "Erotic Geometry", desc: "Cascading fabric curves wrapping a reclined figure." },
  { title: "Corset Lacing", category: "Bondage Studies", desc: "Tight-lacing back view with intricate eyelet and ribbon paths." },
  { title: "Ankle Cuff Anchor", category: "Industrial Chains", desc: "Heavy floor-ring anchoring line art with chain slack loops." },
  { title: "Cosmic Sigil V", category: "Sigils & Occult", desc: "Celestial orb and star alignment ritual diagram." },
  { title: "Catwoman Mask Study", category: "Latex & Silhouette", desc: "Cowl and mask line art with detailed seam stitching." },
  { title: "Floor Harness Spread", category: "Bondage Studies", desc: "Prone figure harness layout with radial rope symmetry." },
  { title: "Steel Mesh Portal", category: "Industrial Chains", desc: "Expanded metal grate texture with dramatic backlight lines." },
  { title: "Solomonic Ring", category: "Sigils & Occult", desc: "Brass ring talisman with engraved Hebrew and Latin sigils." },
  { title: "Gloss Leggings Line", category: "Latex & Silhouette", desc: "High-waisted glossy seam contours and shadow hatches." },
  { title: "Throne of Chains", category: "Industrial Chains", desc: "Iron throne wrapped in cascading anchor chains." },
  { title: "Serpentine Wrap", category: "Erotic Geometry", desc: "Spiral geometric bands enveloping a central figure." },
  { title: "Leather Blindfold", category: "Bondage Studies", desc: "Buckle and strap detail across facial contours." },
  { title: "Ceremonial Altar", category: "Sigils & Occult", desc: "Stone slab with candle flame linework and dagger sigils." },
  { title: "Suspended Ring", category: "Industrial Chains", desc: "Single aerial hoop with hanging leather straps." },
  { title: "High Gloss Corset", category: "Latex & Silhouette", desc: "Underbust corset with boning seam guides." },
  { title: "Tortoise Shell Binding", category: "Bondage Studies", desc: "Kikkou (tortoise shell) rope pattern across the back." },
  { title: "Obsidian Mirror", category: "Erotic Geometry", desc: "Oval reflective surface with geometric floral sigils." },
  { title: "Goetia Triangle", category: "Sigils & Occult", desc: "Triangle of Evocation with Michael and Tetragrammaton lettering." }
] as const;

export const ALL_42_PLATES: PlateItem[] = PLATE_TITLES.map((pt, idx) => {
  const plateNumber = idx + 1;
  const authentic = AUTHENTIC_PLATES_MAP[plateNumber];
  return {
    id: `plate-${plateNumber}`,
    plateNumber,
    title: pt.title,
    category: pt.category as PlateItem['category'],
    description: pt.desc,
    svgDataUri: authentic ? authentic.image : generatePlateSVG(plateNumber, pt.title, pt.category),
    isOriginalArtwork: !!authentic,
    badge: authentic ? authentic.badge : undefined
  };
});
