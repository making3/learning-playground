# Chapter 3: Pseudo-Class and -Element Selectors

-   Discusses many pseudo-class selectors, then pseudo-element selectors

## Pseudo-Class Selectors

Pseudo-class selectors = "phantom classes"

Format: `:<word-or-phrase-here>`

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

### User Action Pseudo-Classes

-   `:hover`
-   `active` = activated by user input (e.g., `<a>` when a user clicks but _hasn't released yet_)
-   `:focus`
-   `:focus-within` = element or descendant is focused
-   `:focus-visible` = user agent determines if the user needs to be informed it's focused
    -   E.g., clicking a button doesn't show focus styles whereas `:focus` does

### UI-State Pseudo-Classes

-   `:enabled`, `:disabled` = `disabled` attr (or set via JavaScript)
-   `:checked` (radios/checkboxes)
-   `:indeterminate` (radios/checkboxes when they have not been checked/unchecked yet)
    -   Must set `.indeterminate = true` in JavaScript
    -   Works on checkboxes, radios, and progressbar
-   `:default`
    -   `<input type="checkbox" checked />`
    -   first `<button type="submit">` within a form
    -   `<select>` and the item with `selected` attr
-   `:autofill` = when browser autofills forms
    -   Caveat: Many user agents default styles with `!important`, preventing these from being overridden
-   `:placeholder-shown`
-   `:valid`, `:invalid` = validity of an input, e.g.:
    -   required attr but no value
    -   min/max attrs but out of range
    -   min/max attrs, in range, but not within "steps" (step attr)
-   `:in-range`, `out-of-range`
-   `:required`, `:optional` = `required` attr on html element (or not)
-   `read-write` = nondisabled, non-read-only, or contenteditable
-   `read-only` = opposite

### Logical Pseudo-Classes

-   `lang(<language>)`
    -   basically matches `[lang|="fr"]
    -   BUT, also matches things like `<html lang="fr">` or HTTP headers returned, whereas attribute selector does not
-   `dir(<dir>)` = style based on `dir` html attr (rtl or ltr)

### Logical Pseudo-Classes

-   `:not(<comma-list-of-selectors>)`
    -   Can chain multiple
    -   Can have multiple selectors (comma-separated)
    -   Can be complex selector
    -   Can be all of the above
-   `:is(<comma-list-of-selectors>)`, `:where(<comma-list-of-selectors>)`
    -   `:is` takes specificity of the most specific selector
    -   `:where` specificity = 0
-   `:defined` = If custom element has been defined yet (`customElements.define(..)`)
-   `:has(<comma-list-of-selectors>)`
    -   Performance can be impacted, e.g., `div:has(.popup)` will constantly check all divs for this class, which can be expensive

## Pseudo-Elements

Inserts fictional elements into the document.

Format: `::<word-or-phrase-here>`

-   `::first-letter` = first character only
    -   Block display elements only
    -   Works for characters with more than one character (i.e., other languages)
-   `::first-line` = first line when text spans multiple lines
    -   Block display elements only
    -   May break up nested elements like `<em>`
-   `::placeholder` = style `placeholder` attr
-   `::file-selector-button` = style the button created from `<input type="button">`
-   `::before`, `::after` = add content before/after an element (`content: "something";` css property)
-   `::selection`
    -   E.g., drag mouse
-   `::target-text` = style text that is within url fragment
    -   `/some/url#:~:text=<text-to-highlight>`
    -   Limited support in Safari anyway
-   `::spelling-error`, `::grammar-error` (limited support in 2023)
-   `::backdrop` = show something under the current layer with the size of the viewport
    -   Doesn't always apply. E.g., `<dialog open` does not show it. Doing `dialog.showModal()` will.
-   `::cue` = styles captions of media basically

## Other Shadow DOM Specifics

-   `host` = select element hosing shadow dom
-   `host(<additional-selector)` = same but with more filtering (e.g., select an attr)
-   `:host-context(<ancestor-selector>)` = use inside shadow dom, select condition outside of shadow dom and style the element within
-   `::slotted(<selector.)` = style slots based on selectors

###

# Examples

-   [Basic Pseudo Classes](./examples/pseudo-classes.html)
-   [Root Class](./examples/root-class.html)
-   [Misc Structural Classes](./examples/structural-classes.html)
-   [Nth Childs](./examples/nth-child.html)
-   [Hyperlinks](./examples/hyperlink-pseudo-classes.html)
-   [Non-hyperlinks](./examples/nonhyperlink-pseudo-classes.html)
-   [User Actions](./examples/user-actions.html)
-   [UI State](./examples/ui-state.html)
-   [Language and Direction](./examples/lang-dir.html)
-   [Logical](./examples/logical.html)
-   [Pseudo Elements](./examples/pseudo-elements.html)
