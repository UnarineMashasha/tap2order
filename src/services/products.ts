import api from "./api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProducts = async () => {
  const response = await api.get("/products", getAuthConfig());

  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await api.post("/products", productData, getAuthConfig());
  return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
  const response = await api.put(
    `/products/${id}`,
    productData,
    getAuthConfig(),
  );

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`, getAuthConfig());

  return response.data;
};
