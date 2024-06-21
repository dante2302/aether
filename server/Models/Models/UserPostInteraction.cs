namespace Models;
public class UserPostInteraction : IRecord 
{
    public Guid PostId { get; set; }
    public Guid OwnerId { get; set; }
}