namespace Models;

public readonly struct AuthenticationResult(bool isSuccessful, User userData)
{
    public bool IsSuccessful { get; } = isSuccessful;
    public User UserData { get; } = userData;
}
