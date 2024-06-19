using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;

namespace Services;

public class ChannelService(IConfiguration config) : DbService(config)
{

    public void Create(Channel newChannel)
    {
        if(RecordExists("Channels", "name", newChannel.Name))
        {
            throw new ConflictException("Channel already exists.");
        }
        ExecuteNonQueryCommand(@$"
            INSERT INTO channels 
            VALUES( '{newChannel.Id}'::UUID',
                    '{newChannel.OwnerId}'::UUID',
                    '{newChannel.Name}', 
                    '{newChannel.Description}',
                    '{newChannel.DateOfCreation}'::TIMESTAMP,
                    '{newChannel.IsPopular}',
            )"
        );
    }

    public Channel GetOne(Guid id)
    {
        QueryResult<Channel> result = ExecuteQueryCommand(
            $"SELECT * FROM channels WHERE id = '{id}'::uuid", 
            (reader) => {
                return new Channel()
                {
                    Id = reader.GetGuid(0),
                    OwnerId = reader.GetGuid(1),
                    Name = reader.GetString(2),
                    Description = reader.IsDBNull(3) ? "" : reader.GetString(3),
                    DateOfCreation = reader.GetDateTime(4),
                    IsPopular = reader.GetBoolean(5)
               };
            });

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

        QueryResult<Channel> result = ExecuteQueryCommand(command,
            (reader) => {
                return new Channel()
                {
                    Id = reader.GetGuid(0),
                    OwnerId = reader.GetGuid(1),
                    Name = reader.GetString(2),
                    Description = reader.IsDBNull(3) ? "" : reader.GetString(3),
                    DateOfCreation = reader.GetDateTime(4),
                    IsPopular = reader.GetBoolean(5)
                };
            });

        if(!result.HasRecords)
        {
            throw new NotFoundException("Channel not found.");
        }

        return result.Record;
    }
}
