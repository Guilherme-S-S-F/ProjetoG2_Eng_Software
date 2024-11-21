import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Grid, Paper, Typography, CircularProgress, Link, Breadcrumbs } from "@mui/material";
import NavTab from "../../../../components/navtab";
import useGetUser from "../../../../hooks/api/useGetUser";
import useUpdateUser from "../../../../hooks/api/useUpdateUser";
import { routes } from "../../../../routes";
import RoleSelect from "./RoleSelect";
import PersonIcon from '@mui/icons-material/Person';
import { SelectChangeEvent } from "@mui/material";
import useCheckRole from "../../../../hooks/useCheckRole";
import { UserRoleEnum } from "../../../../Enums";

export default function UserEditPage() {
    useCheckRole(UserRoleEnum.ADMIN, routes.clientHome());

    const { id } = useParams<{ id: string }>();
    const { data: user, isLoading } = useGetUser(id!); // Hook para buscar o usuário
    const updateUserMutation = useUpdateUser(); // Hook para atualizar o usuário
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
    });

    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            updateUserMutation.mutate({ id, user: formData }, {
                onSuccess: () => {
                    navigate(routes.users(), {state: {shouldRefetch: true}});
                }
            });
        }
    };

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <NavTab menuButtonFocus={routes.users()} />
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
                href={`/dashboard/user/${id}/edit`}
                >Edit</Link>
            </Breadcrumbs>
            <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={3} style={{ padding: "20px" }}>
                        <Typography variant="h5" gutterBottom>
                            Editar Usuário
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Nome"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Telefone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <RoleSelect value={formData.role} onChange={handleSelectChange} />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: "20px" }}
                                disabled={updateUserMutation.isPending}
                            >
                                {updateUserMutation.isPending ? "Salvando..." : "Salvar"}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
