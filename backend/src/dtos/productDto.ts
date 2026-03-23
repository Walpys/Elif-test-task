export interface CreateProductDto {
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  shopId: string; 
}


export interface ProductResponseDto {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string | null;
  shopId: string;
  createdAt: Date;
}