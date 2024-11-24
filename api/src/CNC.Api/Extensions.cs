using CNC.Api.Models.Entities;
using CNC.Api.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace CNC.Api;

public static class Extensions
{
    public static PacienteDto AsDto(this Paciente paciente)
    {
        return new PacienteDto(
                        paciente.Id,
                        paciente.Expediente,
                        paciente.Cedula,
                        paciente.Nombre,
                        paciente.Apellido,
                        paciente.Sexo,
                        paciente.FechaNacimiento,
                        paciente.EstadoCivil,
                        paciente.NivelAcademico,
                        paciente.Religion,
                        paciente.TutorCuidador,
                        paciente.Telefono,
                        paciente.Celular,
                        paciente.TelefonoTrabajo,
                        paciente.Direccion,
                        paciente.MotivoConsulta,
                        paciente.CorreoElectronico,
                        paciente.MedioContactoPreferido,
                        paciente.FechaPrimeraConsulta,
                        paciente.NumeroAfiliadoARS,
                        paciente.ContratoNSS,
                        paciente.Observacion,
                        paciente.Estado,
                        paciente.FechaCreacion,
                        paciente.FechaActualizacion
                    );
    }

    public static EspecialistaDto AsDTO(this Especialista especialista)
    {
        return new EspecialistaDto(
            especialista.Id,
            especialista.Cedula,
            especialista.Nombre,
            especialista.Apellido,
            especialista.Sexo,
            especialista.FechaNacimiento,
            especialista.Telefono,
            especialista.CorreoElectronico,
            especialista.Estado,
            especialista.FechaCreacion,
            especialista.FechaActualizacion
        );
    }

    public static EspecialidadDto AsDTO(this Especialidad especialidad)
    {
        return new EspecialidadDto(
            especialidad.Id,
            especialidad.NombreEspecialidad,
            especialidad.Estado,
            especialidad.SignosVitales,
            especialidad.FechaCreacion,
            especialidad.FechaActualizacion
        );
    }

    public static MedicoEspecialidadDto AsDTO(this Especialista especialista, string nombreEspecialidad, string signosVitales, string estadoEspecialidad)
    {
        return new MedicoEspecialidadDto(
            especialista.Nombre,
            especialista.Apellido,
            especialista.Estado,
            nombreEspecialidad,
            signosVitales,
            estadoEspecialidad
        );
    }

    public static DiagnosticoDto AsDTO(this Diagnostico diagnostico)
    {
        return new DiagnosticoDto(
            diagnostico.Id,
            diagnostico.Codigo,
            diagnostico.Descripcion,
            diagnostico.Estado,
            diagnostico.FechaCreacion,
            diagnostico.FechaActualizacion
        );
    }

    public static UserDto AsDto(this AppUser appUser, string userToken)
    {
        return new UserDto(appUser.UserName, appUser.Email, userToken);
    }

    public static void ApplyMigrations(this IApplicationBuilder app)
    {

        using IServiceScope scope = app.ApplicationServices.CreateScope();

        using AppDbContext dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (dbContext.Database.GetPendingMigrations().Any())
        {
            dbContext.Database.Migrate();
        }


    }


    /// <summary>
    /// Custom AddSwagger method to configure swagger with JWT Security
    /// </summary>
    /// <param name="service"></param>
    public static void AddJwtSwagger(this IServiceCollection service)
    {
        service.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Description = "Please enter a valid token",
                Name = "Authorization",
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                }
            });
        });
    }
}
