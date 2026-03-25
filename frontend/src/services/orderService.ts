import { orderApi } from '../api/orderApi';
import type{ CreateOrder, OrderItem } from '../types/order';

export const orderService = {
  async placeOrder(formData: any, cartItems: any[]) {
    const orderPayload: CreateOrder = {
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      userAddress: formData.address,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    return await orderApi.create(orderPayload);
  }
};