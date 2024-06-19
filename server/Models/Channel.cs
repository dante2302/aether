namespace Models;

public class Channel : IRecord
{
    public Guid Id { get; set; }
    public Guid OwnerId { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public DateTime DateOfCreation { get; set; }
    public bool IsPopular { get; set; }

}