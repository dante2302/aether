namespace Models;
public class UserCredentials : IRecord
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public Guid OwnerId { get; set; }
}