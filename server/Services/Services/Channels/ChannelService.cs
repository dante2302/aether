using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class ChannelService(IConfiguration config) : DbService(config)
{

    public async Task<Channel> Create(Channel newChannel)
    {
        if (await RecordExistsAsync("Channels", "name", newChannel.Name))
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
                '{newChannel.OwnerId}'::uuid, 
                '{newChannel.Name}', 
                '{newChannel.Description}', 
                false,
                '{newChannel.DateOfCreation}'::TIMESTAMP
            )
            RETURNING *;"
        , MapChannelFromReader);

        ChannelMemberService cmService = new(_config);
        await cmService.Create(new ChannelMember
        {
            ChannelId = result.Record.Id,
            UserId = result.Record.OwnerId
        });

        return result.Record;
    }

    public async Task<Channel> GetOne(Guid id)
    {
        QueryResult<Channel> result = await ExecuteQueryCommandAsync(
            $"SELECT * FROM channels WHERE id = '{id}'::uuid",
            MapChannelFromReader);

        if (!result.HasRecord)
            throw new NotFoundException("Channel not found.");

        return result.Record;
    }

    public async Task<Channel> GetOneByCriteria<T>(string columnName, T columnValue)
    {
        string command =
            $@"SELECT * FROM channels WHERE {columnName} = 
            {(ColumnTypeHelper.NeedsQuotation<T>() ? $"'{columnValue}'" : columnValue)}
            {ColumnTypeHelper.GetAnnotation<T>()}";

        QueryResult<Channel> result = await ExecuteQueryCommandAsync(command, MapChannelFromReader);

        if (!result.HasRecord)
            throw new NotFoundException("Channel not found.");

        return result.Record;
    }
    public async Task<List<Channel>> GetAllByCriteria<T>(string columnName, T columnValue)
    {
        string command =
            $@"SELECT * FROM channels WHERE {columnName} = 
            {(ColumnTypeHelper.NeedsQuotation<T>() ? $"'{columnValue}'" : columnValue)}
            {ColumnTypeHelper.GetAnnotation<T>()}";

        List<Channel> result = await ExecuteQueryListCommandAsync(command, MapChannelFromReader);
        return result;
    }
    public async Task<List<Channel>> GetPopularChannels()
    {
        List<Channel> popularChannels = await ExecuteQueryListCommandAsync($@"
        SELECT * FROM channels
        WHERE isPopular"
        , MapChannelFromReader);

        return popularChannels;
    }
    public async Task<string> GetName(Guid id)
    {
        QueryResult<string> result = await ExecuteQueryCommandAsync(
            @$"SELECT name FROM channels
               WHERE id = '{id}'::uuid", 
            (reader) => reader.GetString(0));

        if (!result.HasRecord)
            throw new NotFoundException("No such channel");

        return result.Record;
    }
    public async Task Update(Channel updatedChannel)
    {

        int rowsAffected = await ExecuteNonQueryCommandAsync($@"
            UPDATE channels
            SET name = '{updatedChannel.Name}',
                description = '{updatedChannel.Description}',
                ispopular = {updatedChannel.IsPopular}
            WHERE id = '{updatedChannel.Id}'::uuid
            AND ownerid = '{updatedChannel.OwnerId}'::uuid
        ");

        if (rowsAffected <= 0)
            throw new NotFoundException("No such channel exists.");
    }
    public async Task Delete(Guid id, Guid ownerId)
    {
        if(! await RecordExistsAsync("channels","id", id))
            throw new NotFoundException("No such channel");

        await CleanupService.CleanupChannel(id, ownerId, _config);

        await ExecuteNonQueryCommandAsync($@"
            DELETE FROM channels 
            WHERE id = '{id}'::uuid
            AND ownerid = '{ownerId}'::uuid
       ");
    }

    public static Channel MapChannelFromReader(NpgsqlDataReader reader)
    {
        return new Channel()
        {
            Id = reader.GetGuid(0),
            OwnerId = reader.GetGuid(1),
            Name = reader.GetString(2),
            Description = reader.IsDBNull(3) ? "" : reader.GetString(3),
            IsPopular = reader.GetBoolean(4),
            DateOfCreation = reader.GetDateTime(5)
        };
    }
}