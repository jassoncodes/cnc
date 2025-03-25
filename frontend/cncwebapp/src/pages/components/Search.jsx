import { Form } from "react-bootstrap"


export const Search = ({ onSearch, searchValue }) =>
{

    return (
        <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            onChange={(e) => onSearch(e.target.value)}
            value={searchValue}
        />
    )
}
