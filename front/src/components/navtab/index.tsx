import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarIcon from '@mui/icons-material/CalendarMonth';

import { StyledNavbar } from './style';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { UserRoleEnum } from '../../Enums';
import { Home } from '@mui/icons-material';

export default function NavTab({ menuButtonFocus }: { menuButtonFocus: string }) {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  // Obtém o papel do usuário do localStorage
  const userRole = localStorage.getItem('userRole');

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const tabItens = [
    { name: 'Página Inicial', icon: <Home />, path: routes.clientHome(), role: [UserRoleEnum.ADMIN, UserRoleEnum.CLIENT] },
    { name: 'Calendário', icon: <CalendarIcon />, path: routes.dashboard(), role: [UserRoleEnum.ADMIN] },
    { name: 'Usuário', icon: <PersonIcon />, path: routes.users(), role: [UserRoleEnum.ADMIN] },
  ];

  const onLogout = () => {
    localStorage.setItem('userId', '');
    localStorage.setItem('userRole', '');
    navigate(routes.login());
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Fechar" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {tabItens
          .filter((item) => item.role.includes(userRole as UserRoleEnum)) // Filtra os itens com base no papel do usuário
          .map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)} selected={menuButtonFocus === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <StyledNavbar>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: '#ffff', width: 40, height: 40 }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </StyledNavbar>
  );
}
