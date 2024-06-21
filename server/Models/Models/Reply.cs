namespace Models;

public class Reply : IRecord
{
    public Guid Id { get; set;}
    public Guid ParentCommentId { get; set; }
    public Guid UserId { get; set; }
    public required string Text { get; set; }
    public DateTime DateOfCreation { get; set; }
}