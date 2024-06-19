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
    private readonly IConfiguration _config;
    private readonly string? _connectionString;

    protected void ExecuteNonQueryCommand(string command)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = command;
        var a = tableCmd.ExecuteNonQuery();
        connection.Close();
    }

    public QueryResult<T> ExecuteQueryCommand<T>(string query, Func<NpgsqlDataReader, T> GetColumnValues)
        where T : IRecord
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

    public bool RecordExists<T>(string tableName, string columnName, T columnValue)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = $"SELECT * FROM {tableName} WHERE {columnName} = {columnValue}";
        var reader = tableCmd.ExecuteReader();
        return reader.HasRows;
    }
}

