import api from "./api";

type LoginPayload = {
  email: string;
  password: string;
}

type RegisterPayload = {
  username: string,
  name: string,
  email: string,
  password: string
}

export const loginUser = async (payload: LoginPayload ) => {
  try {
    const response = await api.post("/auth/login", payload)
    console.log(response)
    return response.data;
  } catch (error: any) {
    const meesageError = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(meesageError)
  }
}

export const registerUser =  async (payload : RegisterPayload ) => {
  try {
    const response = await api.post("/auth/register", payload )
    console.log(response)
    return response.data
  } catch (error) {
    throw error
  }
}