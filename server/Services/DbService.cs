using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.Configuration;
using Npgsql;

namespace Services;

public abstract class DbService(IConfiguration config)
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

    public NpgsqlDataReader GetQueryReader(string query)
    {
        using var connection = new NpgsqlConnection(_config.GetConnectionString("aether"));
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = query;
        var reader = tableCmd.ExecuteReader();
        return reader;
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

