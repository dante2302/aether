using Npgsql;

namespace Services;

public static class ColumnTypeHelper
{
    private static Dictionary<Type, Func<NpgsqlDataReader, int, object>> RecordTypeReaderMethods = new(){
        { typeof(int), (reader, index) => reader.GetInt32(index) },
        { typeof(Guid), (reader, index) => reader.GetGuid(index) },
        { typeof(string), (reader, index) => reader.IsDBNull(index) ? "" : reader.GetString(index) },
        { typeof(DateTime), (reader, index) => reader.GetDateTime(index) },
        { typeof(bool), (reader, index) => reader.GetBoolean(index) },
        { typeof (List<string>), (reader, index) => reader.GetFieldValue<string>(index)},
        { typeof (List<int>), (reader, index) => reader.GetFieldValue<int>(index)}
    };
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