namespace Config;
public class JwtSettings
{
    public string SigningKey { get; set; }
    public string[] ValidAudiences { get; set; }
    public string ValidIssuer { get; set; }
}