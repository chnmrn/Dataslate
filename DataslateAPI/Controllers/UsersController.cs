using DataslateAPI.Data;
using DataslateAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            // LINQ Include related Projects when fetching Users
            return await _context.Users
                .Include(u => u.Projects)
                .ToListAsync();
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            // LINQ Include related Projects when fetching a specific User
            var user = await _context.Users
                .Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) 
                return NotFound("User not found in the database");           

            return user;
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            // Add the new user to the database
            _context.Users.Add(user); 
            await _context.SaveChangesAsync();

            // Return the created user with a 201 status code
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/{id}
        [HttpPut]
        public async Task<ActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest("User not found in the database or wrong Id");

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the user still exists
                if (!_context.Users.Any(e => e.Id == id))
                    return NotFound("Task not found in the database");
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
