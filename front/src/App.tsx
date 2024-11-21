import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './modules/dashboard/Login'
import DashboardPage from './modules/dashboard'
import AuthGuard from './modules/Auth'
import HomePage from './modules/home'
import NavTab from './components/navtab'
import { routes } from './routes'
import UsersPage from './modules/dashboard/Users'
import UserEditPage from './modules/dashboard/Users/UserEditPage'
import UserCreatePage from './modules/dashboard/Users/UserCreatePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={routes.clientHome()} element={ <AuthGuard><HomePage/></AuthGuard> }/>
      <Route path={routes.dashboard()} element={ <AuthGuard><DashboardPage/></AuthGuard> }/>
      <Route path={routes.users()} element={ <AuthGuard><UsersPage/></AuthGuard> }/>
      <Route path={routes.userEdit(":id")} element={ <AuthGuard><UserEditPage/></AuthGuard> }/>
      <Route path={routes.createUser()} element={ <AuthGuard><UserCreatePage/></AuthGuard> }/>
      <Route path={routes.login()} element={ <LoginPage/> }/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
