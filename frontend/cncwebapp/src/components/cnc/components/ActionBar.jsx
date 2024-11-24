import { Nav } from "react-bootstrap"
import { IconButton } from "./IconButton"


export const ActionBar = () =>
{
    return (
        <Nav>
            <IconButton label="Agregar" icon="bi bi-person-add" />
        </Nav>
    )
}
