// src/hooks/useUpdateAppointment.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UpdateAppointmentParams {
  id: number;
  status: string;
}

function useUpdateAppointment() {

  return useMutation<void, Error, UpdateAppointmentParams>({
    mutationFn: async ({ id, status }: UpdateAppointmentParams) => {
      await axios.patch(`http://127.0.0.1:8000/appointments/${id}/`, {
        status,
      });
    },
  });
}

export default useUpdateAppointment;
