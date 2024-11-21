
export const routes = {
    "dashboard": ()=>{return "/dashboard"},
    "login": ()=>{return "/login"},
    "clientHome": ()=>{return "/"},
    "appointmentsPage": ()=>{return "/dashboard/appointments"},
    "users": ()=>{return "/dashboard/users"},
    "userEdit": (id:string)=>{return `/dashboard/user/${id}/edit`},
    "createUser": ()=>{return "/dashboard/user/create"}
}