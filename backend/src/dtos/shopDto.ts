export interface ShopResponseDto {
  id: string;
  name: string;
  address: string;
  rating: number;
}

export interface CreateShopDto {
  name: string;
  address: string;
  rating: number;
}