import { Form } from "react-bootstrap"


export const Search = ({ onSearch }) =>
{

    const handleChange = (searchValue) =>
    {
        onSearch(searchValue)
    }

    return (
        <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            onChange={(e) => handleChange(e.target.value)}
        />
    )
}
