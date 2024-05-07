export interface GoodsCategory {
  id: number;
  name: string;
  division: string;
  img_url: string;
  count?: number;
}

export interface ProductItem {
  productId: string;
  quantity: number;
  imageUrl: string | undefined;
  thumbnail: string | undefined;
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category_id: number;
  content: string;
  img_urls: { thumbnail: string; main: string; info: string };
  rating: number;
  reviewCount: number;
  created_at: string;
}