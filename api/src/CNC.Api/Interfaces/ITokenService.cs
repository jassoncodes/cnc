using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CNC.Api.Models.Entities;

namespace CNC.Api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}