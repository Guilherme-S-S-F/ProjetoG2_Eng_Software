import { UserRoleEnum } from "../Enums"


export default interface IUser {
    id: number
    name: string
    password: string
    role: UserRoleEnum
    email: string
    phone: string
}