export type AppPage = 
  | 'home' 
  | 'studio' 
  | 'gallery' 
  | 'category' 
  | 'volume' 
  | 'reader' 
  | 'downloads' 
  | 'about';

export type PlateCategory = 
  | 'All'
  | 'Bondage Studies' 
  | 'Sigils & Occult' 
  | 'Industrial Chains' 
  | 'Latex & Silhouette' 
  | 'Erotic Geometry';

export interface ColoringPage {
  id: string;
  title: string;
  previewUrl: string;
  svgPath?: string;
}

export interface ArchiveVolume {
  id: string;
  volNumber: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  price: number;
  badge: string;
  pagesCount: number;
  releaseDate: string;
  paperSpec: string;
  bindingSpec: string;
  samplePages: string[];
  isUpcoming?: boolean;
}

export interface CartItem {
  volume: ArchiveVolume;
  quantity: number;
  format: 'physical' | 'digital' | 'bundle';
}

export interface NewsletterFormState {
  name: string;
  email: string;
  submitted: boolean;
  message?: string;
}

export interface WaitlistFormState {
  email: string;
  submitted: boolean;
  position?: number;
}
