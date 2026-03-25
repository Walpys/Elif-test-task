import type { GetProductsResponse } from "../types/product";
import api from "./axios";


  export const productApi = {
    getByShop: async (query: any): Promise<GetProductsResponse> => {
    const { data } = await api.get<GetProductsResponse>('/products', { params: query });
    return data;
  },

  getCategories: async (shopId: string): Promise<string[]> => {
    const { data } = await api.get(`/products/categories/${shopId}`);
    return data;
  },
};