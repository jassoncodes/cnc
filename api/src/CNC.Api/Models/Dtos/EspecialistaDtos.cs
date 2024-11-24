using System.ComponentModel.DataAnnotations;

namespace CNC.Api.Models.Dtos;

public record EspecialistaDto(
    Guid id,
    string cedula,
    string nombre,
    string apellido,
    string sexo,
    string fechaNacimiento,
    string telefono,
    string correoElectronico,
    string estado,
    DateTimeOffset fechaCreacion,
    DateTimeOffset fechaActualizacion
);

public record CrearEspecialistaDto(
    [RegularExpression(@"^[0-9]{1,13}$", ErrorMessage = "Invalid format")]
        string cedula,
    [Required] string nombre,
    [Required] string apellido,
    [Required] string sexo,
    [Required] string fechaNacimiento,
    [Required] Guid idEspecialidad,
    [Required] string telefono,
    [Required] string correoElectronico,
    [Required] string estado
);

public record ActualizarEspecialistaDto(
    [RegularExpression(@"^[0-9]{1,13}$", ErrorMessage = "Invalid format")]
        string cedula,
    [Required] string nombre,
    [Required] string apellido,
    [Required] string sexo,
    [Required] string fechaNacimiento,
    [Required] Guid idEspecialidad,
    [Required] string telefono,
    [Required] string correoElectronico,
    [Required] string estado
);
