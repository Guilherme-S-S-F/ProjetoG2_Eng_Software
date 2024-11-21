import CalendarAppointments from "../../components/calendar";
import NavTab from "../../components/navtab";
import { StyleTitleDiv, HomeMain } from "./style";
import useGetAppointments from "../../hooks/api/useGetAppointments";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { routes } from "../../routes";
import { UserRoleEnum } from "../../Enums";
import useCheckRole from "../../hooks/useCheckRole";

export default function DashboardPage() {
    const { data, isLoading, error } = useGetAppointments();

    useCheckRole(UserRoleEnum.ADMIN, routes.clientHome());

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar dados</p>;

     // Converta as datas para o formato Date
     const events = (data || []).map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
    }));

    return (
        <HomeMain>
            <NavTab menuButtonFocus={routes.dashboard()}/>
            <Breadcrumbs style={{margin:'20px 40px'}}>
                <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Dashboard
                </Link>
            </Breadcrumbs>
            <StyleTitleDiv><h1>Calendário Agendamentos</h1></StyleTitleDiv>
            <CalendarAppointments appointments={events ?? []} />
        </HomeMain>
    );
}