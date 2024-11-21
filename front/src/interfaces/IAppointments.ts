import { StatusEnum } from "../Enums"

export default interface IAppointments {
    id: number
    title: string
    start: Date
    end: Date
    description: string
    active: boolean
    status: StatusEnum
}