using System.IdentityModel.Tokens.Jwt;
using CNC.Api.Interfaces;
using CNC.Api.Models.Dtos;
using CNC.Api.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            if (createdUser.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                if (roleResult.Succeeded)
                {
                    var userToken = _tokenService.GenerateToken(appUser);
                    return Ok(appUser.AsDto(userToken));
                }
                else
                {
                    return StatusCode(500, new
                    {
                        Message = "No se pudo asignar el rol al usuario.",
                        Errors = roleResult.Errors.Select(e => e.Description).ToList()
                    });
                }
            }
            else
            {
                return BadRequest(createdUser.Errors.Select(e => e.Description));
            }
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
        if (user == null) return Unauthorized("Usuario no válido");

        var loggedIn = await _signInManager.CheckPasswordSignInAsync(user, loginDto.password, false);
        if (!loggedIn.Succeeded) return Unauthorized("Usuario no encontrado y/o contraseña incorrecta");

        var userToken = _tokenService.GenerateToken(user);
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

            //convert to DTO
            var userDto = user.AsDto();

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            return Problem($"An error ocurred: {ex.Message}");
        }
    }

}