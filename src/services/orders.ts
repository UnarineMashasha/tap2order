import api from "./api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getOrders = async () => {
  const response = await api.get("/orders", getAuthConfig());

  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await api.post("/orders", orderData, getAuthConfig());

  return response.data;
};

export const updateOrder = async (id: string, orderData: any) => {
  const response = await api.put(`/orders/${id}`, orderData, getAuthConfig());

  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await api.delete(`/orders/${id}`, getAuthConfig());

  return response.data;
};
