import api from "./api";

export const profile = async () => {
  try {
    const response = await api.get("/user/profile");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}