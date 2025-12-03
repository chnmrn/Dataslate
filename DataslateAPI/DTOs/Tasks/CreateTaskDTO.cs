namespace DataslateAPI.DTOs.Tasks
{
    public class CreateTaskDTO
    {
        public string taskTitle { get; set; }
        public bool status { get; set; }
        public int projectId { get; set; }
    }
}
