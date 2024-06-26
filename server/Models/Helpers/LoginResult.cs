namespace Models;

public class LoginResult(User user, string jwt)
{
    public Guid Id { get; } = user.Id;
    public string Username { get; } = user.Username;
    public List<string> SocialLinks { get; } = user.SocialLinks;
    public string AccessToken { get; } = jwt;
    public DateTime DateOfCreation { get; } = user.DateOfCreation;
}