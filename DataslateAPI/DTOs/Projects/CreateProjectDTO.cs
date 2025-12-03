namespace DataslateAPI.DTOs.Projects
{
    public class CreateProjectDTO
    {
        public string projectName { get; set; }
        public string description { get; set; }
        public string GitRepository { get; set; }
        public int userId { get; set; }

    }
}
