import type { ProductDetails } from "../types/product";
import api from "./axios";

export const productApi = {

  getByShop: async (shopId: string): Promise<{ items: ProductDetails[] }> => {
    const { data } = await api.get('/products', {
      params: { shopId, limit: 50 }, 
    });
    return data;
  },
};