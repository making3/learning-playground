# Chapter 1: CSS Fundamentals

-   History
    -   First proposed in 1994
    -   CSS1 in 1996
    -   CSS2 in 1998
    -   CSS3 in 1999 (not explicitly mentioned in the book..?)
-   Stylesheet contents consist of rules

    -   Rules: `<selector> <declaration-block>`
        -   declaration-block: one or more declarations
        -   Declarations: `<property>: <value>`
        -   Vendor prefixing as of this book (2023) is effectively dead (...technically some out there, but not really)
    -   Whitespace is ignored/collapsed by parsers
    -   Comments - Only `/* */` supported, **no "end-of-line" (`// comment`)**
    -   Elements
        -   Two forms:
            -   Replaced - content _replaced_ by something (e.g., `<img>` replaced with an actual...image)
            -   Non-replaced - content as-is (e.g., `<p>`, `<span>`)
        -   Display Roles - block formatting context, inline formatting context
            -   block
                -   Fill its parent's content area / cannot have element at its side
                -   E.g., `<div>`, `<p>`
            -   inline
                -   Don't generate a break
                -   E.g., `<a>`, `<strong>`, `<em>`

-   Ways to _define_ stylesheets
    -   Persistent - `<link rel="stylesheet">`
        -   `rel="stylesheet"` **without a title**
        -   Always used/included regardless of user changing
    -   Preferred - `<link rel="stylesheet" title="Some Title">`
        -   `rel="stylesheet" _with_ a title
        -   Used as the default behavior if the user doesn't switch it
    -   Alternate <`link rel="alternate stylesheet" title="Other">`
        -   `rel="alternate stylesheet" _with_ a title
        -   Used only if user changes it, overriding preferred
        -   Can only use one at a time
-   Apparently, [`HTTP` headers can return stylesheets](https://www.impressivewebs.com/adding-css-to-a-page-via-http-headers/) (Firefox/Opera really only support it?)
-   Inline `style="color: red;" is discouraged by book/authors

# Examples

-   [Alternative Stylesheets](./examples/alternative-stylesheets.html)
