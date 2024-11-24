using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CNC.Api.Models.Entities;
using CNC.Api.Repository;
using CNC.Api.Interfaces;
using CNC.Api.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CNC.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PacientesController : ControllerBase
    {
        private readonly IRepositoryService<Paciente> _pacienteRepository;


        public PacientesController(IRepositoryService<Paciente> pacienteRepository)
        {
            _pacienteRepository = pacienteRepository;
        }

        // GET: api/Pacientes
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PacienteDto>>> GetPacientes()
        {

            var pacientes = await _pacienteRepository.GetAllAsync();
            if (pacientes is null)
            {
                return NotFound();
            }

            var pacientesDtos = pacientes.Select(paciente => paciente.AsDto());

            return Ok(pacientesDtos);
        }

        // GET: api/Pacientes/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<PacienteDto>> GetPaciente(int id)
        {
            var paciente = await _pacienteRepository.GetByIdAsync(id);

            if (paciente == null)
            {
                return NotFound();
            }

            return paciente.AsDto();
        }

        // PUT: api/Pacientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutPaciente(int id, ActualizarPacienteDto actualizarPacienteDto)
        {

            var pacienteExists = await _pacienteRepository.GetFilteredAsync(p => p.Id == id);
            if (pacienteExists is null)
            {
                return NotFound();
            }

            pacienteExists.Nombre = actualizarPacienteDto.nombre;
            pacienteExists.Apellido = actualizarPacienteDto.apellido;
            pacienteExists.Expediente = actualizarPacienteDto.expediente;
            pacienteExists.Cedula = actualizarPacienteDto.cedula;
            pacienteExists.Sexo = actualizarPacienteDto.sexo;
            pacienteExists.FechaNacimiento = actualizarPacienteDto.fechaNacimiento;
            pacienteExists.EstadoCivil = actualizarPacienteDto.estadoCivil;
            pacienteExists.NivelAcademico = actualizarPacienteDto.nivelAcademico;
            pacienteExists.Religion = actualizarPacienteDto.religion;
            pacienteExists.TutorCuidador = actualizarPacienteDto.tutorCuidador;
            pacienteExists.Telefono = actualizarPacienteDto.telefono;
            pacienteExists.Celular = actualizarPacienteDto.celular;
            pacienteExists.TelefonoTrabajo = actualizarPacienteDto.telefonoTrabajo;
            pacienteExists.Direccion = actualizarPacienteDto.direccion;
            pacienteExists.MotivoConsulta = actualizarPacienteDto.motivoConsulta;
            pacienteExists.CorreoElectronico = actualizarPacienteDto.correoElectronico;
            pacienteExists.MedioContactoPreferido = actualizarPacienteDto.medioContactoPreferido;
            pacienteExists.FechaPrimeraConsulta = actualizarPacienteDto.fechaPrimeraConsulta;
            pacienteExists.NumeroAfiliadoARS = actualizarPacienteDto.numeroAfiliadoARS;
            pacienteExists.ContratoNSS = actualizarPacienteDto.contratoNSS;
            pacienteExists.Observacion = actualizarPacienteDto.observacion;
            pacienteExists.Estado = actualizarPacienteDto.estado;
            pacienteExists.FechaActualizacion = DateTimeOffset.UtcNow;

            await _pacienteRepository.UpdateAsync(pacienteExists);

            return NoContent();
        }

        // POST: api/Pacientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PacienteDto>> PostPaciente(CrearPacienteDto crearPacienteDto)
        {
            var paciente = new Paciente
            {
                Nombre = crearPacienteDto.nombre,
                Apellido = crearPacienteDto.apellido,
                Expediente = crearPacienteDto.expediente,
                Cedula = crearPacienteDto.cedula,
                Sexo = crearPacienteDto.sexo,
                FechaNacimiento = crearPacienteDto.fechaNacimiento,
                EstadoCivil = crearPacienteDto.estadoCivil,
                NivelAcademico = crearPacienteDto.nivelAcademico,
                Religion = crearPacienteDto.religion,
                TutorCuidador = crearPacienteDto.tutorCuidador,
                Telefono = crearPacienteDto.telefono,
                Celular = crearPacienteDto.celular,
                TelefonoTrabajo = crearPacienteDto.telefonoTrabajo,
                Direccion = crearPacienteDto.direccion,
                MotivoConsulta = crearPacienteDto.motivoConsulta,
                CorreoElectronico = crearPacienteDto.correoElectronico,
                MedioContactoPreferido = crearPacienteDto.medioContactoPreferido,
                FechaPrimeraConsulta = crearPacienteDto.fechaPrimeraConsulta,
                NumeroAfiliadoARS = crearPacienteDto.numeroAfiliadoARS,
                ContratoNSS = crearPacienteDto.contratoNSS,
                Observacion = crearPacienteDto.observacion,
                Estado = "A",
                FechaCreacion = DateTimeOffset.UtcNow,
                FechaActualizacion = DateTimeOffset.UtcNow
            };

            await _pacienteRepository.AddAsync(paciente);

            return CreatedAtAction("GetPaciente", new { id = paciente.Id }, paciente);
        }

        // DELETE: api/Pacientes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePaciente(int id)
        {
            var paciente = await _pacienteRepository.GetByIdAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            await _pacienteRepository.DeleteAsync(paciente);

            return NoContent();
        }
    }
}
