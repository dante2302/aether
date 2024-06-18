namespace Models;
public class JwtSettings
{
    public required string SigningKey { get; set; }
    public required string[] ValidAudiences { get; set; }
    public required string ValidIssuer { get; set; }
}