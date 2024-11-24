import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppLayout } from "../layout/AppLayout"
import { Dashboard } from "../components/cnc/Dashboard"
import { DashboardHome } from "../components/cnc/components/DashboardHome"
import { Pacientes } from "../components/cnc/pacientes/Pacientes"


export const AppRouter = () =>
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/' element={<Dashboard />}>
                        <Route index element={<DashboardHome />} />
                    </Route>

                    {/* dashboard routes */}
                    <Route path="cnc" element={<Dashboard />}>
                        <Route index element={<DashboardHome />} />
                        <Route path='pacientes' element={<Pacientes route='pacientes' />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
