namespace CNC.Api.Models.Entities;

public class Especialidad
{
    public Guid Id { get; set; }
    public string NombreEspecialidad { get; set; }
    public string Estado { get; set; }
    public string SignosVitales { get; set; }
    public DateTimeOffset FechaCreacion { get; set; }
    public DateTimeOffset FechaActualizacion { get; set; }
}
