using Models;

namespace Services;

public class UPIHelper
{
    private static Dictionary<Type, string> InteractionTypeTableNames { get; } = new()
    {
        {typeof(Like),"likes"},
        {typeof(Dislike), "dislikes"},
        {typeof(Save), "saves"}
    };

    public static string GetInteractionTableName<T>()
    where T : UserPostInteraction
    {
        return InteractionTypeTableNames[typeof(T)];
    }
}