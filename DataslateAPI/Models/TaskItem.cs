namespace DataslateAPI.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string taskTitle { get; set; }
        public bool status { get; set; }

        public int projectId { get; set; }
        public Project Project { get; set; }
    }
}
