using System.Text.RegularExpressions;

namespace SG_01.Web.Blazor.Localization;

/// <summary>
/// Middleware that extracts the culture from the URL for Blazor requests and stores it in RouteValues. This allows IStringLocalizers to use the correct culture in Blazor components.
/// </summary>
/// <remarks>
/// Requires UseRouting() to be called after this middleware in the pipeline.
/// </remarks>
public class BlazorCultureExtractorMiddleware : IMiddleware
{
    private readonly Regex _localizationRequestPattern;

    /// <param name="supportedCultures">List of cultures supported by the application in the route parameter.</param>
    public BlazorCultureExtractorMiddleware(string[] supportedCultures)
    {
        var culturePattern = string.Join("|", GetCulturePatterns(supportedCultures));
        _localizationRequestPattern = new Regex($"^/+({culturePattern})(/.*|)$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
    }
    
    private static IEnumerable<string> GetCulturePatterns(string[] supportedCultures)
    {
        foreach (var culture in supportedCultures)
        {
            yield return Regex.Escape(culture);
            yield return Regex.Escape(culture.Substring(0, 2));
        }
    }

    async Task IMiddleware.InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (context.Request.Path.HasValue == false)
        {
            await next(context);
            return;
        }

        var match = _localizationRequestPattern.Match(context.Request.Path.Value);

        // If it's a request for a blazor endpoint
        if (match.Success)
        {
            // Grab the culture from the URL and store it in RouteValues
            // This allows IStringLocalizers to use the correct culture in Blazor components
            context.Request.RouteValues["culture"] = match.Groups[1].Value;
            // Remove the /culture/ from the URL so that Blazor works properly
            context.Request.Path = string.IsNullOrEmpty(match.Groups[2].Value) ? "/" : match.Groups[2].Value;
            
        }

        await next(context);
    }
}
