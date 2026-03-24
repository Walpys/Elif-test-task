import type { ShortShop } from "../types/shop";
import api from "./axios";

export const shopApi = {
  // Отримати всі магазини
  getAll: async (): Promise<ShortShop[]> => {
    const { data } = await api.get('/shops');
    return data;
  },
};