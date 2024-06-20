namespace Models;

public class Like : IRecord
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
}