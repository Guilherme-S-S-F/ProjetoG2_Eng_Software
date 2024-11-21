// src/hooks/useUpdateAppointment.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UpdateUserParams {
  id: string;
  user: {
    name: string,
    email: string,
    role: string,
    phone: string,
}
};


function useUpdateUser() {

  return useMutation<void, Error, UpdateUserParams>({
    mutationFn: async ({ id, user }: UpdateUserParams) => {
      await axios.put(`http://127.0.0.1:8000/user/${id}/`, user);
    },
  });
}

export default useUpdateUser;
