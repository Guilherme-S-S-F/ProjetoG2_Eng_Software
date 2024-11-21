import { useEffect, useState } from "react";
import useGetLogin from "../../../hooks/api/useGetLogin";
import { LoginButton, StyledBackground, LoginDiv, LoginForm, LoginInput, StyledBackgroundGradient } from "./style";
import { useNavigate } from "react-router-dom";
import { UserRoleEnum } from "../../../Enums";
import { routes } from "../../../routes";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const { data, mutateAsync, isSuccess, isError } = useGetLogin();

    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = () => {
            if (localStorage.getItem("userId") !== "") {
                if (localStorage.getItem("userRole") === UserRoleEnum.ADMIN) {
                    navigate(routes.dashboard());
                } else {
                    navigate(routes.clientHome());
                }
            }
        };
        checkLogin();
    }, []);

    useEffect(()=> {
        if (isSuccess && data) {
            localStorage.setItem("userId", String(data.id));
            localStorage.setItem("userRole", data.role);

            if(data.role === UserRoleEnum.ADMIN) {
                navigate(routes.dashboard());
            } else {
                navigate(routes.clientHome());
            }
        }
    }, [data]);

    const handleLogin = async () => {
        try {
            setError(null); // Limpa o erro anterior, se houver
            await mutateAsync({ email, password });
        } catch (error: any) {
            setError(error.message || "Erro ao fazer login");
        }
    };

    return (
        <LoginDiv>
            <StyledBackground src="/background-login.jpg"/>
            <StyledBackgroundGradient/>
            <LoginForm>
                <LoginInput
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <LoginInput
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isError && error && <p style={{ color: 'red' }}>Senha ou E-mail estão incorretos</p>}
                <LoginButton onClick={handleLogin}>Login</LoginButton>
            </LoginForm>
        </LoginDiv>
        
    );
}
