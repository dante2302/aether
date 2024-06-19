using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

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
            VALUES( '{newChannel.Id}::UUID',
                    '{newChannel.OwnerId}::UUID',
                    '{newChannel.Name}', 
                    '{newChannel.Description}',
                    '{newChannel.DateOfCreation}'::TIMESTAMP,
                    '{newChannel.IsPopular}',
            )"
        );
    }

    public Channel GetOne(Guid id)
    {
        var reader = GetQueryReader($"SELECT * FROM channels WHERE Id = '{id}'::UUID");
        if(reader.Read())
        {
            return new Channel()
            {
                Id = reader.GetGuid(0),
                OwnerId = reader.GetGuid(1),
                Name = reader.GetString(2),
                Description = reader.GetString(3),
                DateOfCreation = reader.GetDateTime(4),
                IsPopular = reader.GetBoolean(5)
            };
        }
        throw new NotFoundException("Channel not found.");
    }
}
