using System.Numerics;

namespace Models;
public class User
{
    public required Guid Id { get; set;}
    public required string Username { get; set; }
    public required List<string> SocialLinks {get; set;}
    public required BigInteger DateOfCreation { get; set; }
}
