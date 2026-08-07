var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.sg01_web__2026_ApiService>("apiservice")
    .WithHttpHealthCheck("/health");

builder.AddProject<Projects.sg01_web__2026_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/health")
    .WithReference(apiService)
    .WaitFor(apiService);

//builder.AddProject("angular", "")
builder.AddViteApp("angular", Path.GetDirectoryName(new Projects.sg01_web__2026_angular().ProjectPath)!, "start")
    .WithEnvironment("NG_APP_API_BASE", apiService.GetEndpoint("http"))
    .WaitFor(apiService);

builder.AddViteApp("react", Path.GetDirectoryName(new Projects.sg01_web__2026_react().ProjectPath)!)
    .WithEnvironment("VITE_APISERVER_URL", apiService.GetEndpoint("http"))
    .WaitFor(apiService);

builder.Build().Run();
