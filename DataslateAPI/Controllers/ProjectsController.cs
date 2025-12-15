using DataslateAPI.Data;
using DataslateAPI.DTOs;
using DataslateAPI.DTOs.Projects;
using DataslateAPI.DTOs.Tasks;
using DataslateAPI.DTOs.Users;
using DataslateAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DataslateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly DataslateDbContext _context;
        public ProjectsController(DataslateDbContext context)
        {
            _context = context;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadProjectDTO>>> GetProjects()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var projects = await _context.Projects
                .Where(p => p.userId == userId)
                .Include(p => p.Tasks)
                .Include(p => p.User)
                .ToListAsync();

            var readProjectDTOs = projects.Select(p => new ReadProjectDTO
            {
                Id = p.Id,
                projectName = p.projectName,
                description = p.description,
                GitRepository = p.GitRepository,
                userName = p.User?.username
            }).ToList();

            return Ok(readProjectDTOs);
        }



        // GET: api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadProjectWithTasksDTO>> GetProject(int id)
        {
            // LINQ Include related Tasks and User when fetching a specific Project
            var project = await _context.Projects
                .Include(u => u.Tasks)
                .Include(u => u.User)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (project == null)
                return NotFound("Project not found in the database");

            // Map Project entity to ReadProjectWithTasksDTO
            var readProjectDTO = new ReadProjectWithTasksDTO
            {
                Id = project.Id,
                projectName = project.projectName,
                description = project.description,
                GitRepository = project.GitRepository,
                userName = project.User != null ? project.User.username : null,
                Tasks = project.Tasks.Select(t => new ReadTaskDTO
                {
                    Id = t.Id,
                    taskTitle = t.taskTitle,
                    status = t.status,
                    projectName = project.projectName
                }).ToList()
            };

            return Ok(readProjectDTO);
        }

        // POST: api/projects
        [HttpPost]
public async Task<ActionResult<ReadProjectDTO>> CreateProject(CreateProjectDTO project)
{
    // Get userId from JWT token claims
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

    var newProject = new Project
    {
        projectName = project.projectName,
        description = project.description,
        GitRepository = project.GitRepository,
        userId = userId   
    };

    _context.Projects.Add(newProject);
    await _context.SaveChangesAsync();

    await _context.Entry(newProject).Reference(p => p.User).LoadAsync();

    var readProjectDTO = new ReadProjectDTO
    {
        Id = newProject.Id,
        projectName = newProject.projectName,
        description = newProject.description,
        GitRepository = newProject.GitRepository,
        userName = newProject.User?.username
    };

    return CreatedAtAction(nameof(GetProject), new { id = newProject.Id }, readProjectDTO);
}




        // PUT: api/projects/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProject(int id, UpdateProjectDTO project)
        {
            // Find the existing project
            var existingProject = await _context.Projects.FindAsync(id);
            if (existingProject == null)
                return NotFound("Project not found in the database");

            // Map updated fields
            existingProject.projectName = project.projectName;
            existingProject.description = project.description;
            existingProject.GitRepository = project.GitRepository;

            try 
            {
                // Save changes to the database
                await _context.SaveChangesAsync();

            } catch (DbUpdateConcurrencyException)
            {
                // Check if the project still exists
                if (!_context.Projects.Any(e => e.Id == id))
                {
                    return NotFound("Project not found in the database");
                }
                else
                {
                    throw;
                }
            }

            // Return 204 No Content on successful update
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
