public readonly struct QueryResult<T> 
{
    public QueryResult(bool hasRecord, T record)
    {
        HasRecord = hasRecord;
        Record = record;
    }
    public QueryResult(bool hasRecord)
    {
        HasRecord = hasRecord;
        Record = default;
    }
    public bool HasRecord { get; }
    public T Record { get; }
}