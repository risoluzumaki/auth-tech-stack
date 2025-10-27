import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/auth";

export function useLogin(){
  return useMutation({
    mutationFn: loginUser
  })
}

export function useRegister(){
  return useMutation ({
    mutationFn: registerUser
  })
}