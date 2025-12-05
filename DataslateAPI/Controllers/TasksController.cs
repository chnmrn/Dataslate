using DataslateAPI.Data;
using DataslateAPI.DTOs.Projects;
using DataslateAPI.DTOs.Tasks;
using DataslateAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DataslateAPI.Controllers
{
    [Authorize]
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
        public async Task<ActionResult<IEnumerable<ReadTaskDTO>>> GetTasks()
        {
            var tasks = await _context.TaskItems
                .Include(t => t.Project)
                .ToListAsync();

            var readTaskDTOs = tasks.Select(t => new ReadTaskDTO
            {
                Id = t.Id,
                taskTitle = t.taskTitle,
                status = t.status,
                projectName = t.Project != null ? t.Project.projectName : null
            }).ToList();

            return Ok(readTaskDTOs);
        }

        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadTaskDTO>> GetTask(int id)
        {
            // LINQ shows a specific task by id
            var task = await _context.TaskItems
                .Include(t => t.Project)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (task == null)
                return NotFound("Task not found in the database");

            var readTaskDTOs = new ReadTaskDTO
            {
                Id = task.Id,
                taskTitle = task.taskTitle,
                status = task.status,
                projectName = task.Project != null ? task.Project.projectName : null
            };

            return Ok(readTaskDTOs);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<ReadTaskDTO>> CreateTask(CreateTaskDTO task)
        {
            var newTask = new TaskItem
            {
                taskTitle = task.taskTitle,
                status = task.status,
                projectId = task.projectId
            };

            _context.TaskItems.Add(newTask);
            await _context.SaveChangesAsync();

            // Cargar la relación con Project para devolver el nombre
            await _context.Entry(newTask).Reference(t => t.Project).LoadAsync();

            var readTaskDTO = new ReadTaskDTO
            {
                Id = newTask.Id,
                taskTitle = newTask.taskTitle,
                status = newTask.status,
                projectName = newTask.Project?.projectName
            };

            return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, readTaskDTO);

        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, UpdateTaskDTO task)
        {
            //
            var existingTask = await _context.TaskItems.FindAsync(id);
            if (existingTask == null)
                return NotFound("Task not found in the database");

            // Map updated fields
            existingTask.taskTitle = task.taskTitle;
            existingTask.status = task.status;

            try {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the task still exists
                if (!_context.TaskItems.Any(e => e.Id == id))
                    return NotFound("Task not found in the database");
                else
                    throw;
            }

            // Return 204 No Content on successful update
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
