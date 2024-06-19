namespace Exceptions;

public class ConflictException : Exception
{
    public ConflictException(){
        Message = "Already Existing Entity";
    }
    public ConflictException(string message)
    {
        Message = message;
    }
    public override string Message {get;}
}
