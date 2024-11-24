using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CNC.Api.Models.Dtos;


public record UserDto(
    string userName,
    string email,
    string token
);


public record RegisterUserDto
(
    [Required]
    string userName,

    [Required]
    [EmailAddress]
    string email,

    [Required]
    string password
);


public record LoginDto(

    [Required]
    string userName,

    [Required]
    string password
);
