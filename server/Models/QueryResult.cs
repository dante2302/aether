public readonly struct QueryResult<T> 
{
    public QueryResult(bool hasRecords, T record)
    {
        HasRecords = hasRecords;
        Record = record;
    }
    public QueryResult(bool hasRecords)
    {
        HasRecords = hasRecords;
    }
    public bool HasRecords { get; }
    public T Record { get; }
}