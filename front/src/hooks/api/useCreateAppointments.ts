import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import IAppointmentCreate from "../../interfaces/IAppointmentCreate"; // Ajuste conforme necessário para o tipo AppointmentCreate

const useCreateAppointment = () => {
  return useMutation<IAppointmentCreate, Error, IAppointmentCreate>({
    mutationFn: async (appointment) => {
      const response = await axios.post("http://localhost:8000/appointments", appointment);
      return response.data;
    },
  });
};

export default useCreateAppointment;
