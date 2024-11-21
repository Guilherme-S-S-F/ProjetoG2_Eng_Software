import NavTab from "../../../components/navtab";
import { StyledMainPage, StyledTitle, StyledHeader } from "./style";
import UsersTable from "./UserTable";
import { Breadcrumbs, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import PersonIcon from '@mui/icons-material/Person';
import useCheckRole from "../../../hooks/useCheckRole";
import { UserRoleEnum } from "../../../Enums";

export default function UsersPage() {
  const navigate = useNavigate();
  useCheckRole(UserRoleEnum.ADMIN, routes.clientHome());

  const handleCreateUser = () => {
    navigate(routes.createUser()); // Substitua com a rota de criação de usuário
  };

  return (
    <div>
      <NavTab menuButtonFocus={routes.users()}/>
      <Breadcrumbs style={{margin:'20px 40px'}}>
        <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/"
        >
          <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Users
        </Link>
      </Breadcrumbs>
      <StyledMainPage>
        <StyledHeader>
          <div style={{width:50}}></div>
          <StyledTitle>Usuários</StyledTitle>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateUser}
          >
            Criar Usuário
          </Button>
        </StyledHeader>
        <UsersTable />
      </StyledMainPage>
    </div>
  );
}
