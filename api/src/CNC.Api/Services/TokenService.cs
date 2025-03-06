using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CNC.Api.Interfaces;
using CNC.Api.Models.Entities;
using Microsoft.IdentityModel.Tokens;

namespace CNC.Api.Services;

internal sealed class TokenProvider(IConfiguration configuration) : ITokenService
{

    public string GenerateToken(AppUser user, List<string> roles)
    {

        string secretKey = configuration["Jwt:Secret"];
        var expirationMinutes = Convert.ToDouble(configuration["Jwt:ExpirationMinutes"]);
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
            new(JwtRegisteredClaimNames.Name, user.UserName.ToString())
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
            SigningCredentials = credentials,
            Issuer = configuration["Jwt:Issuer"],
            Audience = configuration["Jwt:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);

    }

    public JwtSecurityToken VerifyToken(string token)
    {
        string secretKey = configuration["Jwt:Secret"];
        var securityKey = Encoding.UTF8.GetBytes(secretKey);

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(securityKey),
            ValidateIssuer = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            tokenHandler.ValidateToken(
                token,
                tokenValidationParameters,
                out SecurityToken validatedToken
            );

            if (validatedToken is JwtSecurityToken jwtToken)
            {
                return jwtToken;
            }
            else
            {
                throw new SecurityTokenException("Invalid token type");
            }

        }
        catch (Exception ex)
        {

            throw new SecurityTokenException("Token validation failed", ex);
        }

    }
}