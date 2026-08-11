using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using Microsoft.AspNetCore.Components.Routing;
using System.Diagnostics;
using System.Globalization;

namespace SG_01.Web.Blazor.Components;

public class LocNavLink : NavLink
{
    string? _hrefWithLanguage;
    string? _hrefAbsolute;
    bool _isActive;

    [Inject] private NavigationManager NavigationManager { get; set; } = default!;

    protected override void OnParametersSet()
    {
        base.OnParametersSet();
        // Update computed state
        var href = (string?)null;
        if (AdditionalAttributes != null && AdditionalAttributes.TryGetValue("href", out var obj))
        {
            href = Convert.ToString(obj, CultureInfo.InvariantCulture);
        }

        var uri = href == null ? null : new Uri(href, UriKind.RelativeOrAbsolute);
        if (uri is { IsAbsoluteUri: false })
        {
            uri = NavigationManager.ToAbsoluteUri(href);
            _hrefAbsolute = uri?.AbsoluteUri;
            _hrefWithLanguage = uri?.PathAndQuery;
        }
        else
        {
            _hrefAbsolute = href;
            _hrefWithLanguage = href;
        }

        _isActive = ShouldMatch(NavigationManager.Uri);
    }

    protected override void BuildRenderTree(RenderTreeBuilder builder)
    {
        builder.OpenElement(0, "a");

        builder.AddMultipleAttributes(1, AdditionalAttributes?.Where(x => x.Key != "href"));
        builder.AddAttribute(2, "href", _hrefWithLanguage);
        builder.AddAttribute(3, "class", CssClass);
        if (_isActive)
        {
            builder.AddAttribute(4, "aria-current", "page");
        }
        builder.AddContent(5, ChildContent);

        builder.CloseElement();
    }

    private bool ShouldMatch(string currentUriAbsolute)
    {
        if (_hrefAbsolute == null)
        {
            return false;
        }

        if (EqualsHrefExactlyOrIfTrailingSlashAdded(currentUriAbsolute))
        {
            return true;
        }

        if (Match == NavLinkMatch.Prefix
            && IsStrictlyPrefixWithSeparator(currentUriAbsolute, _hrefAbsolute))
        {
            return true;
        }

        return false;
    }

    private bool EqualsHrefExactlyOrIfTrailingSlashAdded(string currentUriAbsolute)
    {
        Debug.Assert(_hrefAbsolute != null);

        if (string.Equals(currentUriAbsolute, _hrefAbsolute, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }

        if (currentUriAbsolute.Length == _hrefAbsolute.Length - 1)
        {
            // Special case: highlight links to http://host/path/ even if you're
            // at http://host/path (with no trailing slash)
            //
            // This is because the router accepts an absolute URI value of "same
            // as base URI but without trailing slash" as equivalent to "base URI",
            // which in turn is because it's common for servers to return the same page
            // for http://host/vdir as they do for host://host/vdir/ as it's no
            // good to display a blank page in that case.
            if (_hrefAbsolute[_hrefAbsolute.Length - 1] == '/'
                && _hrefAbsolute.StartsWith(currentUriAbsolute, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }
        }

        return false;
    }

    private static bool IsStrictlyPrefixWithSeparator(string value, string prefix)
    {
        var prefixLength = prefix.Length;
        if (value.Length > prefixLength)
        {
            return value.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)
                && (
                    // Only match when there's a separator character either at the end of the
                    // prefix or right after it.
                    // Example: "/abc" is treated as a prefix of "/abc/def" but not "/abcdef"
                    // Example: "/abc/" is treated as a prefix of "/abc/def" but not "/abcdef"
                    prefixLength == 0
                    || !IsUnreservedCharacter(prefix[prefixLength - 1])
                    || !IsUnreservedCharacter(value[prefixLength])
                );
        }
        else
        {
            return false;
        }
    }

    private static bool IsUnreservedCharacter(char c)
    {
        // Checks whether it is an unreserved character according to 
        // https://datatracker.ietf.org/doc/html/rfc3986#section-2.3
        // Those are characters that are allowed in a URI but do not have a reserved
        // purpose (e.g. they do not separate the components of the URI)
        return char.IsLetterOrDigit(c) ||
                c == '-' ||
                c == '.' ||
                c == '_' ||
                c == '~';
    }
}
