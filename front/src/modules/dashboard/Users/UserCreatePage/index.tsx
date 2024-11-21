import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Paper, Typography, SelectChangeEvent, Breadcrumbs, Link } from "@mui/material";
import { routes } from "../../../../routes";
import RoleSelect from "../UserEditPage/RoleSelect";
import useCreateUser from "../../../../hooks/api/useCreateUser";
import NavTab from "../../../../components/navtab";
import PersonIcon from '@mui/icons-material/Person';
import { UserRoleEnum } from "../../../../Enums";
import useCheckRole from "../../../../hooks/useCheckRole";


export default function UserCreatePage() {
  useCheckRole(UserRoleEnum.ADMIN, routes.clientHome());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "client", // Valor inicial
    password: "",
  });

  const navigate = useNavigate();
  const createUserMutation = useCreateUser(); // Hook para criar usuário

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(formData, {
      onSuccess: () => {
        navigate(routes.users()); // Navega para a página de usuários após sucesso
      },
    });
  };

  return (
    <div>
        <NavTab menuButtonFocus={routes.users()}></NavTab>
        <Breadcrumbs style={{margin:'20px 40px'}}>
          <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/dashboard/users"
          >
            <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Users
          </Link>
          <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/dashboard/user/create"
          >Create</Link>
        </Breadcrumbs>
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Criar Novo Usuário
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <RoleSelect value={formData.role} onChange={handleChangeSelect} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
                disabled={createUserMutation.isPending}
              >
                {createUserMutation.isPending ? "Criando..." : "Criar Usuário"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
