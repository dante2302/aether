using Models;
using Npgsql;

namespace Services;
public interface IUserPostInteractionService<T>
where T : UserPostInteraction, new()
{
    public Task<bool> Create(T newInteraction);

    public Task<bool> InteractionExists(T interaction);

    public Task<long> GetCount(Guid postId);
    public T MapInteractionFromReader(NpgsqlDataReader reader);

    public Task<List<T>> GetByUser(Guid userId);

    public Task<bool> Delete(T interaction);
}