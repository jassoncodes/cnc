using System.ComponentModel.DataAnnotations;

namespace CNC.Api.Models.Dtos;

public record PacienteDto(
    int id,
    string expediente,
    string cedula,
    string nombre,
    string apellido,
    string sexo,
    string fechaNacimiento,
    string estadoCivil,
    string nivelAcademico,
    string religion,
    string tutorCuidador,
    string telefono,
    string celular,
    string telefonoTrabajo,
    string direccion,
    string motivoConsulta,
    string correoElectronico,
    string medioContactoPreferido,
    string fechaPrimeraConsulta,
    string numeroAfiliadoARS,
    string numeroContratoAfiliado,
    string contratoNSS,
    string observacion,
    string estado,
    DateTimeOffset fechaCreacion,
    DateTimeOffset fechaActualizacion
);

public record CrearPacienteDto(

    [Required]
    string expediente,

    [Required]
    [RegularExpression(@"^[0-9]{1,13}$", ErrorMessage = "Invalid format")]
    string cedula,

    [Required]
    string nombre,

    [Required]
    string apellido,

    [Required]
    string sexo,

    [Required]
    // old dd/MM/yyyy [RegularExpression(@"\b(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(\d{4})\b",
    // new yyyy-mm-dd
    [RegularExpression(@"\b[0-9]{4}-[0-9]{2}-[0-9]{2}\b",
        ErrorMessage = "La fecha debe estar en el formato dd/MM/yyyy.")]
    string fechaNacimiento,

    [Required]
    string estadoCivil,

    string nivelAcademico,
    string religion,

    [Required]
    string tutorCuidador,

    [Required]
    string telefono,

    [Required]
    string celular,

    [Required]
    string telefonoTrabajo,

    [Required] string direccion,
    string motivoConsulta,

    [Required] string correoElectronico,

    string medioContactoPreferido,

    // old dd/MM/yyyy [RegularExpression(@"\b(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(\d{4})\b",
    // new yyyy-mm-dd
    [RegularExpression(@"\b[0-9]{4}-[0-9]{2}-[0-9]{2}\b",
        ErrorMessage = "La fecha debe estar en el formato dd/MM/yyyy.")]
    string fechaPrimeraConsulta,

    [Required]
    string numeroAfiliadoARS,

    [Required]
    string numeroContratoAfiliado,

    [Required]
    string contratoNSS,

    string observacion
);

public record ActualizarPacienteDto(
    [Required]
    string expediente,

    [Required]
    [RegularExpression(@"^[0-9]{1,13}$", ErrorMessage = "Invalid format")]
    string cedula,

    [Required]
    string nombre,

    [Required]
    string apellido,

    [Required]
    string sexo,

    // [RegularExpression(@"\b(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(\d{4})\b",
    [RegularExpression(@"\b[0-9]{4}-[0-9]{2}-[0-9]{2}",
        ErrorMessage = "La fecha debe estar en el formato dd/MM/yyyy.")]
    [Required]
    string fechaNacimiento,

    [Required]
    string estadoCivil,

    string nivelAcademico,
    string religion,

    [Required]
    string tutorCuidador,

    [Required]
    string telefono,

    [Required]
    string celular,

    [Required]
    string telefonoTrabajo,

    [Required]
    string direccion,

    string motivoConsulta,

    [Required] string correoElectronico,

    string medioContactoPreferido,

    // [RegularExpression(@"\b(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(\d{4})\b",
    [RegularExpression(@"\b[0-9]{4}-[0-9]{2}-[0-9]{2}\b",
        ErrorMessage = "La fecha debe estar en el formato dd/MM/yyyy.")]
    string fechaPrimeraConsulta,

    [Required]
    string numeroAfiliadoARS,

    [Required]
    string numeroContratoAfiliado,

    [Required]
    string contratoNSS,

    string observacion,

    [Required]
    string estado
);

