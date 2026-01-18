import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
  return useContext(UserContext);
};