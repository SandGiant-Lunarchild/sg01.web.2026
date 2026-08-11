using Microsoft.AspNetCore.Routing.Patterns;
using SG_01.Web.Blazor;
using SG_01.Web.Blazor.Components;
using SG_01.Web.Blazor.Localization;

var supportedCultures = new[] { "en-US", "nl-NL" };

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddRouting(options =>
{
    options.ConstraintMap.Add("cultureConstraint", typeof(CultureRouteConstraint));
});

builder.Services.AddOutputCache();
builder.Services.AddLocalization();
builder.Services.AddControllers();
builder.Services.AddSingleton(new BlazorCultureExtractorMiddleware(supportedCultures));

builder.Services.AddHttpClient<WeatherApiClient>(client =>
    {
        // This URL uses "https+http://" to indicate HTTPS is preferred over HTTP.
        // Learn more about service discovery scheme resolution at https://aka.ms/dotnet/sdschemes.
        client.BaseAddress = new("https+http://apiservice");
    });

builder.Services.AddServerSideBlazor();

var app = builder.Build();

//app.UseMiddleware<BlazorCultureExtractorMiddleware>();
app.UseRouting();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

/*requestLocalizationOptions.RequestCultureProviders.Add(new RouteRequestCultureProvider()
{
    Options = requestLocalizationOptions
});*/

void MapLanguageBase(IApplicationBuilder appBuilder, string locale)
{
    appBuilder.UseRouting();
    appBuilder.UseAntiforgery();

    appBuilder.UseOutputCache();
    var requestLocalizationOptions = new RequestLocalizationOptions()
        .SetDefaultCulture(locale)
        .AddSupportedCultures(supportedCultures)
        .AddSupportedUICultures(supportedCultures);

    requestLocalizationOptions.RequestCultureProviders.Clear();

    appBuilder.UseRequestLocalization(requestLocalizationOptions);
    appBuilder.Use(async(context, next) =>
    {
        await next();
    });
    appBuilder.UseEndpoints(endpoints => {
        endpoints.MapRazorComponents<App>()
            .AddInteractiveServerRenderMode();
    });
}


app.Map("/nl", appBuilder => MapLanguageBase(appBuilder, "nl-NL"));
MapLanguageBase(app, "en-US");

app.MapDefaultEndpoints();

app.Run();
