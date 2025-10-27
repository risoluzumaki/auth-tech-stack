import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const loginUser = async (payload: LoginPayload ) => {
  const response = await api.post("/login", payload)
  return response;  
}

type RegisterPayload = {
  name: string,
  email: string,
  password: string
}

export const registerUser =  async (payload : RegisterPayload ) => {
  const response = await api.post("/register", payload )
  return response
}