
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[]; // Changed from single image to array of images
  available: boolean;
}
