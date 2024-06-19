using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;
using NpgsqlTypes;

namespace Services;

public class ChannelService(IConfiguration config) : DbService(config)
{

    public async Task<Channel> Create(Channel newChannel)
    {
        if(await RecordExistsAsync("Channels", "name", newChannel.Name))
        {
            throw new ConflictException($"Channel with name {newChannel.Name} already exists.");
        }

        newChannel.Id = Guid.NewGuid();
        newChannel.IsPopular = false;
        newChannel.DateOfCreation = DateTime.Now;

        QueryResult<Channel> result = await ExecuteQueryCommandAsync(@$"
            INSERT INTO channels
            VALUES(
                '{newChannel.Id}'::uuid, 
                '{newChannel.OwnerId}'::uuid, '{newChannel.Name}', 
                '{string.Empty}', 
                '{newChannel.DateOfCreation}'::TIMESTAMP, 
            false)
            RETURNING *;"
        , MapChannelFromReader);
        return result.Record;
    }

    public Channel GetOne(Guid id)
    {
        QueryResult<Channel> result = ExecuteQueryCommand(
            $"SELECT * FROM channels WHERE id = '{id}'::uuid", 
            MapChannelFromReader);

        if(!result.HasRecords)
        {
            throw new NotFoundException("Channel not found.");
        }
        return result.Record;
    }

    public Channel GetOneByCriteria<T>(string columnName, T columnValue)
    {
        string command =  
            $@"SELECT * FROM channels WHERE {columnName} = 
            {(ColumnTypeHelper.NeedsQuotation<T>() ? $"'{columnValue}'" : columnValue )}
            {ColumnTypeHelper.GetAnnotation<T>()}";

        QueryResult<Channel> result = ExecuteQueryCommand(command, MapChannelFromReader);
        if(!result.HasRecords)
        {
            throw new NotFoundException("Channel not found.");
        }

        return result.Record;
    }

    public void Update(Channel updatedChannel)
    {
        int rowsAffected = ExecuteNonQueryCommand($@"
            UPDATE channels
            SET name = {updatedChannel.Name} 
                description = {updatedChannel.Description}
                ispopular = {updatedChannel.IsPopular}
            WHERE id = {updatedChannel.Id}
        ");

        if(rowsAffected <= 0)
            throw new NotFoundException("No such channel exists.");
    }
    public void Delete(Guid id)
    {
       int rowsAffected = ExecuteNonQueryCommand($@"
            DELETE FROM channels 
            WHERE id = '{id}'::uuid
       ");

       if(rowsAffected <= 0)
       throw new NotFoundException("No such channel exists."); 
    }

    private Channel MapChannelFromReader(NpgsqlDataReader reader)
    {
        return new Channel()
        {
            Id = reader.GetGuid(0),
            OwnerId = reader.GetGuid(1),
            Name = reader.GetString(2),
            Description = reader.IsDBNull(3) ? "" : reader.GetString(3),
            DateOfCreation = reader.GetDateTime(4),
            IsPopular = reader.GetBoolean(5)
        };
    }
}
