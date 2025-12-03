using DataslateAPI.DTOs.Projects;
using DataslateAPI.Models;

namespace DataslateAPI.DTOs.Users
{
    public class ReadUserWithProjectsDTO
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string passwordHash { get; set; }

        public ICollection<ReadProjectDTO> Projects { get; set; }
    }
}
