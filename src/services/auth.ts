import api from "./api";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  businessName: string,
) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
    businessName,
  });

  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
