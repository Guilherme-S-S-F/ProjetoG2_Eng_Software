import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IUser from "../../interfaces/IUser";

function useGetUser(id: string) {
    return useQuery<IUser, Error>({
        queryKey: ["user", id], 
        queryFn: async () => {
            const response = await axios.get<IUser>(`http://127.0.0.1:8000/user/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
}

export default useGetUser;
