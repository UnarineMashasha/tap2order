import api from "./api";

type CustomerData = {
  name: string;
  phone: string;
  status: "Active" | "New" | "VIP";
};

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCustomers = async () => {
  const response = await api.get("/customers", getAuthConfig());

  return response.data;
};

export const createCustomer = async (customerData: CustomerData) => {
  const response = await api.post("/customers", customerData, getAuthConfig());

  return response.data;
};

export const updateCustomer = async (
  id: string,
  customerData: CustomerData,
) => {
  const response = await api.put(
    `/customers/${id}`,
    customerData,
    getAuthConfig(),
  );

  return response.data;
};

export const deleteCustomer = async (id: string) => {
  const response = await api.delete(`/customers/${id}`, getAuthConfig());

  return response.data;
};
