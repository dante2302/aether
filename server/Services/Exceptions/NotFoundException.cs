namespace Exceptions;
public class NotFoundException : Exception
{
    public NotFoundException(){
        Message = "Entity Not Found";
    }
    public NotFoundException(string message){
        Message = message;
    }
    public override string Message {get;}
}