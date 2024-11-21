// src/hooks/useGetAppointments.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import IUser from '../../interfaces/IUser';

function useGetUsers() {
    return useQuery<IUser[], Error>({
        queryKey: ['users'], // chave única para cache
        queryFn: async () => {
            const response = await axios.get<IUser[]>(
                'http://127.0.0.1:8000/users/'
            );
            console.log(response.data)
            return response.data;
        },
    });
}

export default useGetUsers;
