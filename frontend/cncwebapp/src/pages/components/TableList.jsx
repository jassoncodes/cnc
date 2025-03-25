import { Table } from "react-bootstrap"


export const TableList = ({ onDoubleClick, tableHeaders, tableValues }) =>
{

    const handleDoubleClick = (elementClicked) =>
    {
        onDoubleClick(elementClicked.target.parentElement.id)
    }

    return (
        <Table striped hover responsive>
            <thead>
                <tr>
                    {tableHeaders.map((headerValue, index) => (
                        <th scope="col" key={index} className="text-center">{headerValue}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    tableValues.map((tableValue, tbValueIndex) =>
                    (
                        <tr key={tbValueIndex} onDoubleClick={handleDoubleClick} id={tableValue.id}>
                            {
                                tableHeaders.map((header) =>
                                {
                                    return Object.entries(tableValue).map(([key, value]) => (
                                        key === header.toLowerCase() ? (
                                            <td key={tbValueIndex} className="text-center">
                                                {value}
                                            </td>
                                        ) : null
                                    ))
                                })
                            }
                        </tr>
                    ))
                }

            </tbody>
        </Table>
    )
}
