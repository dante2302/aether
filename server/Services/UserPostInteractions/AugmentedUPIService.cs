using Exceptions;
using Microsoft.Extensions.Configuration;
using Models;
using Npgsql;

namespace Services;

// UPI STANDS FOR UserPostInteraction
public class AugmentedUPIService<T>(IConfiguration config) 
    : UPIService<T>(config)
    where T : UserPostInteraction, new()
{
    public async Task<bool> CreateMutuallyExclusive<F>
    (T newInteraction)
    where F : UserPostInteraction, new()
    {
        F tempInteraction = new()
        {
            PostId = newInteraction.PostId,
            OwnerId = newInteraction.OwnerId,
        };

        UPIService<F> complementaryService = new(_config);

        bool exclusiveExists = await complementaryService.InteractionExists(tempInteraction);
        if (exclusiveExists)
        {
            await complementaryService.Delete(tempInteraction);
        }  
        bool result = await Create(newInteraction);
        return result;
    }
}