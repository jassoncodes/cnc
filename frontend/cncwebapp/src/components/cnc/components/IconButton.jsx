import { Button } from "react-bootstrap"


export const IconButton = ({ icon, label }) =>
{
    return (
        <Button><i className={icon}></i>&nbsp;{label}</Button>
    )
}
