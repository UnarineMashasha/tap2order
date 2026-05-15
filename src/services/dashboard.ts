import api from "./api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats", getAuthConfig());

  return response.data;
};
