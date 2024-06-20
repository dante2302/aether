namespace Models;

public class Post : IRecord
{
    public Guid Id { get; set; }

    public Guid OwnerId { get; set; }

    public Guid ChannelId { get; set; }

    public bool IsPopular { get; set; }
}