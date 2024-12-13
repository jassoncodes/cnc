using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using CNC.Api.Models.Entities;

namespace CNC.Api.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(AppUser user);

        JwtSecurityToken VerifyToken(string token);
    }
}