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

// Curated Master Collection including the user's newly uploaded master illustrations
const CURATED_PLATE_DATA = [
  {
    plateNumber: 1,
    title: "Demon Queen & Skull Throne",
    category: "Sigils & Occult",
    description: "Fierce horned queen presiding over a gothic rose window throne stacked with human skulls and ritual chains.",
    image: "/assets/aistudio/Gemini_Generated_Image_183bzd183bzd183b_59336018.jfif",
    badge: "Masterpiece"
  },
  {
    plateNumber: 2,
    title: "Thorn Circle Siren",
    category: "Erotic Geometry",
    description: "Sensual figure framed by an intricate circular wreath of sharp gothic thorns and cascading fluid linework.",
    image: "/assets/aistudio/Gemini_Generated_Image_z1x2a1z1x2a1z1x2_e8e4ae2d.jfif",
    badge: "Masterpiece"
  },
  {
    plateNumber: 3,
    title: "Basement Protocol",
    category: "Industrial Chains",
    description: "Heavy underground concrete chamber with exposed pipes, bare bulb, and captive chair tension linework.",
    image: basementProtocolImg,
    badge: "Official Plate"
  },
  {
    plateNumber: 4,
    title: "Midnight Crossfire",
    category: "Latex & Silhouette",
    description: "Classic film noir detective leaping across a vintage coupe hood firing into rainy neon streets.",
    image: midnightCrossfireImg,
    badge: "Official Plate"
  },
  {
    plateNumber: 5,
    title: "Steel Pulse",
    category: "Industrial Chains",
    description: "Biomechanical cyber-minotaur cyborg with exposed hydraulic ribcage and battle axe.",
    image: steelPulseImg,
    badge: "Official Plate"
  },
  {
    plateNumber: 6,
    title: "Primal Reckoning",
    category: "Sigils & Occult",
    description: "Long-haired barbarian warrior with broadsword battling a shadowy hellhound demon under Gothic stained glass.",
    image: primalReckoningImg,
    badge: "Official Plate"
  },
  {
    plateNumber: 7,
    title: "Lace & Longing",
    category: "Erotic Geometry",
    description: "Art Nouveau siren dancing in sheer floral lace negligee framed by ornate circular botanical filigree.",
    image: laceAndLongingImg,
    badge: "Official Plate"
  },
  {
    plateNumber: 8,
    title: "Tattoo Flash & Mandalas",
    category: "Bondage Studies",
    description: "Studio sketchbook flash sheet featuring traditional eagle, wild poppies, roaring tiger, and sacred mandalas.",
    image: tattooFlashImg,
    badge: "Official Plate"
  },
  {
    plateNumber: 9,
    title: "Solomonic Sigil I",
    category: "Sigils & Occult",
    description: "Occult ceremonial pentacle with classical grimoire lettering for precise color-by-number zones.",
    image: primalReckoningImg,
    badge: "Curated"
  },
  {
    plateNumber: 10,
    title: "Latex Gloss Study",
    category: "Latex & Silhouette",
    description: "Reflective highlight contours on high-gloss body-suit forms designed for dramatic contrast.",
    image: midnightCrossfireImg,
    badge: "Curated"
  }
];

export const ALL_42_PLATES: PlateItem[] = CURATED_PLATE_DATA.map((item) => ({
  id: `plate-${item.plateNumber}`,
  plateNumber: item.plateNumber,
  title: item.title,
  category: item.category as PlateItem['category'],
  description: item.description,
  svgDataUri: item.image,
  isOriginalArtwork: true,
  badge: item.badge
}));
