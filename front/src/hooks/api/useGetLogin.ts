// src/hooks/useGetLogin.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserRoleEnum } from '../../Enums';

// Tipos de dados esperados para a resposta e para os parâmetros
type DataResponse = {
    id: number;
    name: string;
    role: UserRoleEnum;
    email: string;
    phone: string;
};

type LoginParams = {
    email: string;
    password: string;
};

function useGetLogin() {
    const queryClient = useQueryClient();

    return useMutation<DataResponse, Error, LoginParams>({
        mutationFn: async ({ email, password }: LoginParams) => {
            const response = await axios.post<DataResponse>(
                'http://127.0.0.1:8000/users/login',
                { email:email, password:password }
            );
            return response.data;
        },
        // Opção para manipular cache, caso necessário após o login
        onSuccess: (data) => {
            // Exemplo: Atualizar o cache, se necessário
            queryClient.setQueryData(['user', data.id], data);
        },
    });
}

export default useGetLogin;
