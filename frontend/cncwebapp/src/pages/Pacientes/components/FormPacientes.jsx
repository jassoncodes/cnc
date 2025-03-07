import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useEffect } from "react";

export const FormPacientes = ({ onSubmit, onCancel, onDelete, editPaciente = null }) =>
{
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const handleFormSubmit = (form) =>
    {
        const formData = { ...form, id: editPaciente?.id }
        onSubmit(formData); // Pasar los datos al componente padre
        reset(); // Reiniciar el formulario
    };

    const handleDelete = () =>
    {
        onDelete(editPaciente.id)
    }

    useEffect(() =>
    {
        if (editPaciente)
        {
            Object.keys(editPaciente).forEach((key) =>
            {
                // console.log(key, ":", editPaciente[key])
                setValue(key, editPaciente[key]);
            });
        } else
        {
            reset();
        }
    }, [editPaciente, setValue, reset]);

    return (
        <>
            <h3>{editPaciente ? "Editar paciente" : "Nuevo paciente"}</h3>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>

                {editPaciente && (
                    <Form.Group className="mb-3" controlId="id">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" disabled defaultValue={editPaciente.id} />
                    </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="expediente">
                    <Form.Label>Expediente</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el expediente"
                        {...register("expediente", { required: "Este campo es obligatorio" })}
                    />
                    {errors.expediente && <p className="text-danger">{errors.expediente.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="cedula">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la cédula"
                        {...register("cedula", { required: "Este campo es obligatorio" })}
                    />
                    {errors.cedula && <p className="text-danger">{errors.cedula.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        {...register("nombre", { required: "Este campo es obligatorio" })}
                    />
                    {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="apellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el apellido"
                        {...register("apellido", { required: "Este campo es obligatorio" })}
                    />
                    {errors.apellido && <p className="text-danger">{errors.apellido.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="sexo">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Select
                        defaultChecked={editPaciente.sexo === "M" ? "M" : "F"}
<<<<<<< HEAD
                        {...register("sexo", { required: "Este campo es obligatorio" })}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </Form.Select>
=======
                        {...register("sexo", { required: "Este campo es obligatorio" })}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </Form.Select>
                    {/* <Form.Control
                        type="text"
                        placeholder="Ingrese el sexo"
                        defaultValue={editPaciente ? editPaciente.sexo : ""}
                        {...register("sexo", { required: "Este campo es obligatorio" })}
                    /> */}
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
                    {errors.sexo && <p className="text-danger">{errors.sexo.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="fechaNacimiento">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Ingrese la fecha de nacimiento"
                        {...register("fechaNacimiento", { required: "Este campo es obligatorio" })}
                    />
                    {errors.fechaNacimiento && <p className="text-danger">{errors.fechaNacimiento.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="estadoCivil">
                    <Form.Label>Estado Civil</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el estado civil"
                        {...register("estadoCivil", { required: "Este campo es obligatorio" })}
                    />
                    {errors.estadoCivil && <p className="text-danger">{errors.estadoCivil.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="nivelAcademico">
                    <Form.Label>Nivel Académico</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nivel académico"
                        {...register("nivelAcademico", { required: "Este campo es obligatorio" })}
                    />
                    {errors.nivelAcademico && <p className="text-danger">{errors.nivelAcademico.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="religion">
                    <Form.Label>Religión</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la religión"
                        {...register("religion", { required: "Este campo es obligatorio" })}
                    />
                    {errors.religion && <p className="text-danger">{errors.religion.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="tutorCuidador">
                    <Form.Label>Tutor/Cuidador</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el tutor/cuidador"
                        {...register("tutorCuidador", { required: "Este campo es obligatorio" })}
                    />
                    {errors.tutorCuidador && <p className="text-danger">{errors.tutorCuidador.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="telefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el teléfono"
                        {...register("telefono", { required: "Este campo es obligatorio" })}
                    />
                    {errors.telefono && <p className="text-danger">{errors.telefono.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="celular">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el celular"
                        {...register("celular", { required: "Este campo es obligatorio" })}
                    />
                    {errors.celular && <p className="text-danger">{errors.celular.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="telefonoTrabajo">
                    <Form.Label>Teléfono de Trabajo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el teléfono de trabajo"
                        {...register("telefonoTrabajo", { required: "Este campo es obligatorio" })}
                    />
                    {errors.telefonoTrabajo && <p className="text-danger">{errors.telefonoTrabajo.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="direccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la dirección"
                        {...register("direccion", { required: "Este campo es obligatorio" })}
                    />
                    {errors.direccion && <p className="text-danger">{errors.direccion.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="motivoConsulta">
                    <Form.Label>Motivo de Consulta</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el motivo de consulta"
                        {...register("motivoConsulta", { required: "Este campo es obligatorio" })}
                    />
                    {errors.motivoConsulta && <p className="text-danger">{errors.motivoConsulta.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="correoElectronico">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingrese el correo electrónico"
                        {...register("correoElectronico", { required: "Este campo es obligatorio" })}
                    />
                    {errors.correoElectronico && <p className="text-danger">{errors.correoElectronico.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="medioContactoPreferido">
                    <Form.Label>Medio de Contacto Preferido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el medio de contacto preferido"
                        {...register("medioContactoPreferido", { required: "Este campo es obligatorio" })}
                    />
                    {errors.medioContactoPreferido && <p className="text-danger">{errors.medioContactoPreferido.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="fechaPrimeraConsulta">
                    <Form.Label>Fecha de Primera Consulta</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Ingrese la fecha de primera consulta"
                        {...register("fechaPrimeraConsulta", { required: "Este campo es obligatorio" })}
                    />
                    {errors.fechaPrimeraConsulta && <p className="text-danger">{errors.fechaPrimeraConsulta.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="numeroAfiliadoARS">
                    <Form.Label>Número de Afiliado ARS</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el número de afiliado ARS"
                        {...register("numeroAfiliadoARS", { required: "Este campo es obligatorio" })}
                    />
                    {errors.numeroAfiliadoARS && <p className="text-danger">{errors.numeroAfiliadoARS.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="numeroContratoAfiliado">
                    <Form.Label>Número de Contrato/Afiliado</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el número de contrato/afiliado"
                        {...register("numeroContratoAfiliado", { required: "Este campo es obligatorio" })}
                    />
                    {errors.numeroAfiliadoARS && <p className="text-danger">{errors.numeroAfiliadoARS.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="contratoNSS">
                    <Form.Label>Contrato NSS</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el contrato NSS"
                        {...register("contratoNSS", { required: "Este campo es obligatorio" })}
                    />
                    {errors.contratoNSS && <p className="text-danger">{errors.contratoNSS.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="observacion">
                    <Form.Label>Observación</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la observación"
                        {...register("observacion", { required: "Este campo es obligatorio" })}
                    />
                    {errors.observacion && <p className="text-danger">{errors.observacion.message}</p>}
                </Form.Group>
                {
                    editPaciente &&
                    <Form.Group className="mb-3" controlId="estado">
                        <Form.Label>Estado</Form.Label>
<<<<<<< HEAD
                        <Form.Select
                            defaultChecked={editPaciente.estado === "A" ? "A" : "I"}
                            {...register("estado")}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="A">Activo</option>
                            <option value="I">Inactivo</option>
                        </Form.Select>
                        {/* <Form.Control
                            type="text"
                            defaultValue={editPaciente.estado}
                            {...register("estado")}
                        /> */}
=======
                        <Form.Control
                            type="text"
                            defaultValue={editPaciente.estado}
                            {...register("estado")}
                        />
>>>>>>> 24d9102dbc4f5fdbe5c1f2c8db6581baff7df0bf
                    </Form.Group>
                }
                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                    <Button type="submit" variant="primary">
                        Guardar
                    </Button>
                </div>
            </Form>
        </>

    );
};

FormPacientes.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    editPaciente: PropTypes.object
};
