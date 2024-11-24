namespace CNC.Api.Models.Dtos;

public record EspecialidadDto(
    Guid id,
    string nombreEspecialidad,
    string estado,
    string signosVitales,
    DateTimeOffset fechaCreacion,
    DateTimeOffset fechaActualizacion
);

public record CrearEspecialidadDto(
    string nombreEspecialidad,
    string estado,
    string signosVitales
);

public record ActualizarEspecialidadDto(
    string nombreEspecialidad,
    string estado,
    string signosVitales
);
public record MedicoEspecialidadDto(
    string nombreMedico,
    string apellidoMedico,
    string estadoMedico,
    string nombreEspecialidad,
    string signosVitales,
    string estadoEspecialidad
);
