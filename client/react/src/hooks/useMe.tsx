import { useQuery } from "@tanstack/react-query";
import { profile } from "../services/profile";

export function verifyUser(){
  return useQuery({
    queryKey: ["profile"],
    queryFn: profile
  })
}