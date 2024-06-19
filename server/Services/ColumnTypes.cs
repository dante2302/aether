namespace Services;

public static class ColumnTypeHelper
{
    private static Dictionary<Type, string> Annotations {get; } = new(){
        {typeof(Guid), "::uuid"},
        {typeof(DateTime), "::timespan"},
        {typeof(List<string>), "::array[]::varchar"},
    };
    public static Type[] NeedQuotationsList { get; } = [
        typeof(Guid),
        typeof(string),
        typeof(DateTime),
        typeof(bool)
    ];

    public static string GetTypeAnnotation<T>()
    {
        if(Annotations.ContainsKey(typeof(T)))
        {
            return Annotations[typeof(T)];
        }
        return "";
    }
}