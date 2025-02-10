import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { AppHeader } from "./components/AppHeader"
import { AppFooter } from "./components/AppFooter"

import "react-toastify/ReactToastify.css"
import { UserProvider } from "../../context/useAuth"
import { ToastContainer } from "react-toastify"


export const AppLayout = () =>
{
    return (
        <Container className="cnc-app">
            <UserProvider>
                <AppHeader />
                <Outlet />
                <AppFooter />
                <ToastContainer />
            </UserProvider>
        </Container>
    )
}
