// src/hooks/useDeleteUser.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type DeleteUserParams = {
    userId: number;
};

function useDeleteUser() {

    return useMutation<void, Error, DeleteUserParams>({
        mutationFn: async ({ userId }: DeleteUserParams) => {
            await axios.delete(`http://127.0.0.1:8000/user/${userId}`);
        },
        onError: (error) => {
            console.error("Erro ao excluir o usuário", error);
        },
    });
}

export default useDeleteUser;
