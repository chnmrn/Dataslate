namespace DataslateAPI.DTOs.Tasks
{
    public class ReadTaskDTO
    {
        public int Id { get; set; }
        public string taskTitle { get; set; }
        public bool status { get; set; }

        public string projectName { get; set; }
    }
}
