import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { capitalize, formatDateTime } from "../../../utils";


export const TableList = ({ tableHeaders, tableValues }) =>
{
    const [errors, setErrors] = useState("");

    useEffect(() =>
    {
        const headersCount = tableHeaders.length;
        const valuesKeysCount = tableValues.every(value => Object.keys(value).length === headersCount);

        if (!valuesKeysCount)
        {
            setErrors("Numero de cabeceras de tablas no coinciden");
        }
    }, [tableHeaders, tableValues]); // Ejecutar solo cuando cambien los valores de los headers o valores

    if (errors !== "")
    {
        return (
            <>
                <span>{errors}</span>
            </>
        );
    }

    return (
        <Table striped hover responsive>
            <thead>
                <tr>
                    {tableHeaders.map((headerValue, index) => (
                        <th scope="col" key={index}>{headerValue}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableValues.map((tableValue, index) => (
                    <tr scope="row" key={`${index}${tableValue.id}`}>
                        {Object.entries(tableValue).map(([key, value]) => (
                            <td key={key}>
                                {
                                    (key === "fechaCreacion" || key === "fechaActualizacion") &&
                                    formatDateTime(value) ||
                                    value
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
