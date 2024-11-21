import React, { useState } from "react";
import { Button, TextField, Grid, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCreateAppointment from "../../hooks/api/useCreateAppointments";
import IAppointmentCreate from "../../interfaces/IAppointmentCreate";

interface IFormData {
  title: string;
  phone: string;
  date: string;
  time: string;
  description: string;
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    phone: "",
    date: "",
    time: "",
    description: "",
  });

  const { mutate: createAppointment, isPending } = useCreateAppointment();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(`${formData.date}T${formData.time}`).toISOString();

    const end = new Date(new Date(start).getTime() + 60 * 60 * 1000).toISOString();

    const appointment: IAppointmentCreate = {
      user_id: 1,
      title: formData.title,
      start: start,
      end: end,
      description: formData.description,
    };

    // Criação do agendamento
    createAppointment(appointment, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (error) => {
        console.error("Erro ao criar agendamento", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Data"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hora"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
            {isPending ? "Criando..." : "Criar Agendamento"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
