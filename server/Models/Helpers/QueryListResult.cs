namespace Models;
public readonly struct QueryListResult<T>(bool hasRecords, List<T> records)
{
    public bool HasRecords { get; } = hasRecords;
    public List<T> Records { get; } = records;
}