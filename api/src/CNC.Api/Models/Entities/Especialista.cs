namespace CNC.Api.Models.Entities;

public class Especialista
{
    public Guid Id { get; set; }
    public string Cedula { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public string Sexo { get; set; }
    public string FechaNacimiento { get; set; }
    public Guid IdEspecialidad { get; set; }
    public string Telefono { get; set; }
    public string CorreoElectronico { get; set; }
    public string Estado { get; set; }
    public DateTimeOffset FechaCreacion { get; set; }
    public DateTimeOffset FechaActualizacion { get; set; }

}
