import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

export default function AuthGuard(props: any) {
    const [auth, setAuth] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated = localStorage.getItem("userId") !== "";
            setAuth(isAuthenticated);
            if (!isAuthenticated) {
                navigate(routes.login());
            }
        };
        checkAuth();
    }, [navigate]);

    if (auth === null) return null; 

    return auth ? props.children : null;
}
