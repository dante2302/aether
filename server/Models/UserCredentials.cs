namespace Models;
public class UserCredentials
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public Guid UserId { get; set; }
}