using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

public class ChannelMemberService(IConfiguration config) : DbService(config)
{
    public async Task Create(ChannelMember newChannelMember)
    {
        if(await ChannelMemberExists(newChannelMember))
            return;

        int result = await ExecuteNonQueryCommandAsync(@$"
            INSERT INTO channelMembers
            VALUES(
                '{newChannelMember.ChannelId}'::uuid, 
                '{newChannelMember.UserId}'::uuid 
            )");

        if(result <= 0){
            throw new NpgsqlException();
        }
    }

    public async Task<List<Channel>> GetUserChannels(Guid userId)
    {
        List<Channel> result = await ExecuteQueryListCommandAsync($@"
            SELECT channels.*
            FROM channels
            JOIN channelmembers ON channel.id == channelmembers.channelId
            WHERE channelmembers.userId = {userId}
        ", ChannelService.MapChannelFromReader);

        return result;
    }

    public async Task<int> GetMemberCount(Guid channelId)
    {
        int? result = (int?)await ExecuteScalarAsync($@"
            SELECT COUNT(*) FROM channelmembers
            WHERE channelId = '{channelId}'::uuid
        ");
        return result ?? 0;
    }

    public async Task Delete(ChannelMember channelMember)
    {
        if(!await ChannelMemberExists(channelMember))
            return;

        int result = await ExecuteNonQueryCommandAsync(@$"
            DELETE FROM ChannelMembers
            WHERE channelId = '{channelMember.ChannelId}'::uuid
            AND userId = '{channelMember.UserId}'::uuid 
        ");

        if(result <= 0){
            throw new NpgsqlException();
        }
    }

    public async Task<bool> ChannelMemberExists(ChannelMember cm)
    {
        var result = await ExecuteQueryCommandAsync($@"
            SELECT * FROM channelMembers
            WHERE ChannelId = '{cm.ChannelId}'::uuid 
            AND UserId = '{cm.UserId}'::uuid 
        ", 
        MapChannelMemberFromReader);
        return result.HasRecord;
    }

    private ChannelMember MapChannelMemberFromReader(NpgsqlDataReader reader)
    {
        return new ChannelMember{
            ChannelId = reader.GetGuid(0),
            UserId = reader.GetGuid(1)
        };
    }
}