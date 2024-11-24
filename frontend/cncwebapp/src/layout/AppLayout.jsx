import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { AppHeader } from "./components/AppHeader"
import { AppFooter } from "./components/AppFooter"


export const AppLayout = () =>
{
    return (
        <Container className="cnc-app">
            <AppHeader />
            <Outlet />
            <AppFooter />
        </Container>
    )
}
