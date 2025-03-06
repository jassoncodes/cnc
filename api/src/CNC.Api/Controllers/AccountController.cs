using System.IdentityModel.Tokens.Jwt;
using CNC.Api.Interfaces;
using CNC.Api.Models.Dtos;
using CNC.Api.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;

namespace CNC.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IConfiguration _configuration;
    public AccountController(IConfiguration configuration, UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    Errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList()
                });
            }

            var appUser = new AppUser
            {
                UserName = registerUserDto.userName.ToLower(),
                Email = registerUserDto.email.ToLower()
            };

            var createdUser = await _userManager.CreateAsync(appUser, registerUserDto.password);
            if (!createdUser.Succeeded)
            {
                return BadRequest(new
                {
                    Message = "No se pudo registrar al usuario",
                    Description = createdUser.Errors.Select(e => e.Description).ToList()
                });
            }

            var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
            if (!roleResult.Succeeded)
            {
                return StatusCode(500, new
                {
                    Message = "No se pudo asignar el rol al usuario.",
                    Errors = roleResult.Errors.Select(e => e.Description).ToList()
                });
            }

            var roles = await _userManager.GetRolesAsync(appUser);
            var userToken = _tokenService.GenerateToken(appUser, roles.ToList());
            return Ok(appUser.AsDto(userToken));
        }
        catch (Exception e)
        {
            return Problem("Error interno en el servidor: ", e.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var expirationMinutes = Convert.ToDouble(_configuration["Jwt:ExpirationMinutes"]);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == loginDto.userName.ToLower());
        var roles = await _userManager.GetRolesAsync(user);

        if (user == null) return Unauthorized("Usuario no válido");

        var loggedIn = await _signInManager.CheckPasswordSignInAsync(user, loginDto.password, false);
        if (!loggedIn.Succeeded) return Unauthorized("Usuario no encontrado y/o contraseña incorrecta");

        var userToken = _tokenService.GenerateToken(user, roles.ToList());
        Response.Cookies.Append("jwt", userToken, new CookieOptions
        {
            Path = "/",
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(expirationMinutes)
        });

        return Ok(user.AsDto(userToken));

    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        try
        {
            var loggedIn = HttpContext.User.Identity.IsAuthenticated;
            if (loggedIn)
            {
                // Eliminar la cookie 'jwt'
                Response.Cookies.Delete("jwt");
                return Ok("User logged out");
            }
            return BadRequest("No user logged in");
        }
        catch (Exception ex)
        {
            return Problem($"An error occurred: {ex.Message}");
        }
    }

    [HttpGet("user")]
    [Authorize]
    public async Task<ActionResult<LoggedUserDto>> GetUser()
    {
        try
        {
            var jwtToken = Request.Cookies["jwt"];
            var token = _tokenService.VerifyToken(jwtToken);

            //get the userId claim from the token
            var tokenUserId = token.Claims.First(x => x.Type == JwtRegisteredClaimNames.Sub).Value;

            //get the user from database
            var user = await _userManager.Users.FirstOrDefaultAsync(user => user.Id == tokenUserId);

            var roles = await _userManager.GetRolesAsync(user);


            //convert to DTO
            var userDto = user.AsDto(roles.ToList());

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            return Problem($"An error ocurred: {ex.Message}");
        }
    }


    //  POST /api/account/assign-role
    [HttpPost("assign-role")]
    //[Authorize(Roles = "Admin")] // Opcional: Solo admins pueden asignar roles
    public async Task<IActionResult> AssignRole([FromBody] AssignRoleDto request)
    {
        var user = await _userManager.FindByNameAsync(request.userName);
        if (user == null)
        {
            return NotFound("User not found");
        }

        var result = await _userManager.AddToRoleAsync(user, request.role);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok($"Role {request.role} assigned to {request.userName}");
    }

}