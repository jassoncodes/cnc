using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using CNC.Api.Interfaces;
using CNC.Api.Models.Dtos;
using CNC.Api.Models.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;

namespace CNC.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;
    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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
                    return StatusCode(500, roleResult.Errors);
                }
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
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
            HttpOnly = true
        });

        return Ok(user.AsDto(userToken));

    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        try
        {
            if (empty != null)
            {
                await _signInManager.SignOutAsync();
                return Ok($"User logged out");
            }
            return Unauthorized();
        }
        catch (Exception ex)
        {
            return Problem($"An error ocurred: {ex.Message}");
        }
    }

    [HttpGet("user")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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