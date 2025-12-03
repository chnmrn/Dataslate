namespace DataslateAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string passwordHash { get; set; }

        public ICollection<Project> Projects { get; set; }

    }
}
