namespace Services;

public static class ColumnTypeHelper
{
    private static Dictionary<Type, string> Annotations {get; } = new(){
        {typeof(Guid), "::uuid"},
        {typeof(DateTime), "::timespan"},
        {typeof(List<string>), "::array[]::varchar"},
    };
    private static HashSet<Type> NeedQuotationsList { get; } = [
        typeof(Guid),
        typeof(string),
        typeof(DateTime),
    ];

    public static bool NeedsQuotation<T>()
    {
        return NeedQuotationsList.Contains(typeof(T));
    }

    public static string GetAnnotation<T>()
    {
        if(Annotations.ContainsKey(typeof(T)))
        {
            return Annotations[typeof(T)];
        }
        return "";
    }

    public static bool NeedsAnnotation<T>()
    {
        return Annotations.ContainsKey(typeof(T));
    }
}