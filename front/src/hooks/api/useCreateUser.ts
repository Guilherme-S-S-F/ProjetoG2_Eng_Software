import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UserCreateData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

const useCreateUser = () => {
  return useMutation({
    mutationFn: async (userData: UserCreateData) => {
      const response = await axios.post("http://127.0.0.1:8000/user/", userData);
      return response.data;
    },
  });
};

export default useCreateUser;
