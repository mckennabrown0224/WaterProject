using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        
        public WaterController(WaterDbContext temp)
        {
            _waterContext = temp;
        }
        
        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string> ? projectTypes=null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }
            
            var totalCount = query.Count();
            var data = query.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList();
            
            var tempObject = new
            {
                Projects = data, 
                totalNumProjects = totalCount
            };
            
            return Ok(tempObject);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects.Select(p => p.ProjectType).Distinct().ToList();
            
            return Ok(projectTypes);
        }

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject)
        {
            _waterContext.Projects.Add(newProject);
            _waterContext.SaveChanges();
            return Ok(newProject);
        }
        
        [HttpPut("UpdateProject/{projectID}")]
        public IActionResult UpdateProject(int projectID, [FromBody] Project updatedProject)
        {
            var existingProject = _waterContext.Projects.Find(projectID);
            if (existingProject == null)
            {
                return NotFound(new {message = "Project not found"});
            }
            else
            {
                existingProject.ProjectName = updatedProject.ProjectName;
                existingProject.ProjectType = updatedProject.ProjectType;
                existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
                existingProject.ProjectImpact = updatedProject.ProjectImpact;
                existingProject.ProjectPhase = updatedProject.ProjectPhase;
                existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;
                
                _waterContext.Projects.Update(existingProject);
                _waterContext.SaveChanges();

            }
            return Ok(existingProject);
        }

        [HttpDelete("DeleteProject/{projectID}")]
        public IActionResult DeleteProject(int projectID)
        {
            var project = _waterContext.Projects.Find(projectID);
            if (project == null)
            {
                return NotFound(new {message = "Project not found"});
            }
            
            _waterContext.Projects.Remove(project);
            _waterContext.SaveChanges();
            return NoContent();
        }
        
    }
}

