# Simple Application - Example

This project shows a simple e-commerce products page demo application.

## General description
- A collection of components used together to build an application, with `products-collection-page` as its top level component
- All components that are required for the application are written specifically for it and are not generic in nature
- No 3rd-party components are used
- The project uses CSS vars (custom properties) in its common definitions and throughout most components
- The project includes multiple themes: `Basic`, `Dark` and `Gentle`. Created by overriding the project variables and specifically customizing pieces of UI to the desired result

### Project structure

```
project-root
 |
 └── src
    ├── client-bootstrap.tsx     - application rendering root
    ├── theme-selector.tsx       - theme swapper component (for the demo)
    |
    ├── common
    |  ├── common-classes.st.css - utility classes 
    |  └── project.st.css        - css reset and base variables
    |
    ├── components               - contains all application components
    |
    └── themes
       ├── basic.st.css          - theme using mixins
       ├── dark.st.css           - theme with variable overrides
       └── gentle.st.css         - theme with inner parts customization
```


## Technical highlights

### Defining common variables
This project makes use of CSS variables (custom properties) to define a high level design system interface for the entire application. This can be found in the `./src/common/project.st.css` file.

These variables are grouped together according to their semantics, for example, colors, font-related, borders, spacing and so on.

```css
.root {
    /* DEFAULT COLORS */
    --color-bg: #fff;
    --color-primary: #fff;
    --color-primary-contrast: rgba(0,0,0,1);
    --overlay-color-1: rgba(0,0,0,0.07);
    --overlay-color-8: rgba(0,0,0,0.8);

    /* DEFAULT SIZES */
    --unit-m: 7px;
    --unit-l: 10px;
    
    /* ... */
}
```

Each component in the repo can import these variables and apply them to their relevant parts of UI.

### Applying minimal style / decoration
Despite being an application with custom-built components, those components still strive to include only the minimal styling required in order to achieve their base functionality.

This sort of minimal styling can include critical variable linking (making sure text is visible), layout definitions, possible states and so on. This concept is a fluid definition and would change from component to component and project to project. As more definitions are included in the base styling it requires more overrides to theme and customize externally.

For example we can look at `./src/components/stars-rating/stars-rating.st.css` stylesheet and see states and critical coloring being applied.

```css
.root {}

.star {
    -st-states: isHighlighted;
    color: var(--color-primary-contrast);
    padding: 1px;
}

/* ... */
```

### Using a component variant
Variants are a way of defining additional styles for a component to be used under different product conditions. 

A `Button` component can be used as a `cancelButton`, `okButton`, `optionalButton` and so on according to how it is used in the application while still maintaining a single place to edit their styles.

It can also be a way to create a specific design for a component to fit a theme or purpose, as is done in this project. Looking at the `ProductItem` component and the variant stylesheet `./src/components/product-item/variants/product-item-basic.st.css` we can see a full design being applied to the entire component. 

```css
.basicProductItem {
    -st-extends: ProductItem;
    font-family: var(--font-family-secondary);
}

.basicProductItem::productImage {
    transition: all 0.2s;
}

.basicProductItem::productImage:hover {
    transform: scale(1.1);
}

/* ... */
```

This design is then applied in the `./src/themes/basic/basic.st.css` theme as a mixin for the `ProductItem` component. For example:

```css
:import {
    -st-from: "../components/product-item/product-item.st.css";
    -st-default: ProductItem;
}

:import {
    -st-from: "../components/product-item/variants/product-item-basic.st.css";
    -st-named: basicProductItem;
}

@st-scope .root {
    ProductItem {
        -st-mixin: basicProductItem;
    }

    /* ... */
}
```

### Creating an application theme
In this project we've chosen to show three similar ways of creating a theme for the application, but with a slight difference in each one.

- `basic.st.css` - A simple theme which relies heavily on the `project.st.css` default design, extending it for specific components by using variant mixins.

```css
@st-scope .root {
    ProductItem {
        -st-mixin: basic;
    }

    /* ... */
}
```

- `dark.st.css` - In this case, the only change we are making is to swapping some of the common variables defined in the `project.st.css` stylesheet. By changing colors, sizing units, and typography related values we create a custom new look for our dark theme.

```css
.root {
    --color-bg: rgb(19, 23, 29);
    --color-primary: rgb(9, 7, 24);
    --color-primary-contrast: rgba(196, 187, 184, 1);
    --overlay-color-1: rgba(0, 0, 0, 0.07);
    --overlay-color-8: rgba(0, 0, 0, 0.8);

    --unit-l: 10px;

    /* ... */
}
```

- `gentle.st.css` - Here we modify the common variables much like the example above, but due to the color pallette chosen, additional fine-tunings were required to make it achieve the required design.

This is done by using selectors and their pseudo-elements to target the component part that requires styling.

```css
:vars {
    brownish: rgb(70, 57, 57);
}

.root {
    --color-bg: value(brownish);
    --color-primary: rgb(255, 255, 255);
    --color-primary-contrast: rgb(0, 0, 0);
    --overlay-color-1: rgba(0, 0, 0, 0.07);
    --overlay-color-8: rgba(0, 0, 0, 0.8);
}

@st-scope .root {
    ProductPage::pageBody {
        --color-primary-contrast: rgb(255, 255, 255);
    }

    ProductPage::productList::productItem::bannerNew {
        --color-primary-contrast: value(brownish);
    }

    ProductPage::productList::productItem::addToCartButton:hover {
        color: value(brownish);
    }

    /* ... */
}
```

### CSS reset
Like many frontend projects we would like to perform a [CSS reset](https://meyerweb.com/eric/tools/css/reset/) to define the default look of native elements throughout our application.

In the case of this project, we are applying our CSS reset through the same `projects.st.css` mentioned above.

```css
/* 
    General purpose CSS reset
 */
:global(html), :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:global(*), :global(*:before), :global(*:after) {
  box-sizing: inherit;
}

/* ... */
```

### Utility classes
These are general purpose classes that can be used through your application to standardize behavior and reduce code repetition.

In this project, these classes are defined in `./src/common/common-classes.st.css`. For example:

```css
.resetAnchor {
    text-decoration: none;
    color: inherit;
}

/* ... */
```