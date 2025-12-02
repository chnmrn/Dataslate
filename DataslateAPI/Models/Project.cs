namespace DataslateAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string projectName { get; set; }
        public string description { get; set; }
        public string GitRepository { get; set; }

        public int userId { get; set; }
        public User User { get; set; }
        public ICollection<TaskItem> Tasks { get; set; }

    }
}
