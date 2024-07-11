using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.Configuration;
using Npgsql;

namespace Services;

public abstract class DbService
{
    public DbService(IConfiguration config){
        _config = config;
        _connectionString = _config.GetConnectionString("aether");
        if(_connectionString is null)
        {
            throw new InvalidConfigurationException();    
        }
    }
    protected readonly IConfiguration _config;
    protected readonly string? _connectionString;

    // SYNCHRONIOUS METHODS
    protected virtual QueryResult<T> ExecuteQueryCommand<T>(string query, Func<NpgsqlDataReader, T> GetColumnValues)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = query;
        var reader = tableCmd.ExecuteReader();
        if(reader.Read())
        {
            var record =  GetColumnValues(reader);
            return new QueryResult<T>(true, record);
        }
        return new QueryResult<T>(false);
    }

    protected virtual int ExecuteNonQueryCommand(string command)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = command;
        var rowsAffected = tableCmd.ExecuteNonQuery(); 
        return rowsAffected;
    }    

    protected virtual bool RecordExists<T>(string tableName, NpgsqlParameter columnName, NpgsqlParameter columnValue)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = @$"
            SELECT * FROM {tableName} WHERE @ColumnName = @ColumnValue
            {ColumnTypeHelper.GetAnnotation<T>()}";
        tableCmd.Parameters.Add(columnName);
        tableCmd.Parameters.Add(columnValue);
        var reader = tableCmd.ExecuteReader();
        return reader.HasRows;
    }

    // *** ASYNC METHODS ***
    protected virtual async Task<QueryResult<T>> ExecuteQueryCommandAsync<T>
        (string query, Func<NpgsqlDataReader, T> GetColumnValues)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = query;
        var reader = await tableCmd.ExecuteReaderAsync();
        if(await reader.ReadAsync())
        {
            var record =  GetColumnValues(reader);
            return new QueryResult<T>(true, record);
        }
        return new QueryResult<T>(false);
    }
    protected virtual async Task<QueryResult<T>> ExecuteQueryCommandAsync<T>
        (string query, Func<NpgsqlDataReader, T> GetColumnValues, NpgsqlParameter[] parameters)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = query;
        tableCmd.Parameters.AddRange(parameters);
        var reader = await tableCmd.ExecuteReaderAsync();
        if(await reader.ReadAsync())
        {
            var record =  GetColumnValues(reader);
            return new QueryResult<T>(true, record);
        }
        return new QueryResult<T>(false);
    }

    protected virtual async Task<List<T>> ExecuteQueryListCommandAsync<T>
        (string query, Func<NpgsqlDataReader, T> GetColumnValues)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = query;
        var reader = await tableCmd.ExecuteReaderAsync();
        List<T> records = [];
        while(await reader.ReadAsync())
        {
            records.Add(GetColumnValues(reader));
        }
        return records; 
    }

    protected virtual async Task<List<T>> ExecuteQueryListCommandAsync<T>
        (string query, Func<NpgsqlDataReader, T> GetColumnValues, NpgsqlParameter[] parameters)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = query;
        if(parameters.Length > 0)
            tableCmd.Parameters.AddRange(parameters);

        var reader = await tableCmd.ExecuteReaderAsync();
        List<T> records = [];
        while(await reader.ReadAsync())
        {
            records.Add(GetColumnValues(reader));
        }
        return records; 
    }
    protected virtual async Task<int> ExecuteNonQueryCommandAsync(string command, NpgsqlParameter[] parameters)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = command;
        tableCmd.Parameters.AddRange(parameters);
        var rowsAffected = await tableCmd.ExecuteNonQueryAsync(); 
        return rowsAffected;
    }    
    protected virtual async Task<int> ExecuteNonQueryCommandAsync(string command)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = command;
        var rowsAffected = await tableCmd.ExecuteNonQueryAsync(); 
        return rowsAffected;
    }    

    protected virtual async Task<object?> ExecuteScalarAsync(string command)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = command;
        return await tableCmd.ExecuteScalarAsync();
    }

    protected virtual async Task<bool> RecordExistsAsync<T>(
        string tableName, 
        string columnName, 
        NpgsqlParameter columnValue
    )
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = @$"
            SELECT * FROM {tableName} 
            WHERE {columnName} = @ColumnValue{ColumnTypeHelper.GetAnnotation<T>()}";
        tableCmd.Parameters.Add(columnValue);
        var reader = await tableCmd.ExecuteReaderAsync();
        return reader.HasRows;
    }
    protected virtual async Task<bool> RecordExistsAsync(string tableName, string columnName, int columnValue)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = @$"
            SELECT * FROM {tableName} WHERE {columnName} = {columnValue}";
        var reader = await tableCmd.ExecuteReaderAsync();
        return reader.HasRows;
    }
    protected virtual async Task<bool> RecordExistsAsync(string tableName, string columnName, Guid columnValue)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = @$"
            SELECT * FROM {tableName} WHERE {columnName} = '{columnValue}'::uuid";
        var reader = await tableCmd.ExecuteReaderAsync();
        return reader.HasRows;
    }

    protected virtual async Task<bool> RecordExistsUnionAsync<T,F>(
        string tableName,
        string columnName,
        NpgsqlParameter columnValue,
        string secondColumnName,
        NpgsqlParameter secondColumnValue
    )
    {
        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = @$"
            SELECT * FROM {tableName} 

            WHERE {columnName} = @ColumnValue
            {ColumnTypeHelper.GetAnnotation<T>()}

            AND {secondColumnName} = @SecondColumnValue
            {ColumnTypeHelper.GetAnnotation<T>()}";
        tableCmd.Parameters.Add(columnValue);
        tableCmd.Parameters.Add(secondColumnValue);
        var reader = await tableCmd.ExecuteReaderAsync();
        return reader.HasRows;
    }
}

