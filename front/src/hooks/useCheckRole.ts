import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { UserRoleEnum } from "../Enums";

export default function useCheckRole(userRole: UserRoleEnum, redirectPath: string) {
    const navigate = useNavigate();
    useEffect(() => {
        const checkLogin = () => {
            if (localStorage.getItem("userId") !== "") {
                if (localStorage.getItem("userRole") !== userRole) {
                    navigate(redirectPath);
                }
            }
        };
        checkLogin();
    }, []);
}