using DataslateAPI.Data;
using DataslateAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DataslateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly DataslateDbContext _context;
        public TasksController(DataslateDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            // LINQ shows all the tasks
            return await _context.TaskItems
                .ToListAsync();
        }

        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            // LINQ shows a specific task by id
            var task = await _context.TaskItems
                .FirstOrDefaultAsync(u => u.Id == id);

            if (task == null)
                return NotFound("Task not found in the database");

            return task;
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<User>> CreateTask(TaskItem task)
        {
            // Add the new task to the database
            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();

            // Return the created task with a 201 status code
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/{id}
        [HttpPut]
        public async Task<ActionResult> UpdateTask(int id, TaskItem task)
        {
            if (id != task.Id)
                return BadRequest("Task not found in the database or wrong Id");

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the task still exists
                if (!_context.TaskItems.Any(e => e.Id == id))
                    return NotFound("Task not found in the database");
                else
                    // Rethrow the exception if it's another issue
                    throw;
            }

            // Return NoContent to indicate successful update
            return NoContent();

        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);
            // If task not found, return 404
            if (task == null)
                return NotFound("Task not found in the database");
            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
