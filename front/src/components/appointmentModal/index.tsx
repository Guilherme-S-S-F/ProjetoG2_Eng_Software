import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import IAppointments from "../../interfaces/IAppointments";

interface AppointmentModalProps {
  show: boolean;
  data: IAppointments;
  onCloseModal: () => void;
  onCompleteClick: () => void;
  isLoading: boolean; // Propriedade para controlar o carregamento
}

export default function AppointmentModal({
  show,
  data,
  onCloseModal,
  onCompleteClick,
  isLoading,
}: AppointmentModalProps) {
  if (!show) return null;

  return (
    <Modal open={show} onClose={onCloseModal}>
      <div style={{ padding: "20px", background: "#fff", margin: "50px auto", maxWidth: "500px" }}>
        <Typography variant="h6" gutterBottom>
          Detalhes do Agendamento
        </Typography>
        <Typography variant="body1">ID: {data.id}</Typography>
        <Typography variant="body1">Título: {data.title}</Typography>
        <Typography variant="body1">Status: {data.status}</Typography>
        {/* Adicionando a descrição do agendamento */}
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          Descrição: {data.description || "Sem descrição disponível"}
        </Typography>
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onCompleteClick}
            disabled={isLoading} // Desabilita o botão enquanto está carregando
          >
            {isLoading ? "Atualizando..." : "Marcar como Completo"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCloseModal} style={{ marginLeft: "10px" }}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
