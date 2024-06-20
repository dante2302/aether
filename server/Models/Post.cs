namespace Models;

public class Post : IRecord
{
    public Guid Id { get; set; }
    public Guid OwnerId { get; set; }
    public Guid ChannelId { get; set; }
    public required string Title { get; set; }
    public string? Text { get; set; }
    public string? LinkUrl { get; set; }
    public string? ImgUrl { get; set; }
    public DateTime DateOfCreation { get; set; }
    public bool IsPopular { get; set; }
}