namespace Models;
public class User : IRecord
{
    public required Guid Id { get; set;}
    public required string Username { get; set; }
    public required List<string> SocialLinks {get; set;}
    public DateTime DateOfCreation { get; set; }
}
