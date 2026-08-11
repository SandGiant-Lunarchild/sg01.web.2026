using Microsoft.AspNetCore.Localization;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;

namespace SG_01.Web.Blazor.Localization;

/// <summary>
/// Provider that determines the culture from the route value. This allows for route-based localization.
/// </summary>
public class RouteRequestCultureProvider : RequestCultureProvider
{
    public override Task<ProviderCultureResult?> DetermineProviderCultureResult(HttpContext httpContext)
    {
        string? foundCulture = null;
        if (httpContext.Request.RouteValues.TryGetValue("culture", out var culture))
        {
            string? cultureString = culture?.ToString();
            if (!string.IsNullOrEmpty(cultureString))
            {
                foundCulture = cultureString;
            }
        }

        if (IsSupportedCulture(foundCulture) is CultureInfo cultureInfo)
        {
            // TODO: Check if required.
            //SetThreadCulture(foundCulture);

            return Task.FromResult<ProviderCultureResult?>(new ProviderCultureResult(cultureInfo.Name));
        }
        return Task.FromResult<ProviderCultureResult?>(null);
    }

    private static void SetThreadCulture(string routeCulture)
    {
        CultureInfo cultureInfo = CultureInfo.GetCultureInfo(routeCulture);
        Thread.CurrentThread.CurrentCulture = cultureInfo;
        Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(routeCulture);
    }

    /// <summary>
    /// Check if a culture code is valid and supported.
    /// </summary>
    private CultureInfo? IsSupportedCulture(string? cultureCode)
    {
        if (string.IsNullOrEmpty(cultureCode))
        {
            return null;
        }
        return Options?.SupportedCultures?.FirstOrDefault(x =>
            x.TwoLetterISOLanguageName.Equals(
                cultureCode,
                StringComparison.InvariantCultureIgnoreCase
            )
        );
    }
}
