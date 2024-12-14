# Chapter 3: Pseudo-Class and -Element Selectors

-   Discusses many pseudo-class selectors, then pseudo-element selectors

## Pseudo-Class Selectors

Pseudo-class selectors = "phantom classes"

Format: `:<word-here>`

-   Always refer to the element to which they are attached and no other elements
    -   Given: `<div><span id="bob"><p>Text</p></span></div>`
    -   `#bob:first-child` = "first child of another element when the child's id is `#bob`"
        -   Selects the `<span>` tag
    -   `#bob > :first-child` = "first child when the parent element is `#bob`"
        -   Selects the `<p>` tag
-   Chaining order does not matter as it always refers to the element it's attached to
    -   `a:link:hover` === `a:hover:link`

### Structural Pseudo-Classes

-   `:root`
    -   Always `<html>` in HTML, varies in XML
-   `:empty`
    -   Must be truly empty - No spaces, line breaks
        -   Comments don't count (they are effectively removed)
    -   CAVEAT: Matches "empty HTML elements" (`<img>`, `<hr>`, `<br>`, `<input>`)
-   `:only-child`
    -   Only child of a parent element
    -   Only if 1 exists
-   `:only-of-type`
    -   Same as `:only-of-child` but for the anchor element
    -   Only if 1 exists (of the anchor element)
-   `:first-child`, `:last-child`
    -   First (or last) child of a parent element
    -   `:only-child` === `:first-child:last-child`
-   `:first-of-type`, `:last-of-type`
    -   First (or last) child of an anchor element in a parent element
    -   Good ex: `td:first-of-type` would ignore `<th>` tags
    -   `:only-of-type` === `:first-of-type:last-of-type`
-   `:nth-child(<arg>)`, `:nth-last-child(<arg>)`
    -   `arg`:
        -   `<number>` Single child based on the index
            -   "Starts at" 1 as there are no 0th elements
        -   Formula `<An(+-B)>`
            -   `A` = Step
            -   `n` = Current count (1,2,3,4,...), Starts at 0
                -   Keep in mind, no 0th elements
            -   `+B` or `-B` = Start counting at this offset
                -   `+B` = Begin at index `0 + B`
                -   `-B` = Begin at `<last-list-index> - B`
            -   Examples:
                -   `3n+1`:
                    -   n: `[0,3,6,9,12,..]` normally
                    -   `+1` = start at index 1
                    -   so n: `[1,4,7,10,13, ..]`
        -   `even`, `odd` = `2n` (event), `2n+1` (odd)
        -   formula+selector `<An(+-B) of <selector>>`
            -   Same as formula one but `of <some-selector>`
            -   `li:nth-child(-n + 3 of .noted)` = start at `<li>` _with class .noted_ 3, subtract by 1 each time, style all found
                -   **Only considers `li` elements with class `.noted`**
            -   `li.noted:nth-child(-n + 3)` = start at `<li> 3, subtract by 1 each time, style only when `.class`=`.noted`
                -   **Finds all `li` as pseudo-classes only consider the anchor element**

### Location Pseudo-Classes

Based on ephemeral conditions that can't be predicted.

Hyperlink-specific (`<a>` tags with `href` attribute)

-   `:link` - link that has not been visited
    -   Note: properties that do not work with `:visited` will be inherited from `:link` (e.g., font-size `:link` will apply to visited links too, but not color)
-   `:visited` - link that has been visited (opposite of `:link`)
    -   Note: privacy concerns limit styling choices here (can't trick the user to think they've been somewhere before)
    -   Styling `:visited` is apparently part of the W3 accessibility, though.
-   `:any-link` - Any link (regardless of visited or not)
-   `:local-link` - Link within the document (i.e., `#id` selector)
    -   Currently unsupported (Dec 2024)

Nonhyperlink-specific

-   `:target` = element who's `id` attribute equals the URL fragment
-   `:target-within` = element _or a descendant element_ who's `id` attribute equals the URL fragment
    -   Currently unsupported (Dec 2024)
    -   `<div><p id="foo">etc</p></div>` and `div:target-within` will match the div if the url has `/my-url#foo` (foo as the fragment)
-   `:scope` refers to an already-referenced element as a point for selector matching in JavaScript
    -   E.g., `document.querySelectorAll('#output').querySelectorAll(':scope > div')`
    -   Is `:root` by default
    -   Is selector matching `@scope`'s defined scope root (only real use so far in CSS)
        -   `@scope` is not widely supported (Firefox has no support w/o a flag)

# Examples

## Pseudo-Classes

-   [Basic Pseudo Classes](./examples/pseudo-classes.html)
-   [Root Class](./examples/root-class.html)
-   [Misc Structural Classes](./examples/structural-classes.html)
-   [Nth Childs](./examples/nth-child.html)
-   [Hyperlinks](./examples/hyperlink-pseudo-classes.html)
-   [Non-hyperlinks](./examples/nonhyperlink-pseudo-classes.html)
