import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { StyledCalendar } from "./style";
import AppointmentModal from "../appointmentModal";
import IAppointments from "../../interfaces/IAppointments";
import useUpdateAppointment from "../../hooks/api/useUpdateAppointment";
import { StatusEnum } from "../../Enums";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

interface CalendarProps {
  appointments: IAppointments[];
}

export default function CalendarAppointments({ appointments }: CalendarProps) {
  const [appointment, setAppointment] = useState<IAppointments | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { mutate: updateAppointment, isPending } = useUpdateAppointment();

  const openModal = (data: IAppointments) => {
    setAppointment(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onCompleteClick = async () => {
    if (appointment) {
      updateAppointment(
        { id: appointment.id, status: StatusEnum.COMPLETED },
        {
          onSuccess: () => {
            setShowModal(false);
            window.location.reload();
          },
          onError: (error:any) => {
            console.error("Erro ao atualizar o status do agendamento:", error);
          },
        }
      );
    }
  };

  return (
    <StyledCalendar>
      <DragAndDropCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={appointments}
        localizer={localizer}
        resizable
        onSelectEvent={(event) => openModal(event as IAppointments)}
        style={{ height: "90vh" }}
      />
      {appointment && (
        <AppointmentModal
          onCloseModal={closeModal}
          show={showModal}
          data={appointment}
          onCompleteClick={onCompleteClick}
          isLoading={isPending}
        />
      )}
    </StyledCalendar>
  );
}
