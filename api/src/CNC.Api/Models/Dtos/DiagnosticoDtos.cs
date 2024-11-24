namespace CNC.Api.Models.Dtos;

public record DiagnosticoDto(
    Guid id,
    string codigo,
    string descripcion,
    string estado,
    DateTimeOffset fechaCreacion,
    DateTimeOffset fechaActualizacion
);

public record CrearDiagnosticoDto(
    string codigo,
    string descripcion,
    string estado
);

public record ActualizarDiagnosticoDto(
    string codigo,
    string descripcion,
    string estado
);
