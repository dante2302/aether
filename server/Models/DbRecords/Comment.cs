namespace Models;

public class Comment : IRecord 
{
    public Guid Id { get; set; }
    public Guid PostId { get; set; }
    public Guid OwnerId { get; set; }
    public required string Text { get; set; }
    public bool IsEdited { get; set; }
    public DateTime DateOfCreation { get; set; }
}