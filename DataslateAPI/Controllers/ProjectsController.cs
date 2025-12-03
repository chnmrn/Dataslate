using DataslateAPI.Data;
using DataslateAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataslateAPI.DTOs;
using DataslateAPI.DTOs.Projects;

namespace DataslateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly DataslateDbContext _context;
        public ProjectsController(DataslateDbContext context)
        {
            _context = context;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            // LINQ Include related Tasks when fetching Projects
            return await _context.Projects
                .Include(u => u.Tasks)
                .ToListAsync();
        }

        // GET: api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            // LINQ Include related Tasks when fetching a specific Project
            var project = await _context.Projects
                .Include(u => u.Tasks)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (project == null)
                return NotFound("Project not found in the database");

            return project;
        }

        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(CreateProjectDTO createDTO)
        {
            var project = new Project
            {
                projectName = createDTO.projectName,
                description = createDTO.description,
                GitRepository = createDTO.GitRepository,
                userId = createDTO.userId
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }


        // PUT: api/projects/{id}
        [HttpPut]
        public async Task<ActionResult> UpdateProject(int id, Project project)
        {
            if (id != project.Id)
                return BadRequest("Project not found in the database or wrong Id");

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the user still exists
                if (!_context.Projects.Any(e => e.Id == id))
                    return NotFound("Task not found in the database");
                else
                    // Rethrow the exception if it's another issue
                    throw;
            }

            // Return NoContent to indicate successful update
            return NoContent();

        }

        // DELETE: api/projects/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            // If user not found, return 404
            if (project == null)
                return NotFound("Project not found in the database");
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
