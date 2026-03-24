export interface ProductQuery {
  shopId: string;
  category?: string;
  sortBy?: 'price' | 'name'; 
  order?: 'asc' | 'desc';
  cursor?: string; 
  limit?: number; 
}