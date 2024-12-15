# Chapter 4: Specificity, Inheritance, and the Cascade

-   Inheritance = (some) properties passed to descendants
-   Specificity = determine which declaration to apply
-   Cascade = Inheritance+Specificity+Origin+others

## Specificity

Three weight categories, compared left-to-right: 0,0,0

1,0,0 always beats 0,500,500

### Category Values:

-   For each ID => 1,0,0
-   For each class attr value, attr, and pseudo-class => 0,1,0
-   For each element and pseudo-element => 0,0,1
-   Combinators do not add weight
-   Universal selectors `*` and `:where(<any-selector-here>)` add 0,0,0
    -   Important to note 0,0,0 is still a weight
-   `:is`, `:not`, and `:has` use the higher specificity _in the list_ of selectors, ignoring if the higher specificity selector is actually on the element
    -   `<p>` and `:is(p, #foo.bar.hello)` = 1,2,0

### Declarations and Specificity

-   Specificity is conferred on all associated declarations
-   `h1 { color: silver; background: black }` equals:
    -   `h1 { color: silver };` = 0,0,1
    -   `h1 { background: black };` = 0,0,1

### Other Notes

-   ID selectors !== attr with id
    -   `#pencil` = 1,0,0
    -   [id="pencil"] = 0,1,0
-   `!importance` _does not add to specificity_
    -   "normal" weights are grouped, then compared
    -   "important" weights are grouped, then compared
    -   important > normal comparison

## Inheritance

Descendants only inherit with the exception of a _few_ properties defined on `<body>` that are not defined on `<html>` (e.g., background, overflow)

-   Many properties are not inherited (e.g., border and most box-model properties)
-   Inherited values have **no** specificity.
    -   This is different than 0,0,0

## The Cascade

_Cascading Style Sheets_

### Rules

1. Find all rules containing selector that matches a given element.
2. Sort decls by _explicit weight_ (normal or important).
3. Sort decls by _origin_.
    - author > reader > user agent (normal)
    - user agent > reader > author (important)
4. Sort decls by _encapsulation context_ (e.g., shadow dom).
    - Allows encapsulated styles to override inherited styles from outside
5. Sort decls by if they are _element attached_.
    - `style` = element attached
6. Sort decls by _cascade layer_.
    - later the layer appears = higher precedence (normal weight)
    - no layer = implicit (default) = highest precedence (normal weight)
    - order reversed with important weight
7. Sort decls by _specificity_.
8. Sort decls by _order of appearance_.
    - imported stylesheets = before all styles in the sheet itself

### Importance & Origin

Precedence order:

1. Transition decls
2. User Agent with important weight
3. Reader with important weight
4. Author with important weight
5. Animation decls
6. Author with normal weight
7. User Agent with normal weight
8. Reader with normal weight

Ex:

-   Normal weights (author wins)
    -   `p { color: black; }` (author)
    -   `p { color: black; }` (reader)
-   Important weights (reader wins)
    -   `p { color: black !important; }` (author)
    -   `p { color: black !important; }` (reader)

### Cascade Layer

Introduced in 2021.

-   Basically `@layer` at-rule.
-   Order of appearance (reverse if important weight)
-   Implicit = no `@layer` defined and highest precedence
-   Layers can be defined with no rules, then added to later
    -   `@layer foo, bar;` defines the layers foo and bar, in that order.
    -   `@layer bar { ... }` then `@layer foo { ... }` doesn't redefine the order.
-   `@layer` can be unnamed
    -   Unnamed !== implicit (default)
-   [Layers can be nested](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers#overview_of_nested_cascade_layers)
-   Importing another file with layers becomes nested
    `

Ex:

-   Explicit layers
    -   `@layer site { p { color: red; } }`
    -   `@layer page { p { color: blue; } }` wins (last)
-   Implicit + explicit
    -   `p { color: teal; }` wins (implicit = highest precedence)
    -   `@layer site { p { color: red; } }`
    -   `@layer page { p { color: blue; } }`
-   Implicit + explicit but unnamed
    -   `p { color: teal; }` wins (implicit = highest precedence; unnamed !== implicit)
    -   `@layer { p { color: red; } }`
    -   `@layer { p { color: blue; } }`
-   Redefine explicit layer order

    -   `@layer page, site;`
    -   `@layer site { p { color: red; } }` wins (site is last in the definition)
    -   `@layer page { p { color: blue; } }`

Another good read: [Cascade Layers Guide | CSS Tricks](/css-cascade-layers/#test-your-knowledge-which-style-wins)

# Examples

-   [Specificity and Inheritance](./examples//specificity-inheritance.html)
-   Layers:
    -   [Basic](./examples/layers/basic.html)
    -   [Define Order](./examples/layers/define-order.html)
    -   [Import No Layers](./examples/layers/import-no-layers.html)
    -   [Import No Layers As Layer](./examples/layers/import-no-layers-as-layer.html)
    -   [Import No Layers as Layer and Define Order](./examples/layers/import-no-layers-as-layer-define-order.html)
    -   [Import With Layer](./examples/layers/import-with-layer.html)
    -   [Import With Layer and Define Order](./examples/layers/import-with-layer-define-order.html)
