export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  shopId: string;
  category: string;
}

export interface GetProductsResponse {
  items: ProductDetails[];
  nextCursor: string | null;
  totalCount: number;
}