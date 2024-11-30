# Chapter 2: Selectors

-   Type Selectors = basically element selectors (but also work in XML...without "elements")
-   Grouping
    -   Grouped Selector: Separated by comma - `h1, h2, h3 { .. }`
        -   Universal: Select all in doc - `* { .. }`
            -   Caveat: Can have unintended consequences, though
    -   Grouped Declarations: End with ;`h1 { font-size: 24px; color: red; }`
        -   _Technically_ the last one doesn't need a coma, but recommended (consistency)
-   Class Selectors
    -   Styles
        -   `.class-name`
        -   `.class-name-one.class-name-two` (must have both)
        -   `.class-name-one, .class-name-two` (either)
    -   Don't begin with number (Browsers don't care, CSS validators care)
    -   `*.class-name` and `.class-name` are equivalent
-   ID Selectors
    -   Styles
        -   `#foo { .. }`
    -   One `id` attr per document, although, CSS doesn't care
    -   Don't begin with number (Browsers don't care, CSS validators care)
-   Attribute Selectors
    -   ID/class selectors are essentially attribute selectors but fancy
    -   Four types
        1. Simple
            - `h1[class]` or `img[alt]` or `a[href][title]`
        2. Selection based on Exact Attribute Value
            - `a[href="https://google.com"]` or `a[href="https://google.com"][title="Google"]`
            - The same (attr requires space as it's exact string match):
                - `[class="urgent warning"] {}` === `.urgent.warning {}`
        3. Selection Based on Partial Attribute Values
            - `[foo~="bar"]`: contains "bar" in space-separated list
                - `this contains bar in the list`
                - `this does not even though barred is here`
            - `[foo*="bar"]`: contains substring `bar` (both of the above match)
            - `[foo^="bar"]`: begins with `bar`
            - `[foo$="bar"]`: ends with `bar`
            - `[foo|="bar"]`: starts with `bar-` **or** exactly `bar`
        4. The Case-Insensitivity Selector (and case-sensistive)
            - `[foo="bar" i]`: makes the value match case-insensitive
            - `[foo="bar" s]`: makes the value match case-insensitive (Firefox only)
-   Document Structure
    -   Tree relationships:
        -   parent-child = directly above/below
        -   ancestor-descendant = above/below but at least 2 levels
    -   Combinators
        -   Descendant: ` ` (space)
            -   `h1 em { ... }`: when `em` is _found within_ h1
                -   E.g., `<h1><p>I am <em>italic</em></p></h1>`
            -   Does not care how close each ancestor/descendant are
        -   Child: `>`
            -   `h1 > p { ... }`: when `p` is a direct child of `h1`
                -   E.g., `<h1><p>I am <em>italic</em></p></h1>`
        -   Adjacent-sibling: `+`
            -   `h1 + em { ... }`: when `em` immediately follows `h1`
                -   E.g., sibling - `<h1>foo</h1><em>bar</em>`
        -   General Sibling: `~`
            -   `h1 ~ ol { ... }`: when `ol` follows `h1` within the same parent
                -   E.g., sibling - `<h1>foo</h1><em>bar</em><ol>...</ol>` (ol will be selected)
    -   Combinators can be grouped together (or combined)
