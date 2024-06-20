namespace Models;

public class ChannelMember : IRecord
{
    public Guid ChannelId { get; set; }
    public Guid UserId { get; set; }
}