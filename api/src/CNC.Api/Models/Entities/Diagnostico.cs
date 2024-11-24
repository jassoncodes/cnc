namespace CNC.Api.Models.Entities;

public class Diagnostico
{
    public Guid Id { get; set; }
    public string Codigo { get; set; }
    public string Descripcion { get; set; }
    public string Estado { get; set; }
    public DateTimeOffset FechaCreacion { get; set; }
    public DateTimeOffset FechaActualizacion { get; set; }

}
