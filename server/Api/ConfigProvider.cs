namespace Api;
public static class ConfigProvider
{
    private static readonly Lazy<IConfiguration> _configuration = new(() =>
    {
        return new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddEnvironmentVariables()
            .Build();
    });

    public static IConfiguration Config => _configuration.Value;
}