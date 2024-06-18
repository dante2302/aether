using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.Configuration;
using Npgsql;

namespace Services;

public class DbService(IConfiguration config)
{
    private readonly IConfiguration _config = config;
    private readonly string? _connectionString = config.GetConnectionString("aether");
    protected void ExecuteNonQueryCommand(string command)
    {
        if(_connectionString is null)
        {
            throw new InvalidConfigurationException();    
        }

        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = command;
        var a = tableCmd.ExecuteNonQuery();
        connection.Close();
    }
    public bool RecordExists(string tableName, string columnName, string columnValue)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = $"SELECT * FROM {tableName} WHERE {columnName} = {columnValue}";
        var reader = tableCmd.ExecuteReader();
        bool exists = reader.HasRows;

        connection.Close();
        return exists;
    }
}

