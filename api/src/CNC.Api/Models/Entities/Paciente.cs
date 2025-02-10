using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CNC.Api.Interfaces;

namespace CNC.Api.Models.Entities;

[Table("cnc_pacientes")]
public class Paciente : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public int Id { get; set; }

    [Column("expediente")]
    public string Expediente { get; set; }

    [Column("cedula")]
    public string Cedula { get; set; }

    [Column("nombre")]
    public string Nombre { get; set; }

    [Column("apellido")]
    public string Apellido { get; set; }

    [Column("sexo")]
    public string Sexo { get; set; }

    [Column("fechaNacimiento")]
    public string FechaNacimiento { get; set; }

    [Column("estadoCivil")]
    public string EstadoCivil { get; set; }

    [Column("nivelAcademico")]
    public string NivelAcademico { get; set; }

    [Column("religion")]
    public string Religion { get; set; }

    [Column("tutorCuidador")]
    public string TutorCuidador { get; set; }

    [Column("telefono")]
    public string Telefono { get; set; }

    [Column("celular")]
    public string Celular { get; set; }

    [Column("telefonoTrabajo")]
    public string TelefonoTrabajo { get; set; }

    [Column("direccion")]
    public string Direccion { get; set; }

    [Column("motivoConsulta")]
    public string MotivoConsulta { get; set; }

    [Column("correoElectronico")]
    public string CorreoElectronico { get; set; }

    [Column("medioContacto")]
    public string MedioContactoPreferido { get; set; }

    [Column("fechaPrimeraConsulta")]
    public string FechaPrimeraConsulta { get; set; }

    [Column("numeroAfiliadoARS")]
    public string NumeroAfiliadoARS { get; set; }

    [Column("contratoNss")]
    public string ContratoNSS { get; set; }

    [Column("observacion")]
    public string Observacion { get; set; }

    [Column("esado")]
    public string Estado { get; set; }

    [Column("fechaCreacion")]
    public DateTimeOffset FechaCreacion { get; set; }

    [Column("fechaActualizacion")]
    public DateTimeOffset FechaActualizacion { get; set; }

    [Column("numeroContratoAfiliado")]
    public string NumeroContratoAfiliado { get; set; }
}
