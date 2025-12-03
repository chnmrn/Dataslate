using DataslateAPI.DTOs.Tasks;

namespace DataslateAPI.DTOs.Projects
{
    public class ReadProjectDTO
    {
        public int Id { get; set; }
        public string projectName { get; set; }
        public string description { get; set; }
        public string GitRepository { get; set; }
        public string userName { get; set; }

    }
}
