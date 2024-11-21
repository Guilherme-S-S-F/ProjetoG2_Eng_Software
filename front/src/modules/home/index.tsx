import { Breadcrumbs, Link } from "@mui/material";
import AppointmentForm from "../../components/createAppointmentForm";
import NavTab from "../../components/navtab";
import { routes } from "../../routes";
import { HomeMain, StyleTitleDiv } from "./style";
import HomeIcon from '@mui/icons-material/Home';

export default function HomePage() {
    return (
        <div>
            <NavTab menuButtonFocus={routes.clientHome()}/>
            <Breadcrumbs style={{margin:'20px 40px'}}>
                <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
            </Breadcrumbs>
            <HomeMain>
                <StyleTitleDiv><h1>Calendário Agendamentos</h1></StyleTitleDiv>
                <AppointmentForm/>
            </HomeMain>
        </div>
    );
}