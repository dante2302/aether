namespace Models;

public class Reply : IRecord
{
    public Guid Id { get; set;}
    public Guid ParentCommentId { get; set; }
    public Guid OwnerId { get; set; }
    public Guid ReplyToComment { get; set; }
    public required string Text { get; set; }
    public bool IsEdited { get; set; }
    public DateTime DateOfCreation { get; set; }
}