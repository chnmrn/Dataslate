using DataslateAPI.Data;
using DataslateAPI.Models;
using DataslateAPI.DTOs.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using DataslateAPI.DTOs.Projects;

namespace DataslateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataslateDbContext _context;
        public UsersController(DataslateDbContext context) 
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadUserDTO>>> GetUsers()
        {
            // Fetch all users from the database
            var users = await _context.Users.ToListAsync();

            // Map User entities to ReadUserDTOs
            var readUserDTOs = users.Select(u => new ReadUserDTO
            {
                Id = u.Id,
                Username = u.username,
                Email = u.email
            }).ToList();

            return Ok(readUserDTOs);

        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadUserWithProjectsDTO>> GetUser(int id)
        {
            // LINQ Include related Projects when fetching a specific User
            var user = await _context.Users
                .Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) 
                return NotFound("User not found in the database");

            // Map User entity to ReadUserWithProjectsDTO
            var readUserDTO = new ReadUserWithProjectsDTO
            {
                Id = user.Id,
                username = user.username,
                email = user.email,
                Projects = user.Projects.Select(p => new ReadProjectDTO
                {
                    Id = p.Id,
                    projectName = p.projectName,
                    description = p.description,
                    GitRepository = p.GitRepository,
                    userName = user.username
                }).ToList()
            };

            return Ok(readUserDTO);
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<ReadUserDTO>> CreateUser(CreateUserDTO user)
        {
            var newUser = new User
            {
                username = user.username,
                email = user.email,
                passwordHash = BCrypt.Net.BCrypt.HashPassword(user.password) // Hash the password when creating the user
            };


            // Add the new user to the database
            _context.Users.Add(newUser); 
            await _context.SaveChangesAsync();

            // Map the created User entity to ReadUserDTO
            var readUserDTO = new ReadUserDTO
            {
                Id = newUser.Id,
                Username = newUser.username,
                Email = newUser.email
            };

            // Return the created user with a 201 status code
            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, readUserDTO);
        }

        // PUT: api/users/{id}
        [HttpPut]
        public async Task<ActionResult> UpdateUser(int id, UpdateUserDTO user)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return NotFound("User not found in the database");

            existingUser.email = user.Email;
            if (!string.IsNullOrEmpty(user.NewPassword))
            {
                // Hash the new password before updating
                existingUser.passwordHash = BCrypt.Net.BCrypt.HashPassword(user.NewPassword);
            }

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the user still exists
                if (!_context.Users.Any(e => e.Id == id))
                    return NotFound("User not found in the database");
                else
                    // Rethrow the exception if it's another issue
                    throw;
            }

            // Return NoContent to indicate successful update
            return NoContent();

        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            // If user not found, return 404
            if (user == null)
                return NotFound("User not found in the database");
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
