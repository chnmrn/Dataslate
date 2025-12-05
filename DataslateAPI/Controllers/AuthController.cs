using DataslateAPI.Data;
using DataslateAPI.DTOs.Authentication;
using DataslateAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DataslateAPI.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataslateDbContext _context;
        private readonly IConfiguration _config;
        public AuthController(DataslateDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<RegisterDTO>> Register(RegisterDTO register)
        {
            var signUp = new User
            {
                username = register.username,
                email = register.email,
                passwordHash = BCrypt.Net.BCrypt.HashPassword(register.password) // Hash the password when creating the user
            };


            // Add the new user to the database
            _context.Users.Add(signUp);
            await _context.SaveChangesAsync();

            // Return the created user with a 201 status code
            return Ok("User registered successfully");
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<LoginDTO>> Login(LoginDTO login)
        {
            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == login.email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(login.password, user.passwordHash))
            {
                return Unauthorized("Invalid email or password");
            }

            // Create claims for the JWT token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.username)
            };

            // Generate JWT token
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the token
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            // Return the token
            return Ok(new TokenDTO
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                username = user.username,
                email = user.email,
                Expiration = token.ValidTo
            });
        }

    }
}
