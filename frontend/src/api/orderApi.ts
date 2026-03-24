import api from "./axios";

export const orderApi = {
  create: async (orderData: any) => {
    const { data } = await api.post('/orders', orderData);
    return data;
  },
  getHistory: async (email?: string, phone?: string) => {
    const { data } = await api.get('/orders/history', {
      params: { email, phone },
    });
    return data;
  },
};