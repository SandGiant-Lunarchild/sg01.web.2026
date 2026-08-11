namespace SG_01.Web.Blazor.Localization;

/// <summary>
/// Route constraint that allows supported cultures to be used at the start of the route.
/// </summary>
public sealed class CultureRouteConstraint : IRouteConstraint
{
    private readonly string[] _supportedCultures;

    public CultureRouteConstraint(string[] supportedCultures)
    {
        _supportedCultures = supportedCultures;
    }

    public bool Match(HttpContext? httpContext, IRouter? route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
    {
        if (!values.TryGetValue(routeKey, out var routeValue))
        {
            return true;
        }

        var routeString = routeValue?.ToString();
        if (routeString == null)
        {
            return false;
        }

        if (routeString.Length > 2 && _supportedCultures.Contains(routeString, StringComparer.OrdinalIgnoreCase))
        {
            return true;
        }
        if (routeString.Length == 2 && _supportedCultures.Any(x => x.StartsWith(routeString + "-", StringComparison.OrdinalIgnoreCase)))
        {
            return true;
        }
        return false;
    }
}
