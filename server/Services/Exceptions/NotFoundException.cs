namespace Exceptions;
public class NotFoundException : Exception
{
    public override string Message {get;} = "Entity Not Found";
}