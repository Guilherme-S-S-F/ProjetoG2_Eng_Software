// src/hooks/useGetAppointments.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import IAppointments from '../../interfaces/IAppointments';

function useGetAppointments() {
    return useQuery<IAppointments[], Error>({
        queryKey: ['appointments'], // chave única para cache
        queryFn: async () => {
            const response = await axios.get<IAppointments[]>(
                'http://127.0.0.1:8000/appointments/'
            );
            console.log(response.data)
            return response.data;
        },
    });
}

export default useGetAppointments;
