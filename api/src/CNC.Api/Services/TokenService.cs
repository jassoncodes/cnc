using System.Security.Claims;
using System.Text;
using CNC.Api.Interfaces;
using CNC.Api.Models.Entities;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace CNC.Api.Services;

internal sealed class TokenProvider(IConfiguration configuration) : ITokenService
{

    public string CreateToken(AppUser user)
    {

        string secretKey = configuration["Jwt:Secret"];
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

        var claims = new List<Claim>{

            //Token Id
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            
            //Subject holding the token
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            
            //Email holding the token
            new(JwtRegisteredClaimNames.Email, user.Email.ToString()),

            //Username holding the token
            new(JwtRegisteredClaimNames.GivenName, user.UserName.ToString())
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(60),
            SigningCredentials = credentials,
            Issuer = configuration["Jwt:Issuer"],
            Audience = configuration["Jwt:Audience"]
        };

        var tokenHandler = new JsonWebTokenHandler();
        string token = tokenHandler.CreateToken(tokenDescriptor);
        return token.ToString();

    }
}