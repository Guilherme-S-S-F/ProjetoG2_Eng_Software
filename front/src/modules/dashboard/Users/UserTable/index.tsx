import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import useGetUsers from "../../../../hooks/api/useGetUsers";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../../../routes";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import useDeleteUser from "../../../../hooks/api/useDeleteUser";

export default function UserTable() {
  const { data: users, isLoading, isError } = useGetUsers();

  const [open, setOpen] = useState(false);  // Controla a visibilidade do modal
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);  // Armazena o id do usuário a ser excluído
  const deleteUserMutation = useDeleteUser(); // Usando o hook de exclusão

    // Função para fechar o modal sem excluir
  const handleClose = () => {
    setOpen(false);
    setUserIdToDelete(null);
    window.location.reload();
  };

    // Função que chama a mutação de exclusão
  const handleConfirmDelete = () => {
    if (userIdToDelete !== null) {
        deleteUserMutation.mutate({ userId: userIdToDelete });
    }
    handleClose();  // Fecha o modal após a exclusão
  };

  const navigate = useNavigate();
  
  const handleEdit = (id: number) => {
    navigate(routes.userEdit(String(id)));
  };

  const handleDelete = (id: number) => {
      setUserIdToDelete(id);
      setOpen(true);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os usuários.</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tipo de Usuário</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(user.id)}
                  style={{ marginRight: "8px" }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tem certeza que deseja excluir este usuário?</DialogTitle>
                <DialogContent>
                    <p>Essa ação não pode ser desfeita.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmDelete} 
                        color="error" 
                        disabled={deleteUserMutation.isPending}  // Desabilita o botão enquanto a mutação está carregando
                    >
                        {deleteUserMutation.isPending ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </DialogActions>
            </Dialog>
    </TableContainer>
  );
}
