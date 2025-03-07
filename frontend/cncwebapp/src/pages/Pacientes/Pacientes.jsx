import PropTypes, { string } from "prop-types";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { TableList } from "../../components/TableList";
import { ActionBar } from "../../components/ActionBar";
import { getPacientesAsync, createPacienteAsync, getPacientesByIdAsync, updatePacienteAsync, deactivatePacienteAsync } from "../../services/PacientesService";
import { FormPacientes } from "./components/FormPacientes";
import { toast } from "react-toastify";
import { PACIENTES_TABLE_HEADERS } from "../../utils/TableHeaders";
import { json } from "react-router-dom";

//editPaciente is null error pendiente

export const Pacientes = () =>
{
    const [pacientes, setPacientes] = useState([]);
    const [pacienteById, setPacienteById] = useState([]);
    const [errors, setErrors] = useState("");
    const [formMode, setFormMode] = useState("")
    // const [isCreating, setIsCreating] = useState(false);
    // const [isEditing, setIsEdigint] = useState(false);

    const getPacientes = async () =>
    {
        try
        {
            const reqData = await getPacientesAsync();

<<<<<<< HEAD
            if (reqData.status === 404)
            {
                throw new Error("No se encontraron datos");
            }

            if (reqData.status === 200)
            {
                const data = await reqData.data;
                setPacientes(prev => data)
            }

        } catch (error)
        {
            setErrors(`${error}`)
=======
            if (reqData.status === 200)
            {
                const data = await reqData.data;
                setPacientes(prev =>
                {
                    return data
                })
            }
        } catch (error)
        {
            setErrors("Error al obtener datos: ", error)
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
        }
    }

    const createPaciente = async (patientData) =>
    {
        try
        {
            const response = await createPacienteAsync(patientData);
<<<<<<< HEAD
            if (response.status !== 201)
            {
                throw new Error("No se ha podido crear al paciente")
=======
            if (response.status === 201)
            {
                setFormMode("");
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
            }
            toast.success(`Se ha registrado al paciente \n${patientData.nombre} ${patientData.apellido}`)
        } catch (error)
        {
<<<<<<< HEAD
            setErrors(`${error}`);
=======
            setErrors("Error al crear paciente: ", error);
            console.error("Pacientes.jsx Error al crear paciente: ", error)
        }
    }

    const updatePaciente = async (pacienteId, pacientData) =>
    {
        try
        {
            const response = await updatePacienteAsync(pacienteId, pacientData);
            if (response.status === 201)
            {
                setFormMode("");
            }
            toast.success(`Se ha editado la informacion del pciente \n${pacientData.nombre} ${pacientData.apellido}`)
        } catch (error)
        {
            setErrors("Error al editar paciente: ", error);
            console.error("Pacientes.jsx Error al crear paciente: ", error)
        }
    }

    const deactivePacient = async (pacienteId) =>
    {
        try
        {
            const response = await deactivatePacienteAsync((pacienteId));
            if (response.status === 200)
            {
                toast.success(response.data.message);
            }
        } catch (error)
        {
            console.error("Error al desactivar paciente: ", error)
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
        }
    }

    const updatePaciente = async (pacienteId, pacientData) =>
    {
        try
        {
            const response = await updatePacienteAsync(pacienteId, pacientData);
            if (response.status !== 204)
            {
                throw new Error("No se pudo actualizar el paciente: ");
            }
            toast.success(`Se ha editado la informacion del pciente \n${pacientData.nombre} ${pacientData.apellido}`)
        } catch (error)
        {
            setErrors(`${error}`);
        }
    }

    const deactivePacient = async (pacienteId) =>
    {
        try
        {
            const response = await deactivatePacienteAsync((pacienteId));
            if (response.status !== 200)
            {
                throw new Error("No se ha podido desactivar al paciente");
            }
            toast.success(response.data.message);
        } catch (error)
        {
            setErrors(`${error}`);
        }
    }

    const clear = () =>
    {
        setFormMode("");
        setPacienteById(prev => []);
    }

    const handleDoubleClick = async (elementClicked) =>
    {

        setFormMode("edit");
        const res = await getPacientesByIdAsync(elementClicked);
        const pacienteData = res.data;
        setPacienteById(prev =>
        {
            return pacienteData;
        });
<<<<<<< HEAD
=======

        console.log("Editando data del paciente: ", res.data.id)
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
    }

    const handleCancel = async () =>
    {
<<<<<<< HEAD
        clear();
=======

        setFormMode("");
        setPacienteById();
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
    }

    const handleSubmit = async (pacientData) =>
    {
        if (formMode === "create")
        {
<<<<<<< HEAD
=======
            console.log("crear paciente: ", pacientData)
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
            await createPaciente(pacientData);
        } else
        {
            await updatePaciente(pacienteById.id, pacientData)
<<<<<<< HEAD

        }
        clear();
=======
            setFormMode("")
            setPacienteById();
        }
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
    }

    const handleDelete = async (pacienteId) =>
    {
        await deactivePacient(pacienteId);
<<<<<<< HEAD
        clear();
    }

    const handleSearch = (searchValue) =>
    {
        if (Array.from(searchValue).length >= 3)
        {
            console.log("Buscando: ", searchValue)
        }
        console.log(pacientes)

        //change map for something else
        const filteredData = pacientes.map((paciente) =>
        {
            if (String(paciente.nombre).includes(searchValue))
            {
                return paciente
            }
        })
        console.log(filteredData)
=======
        setFormMode("");
        setPacienteById();
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
    }

    useEffect(() =>
    {
        getPacientes();
<<<<<<< HEAD

=======
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
    }, [formMode]);


    return (
        <Container>
<<<<<<< HEAD
            <ActionBar
                barTitle="Pacientes"
                barIcon="bi bi-person"
                onCreate={() => setFormMode("create")}
                createDisabled={formMode ? true : false}
                onSearch={handleSearch}
            />
=======
            <ActionBar barTitle="Pacientes" barIcon="bi bi-person" onCreate={() => setFormMode("create")} createDisabled={formMode ? true : false} />
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
            {
                formMode /** "edit" or "create" **/ ? (
                    <FormPacientes
                        onSubmit={async (patientData) => handleSubmit(patientData)}
<<<<<<< HEAD
                        onCancel={handleCancel}
=======
                        onCancel={async () => handleCancel()}
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
                        onDelete={async (pacienteId) => handleDelete(pacienteId)}
                        editPaciente={pacienteById}
                    />
                ) : (
                    errors ? (
                        <Container className="mt-4">
                            <Row>
                                <Col><h5 className="blue">{errors}</h5>
                                </Col>
                            </Row>
                        </Container>
                    ) :
                        (
                            <TableList
                                tableHeaders={PACIENTES_TABLE_HEADERS}
                                tableValues={pacientes}
                                onDoubleClick={async (elementClicked) => handleDoubleClick(elementClicked)}
                            />
                        )
                )
            }
        </Container>
    )
}


Pacientes.protoTypes = {
    route: PropTypes.string.isRequired,
};