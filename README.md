# Introduction to theming

- theming is a range
  - theme complexity / granularity
  - theme scope
- single vs. multiple components
  > modern browsers

## Purpose of a theme

- Code organization
- reusability
- multiple looks
- visual consistency / visual constraints

### Theming in css

- specificity override
- vars override/reuse
  - static
  - dynamic

## Example theme setups

### CSS implementation

- very easy to start

- no special treatments for components
- hard to scale

```css
/* style.css */

/* css reset */
body {
  margin: 0;
}

/* defaults */
body {
  --color-primary: white;
  --color-primary-contrast: black;
  --border-primary: 1px solid var(--color-primary-contrast);
  background: var(--color-primary);
}

/* design */
.button {
  border: var(--border-primary);
  color: var(--color-primary-contrast);
  background: var(--color-primary);
}

.link {
  color: var(--color-primary-contrast);
}
```

```css
/* dark-theme.css */
.dark-theme {
  --color-primary: black;
  --color-primary-contrast: white;
}
```

```html
<!-- index.html -->
<head>
  <link src="style.css" />
  <link src="theme.css" />
</head>
<body class="dark-theme">
  <button class="button">Click Me</button>
  <a class="link" href="#home">Home</a>
</body>
```

## Theming with Stylable

### App by example
#### disclaimer
* not presenting theming ui design best practices
* demo with simple implementations
* demo with simple styles (only colors, not fonts, sizes, etc)
#### Simple app

- Only internal components.
- Not generic.
- Written for a specific purpose.
- Component written with full default style


```css
/* project.st.css */
.root {
  --color-primary: white;
  --color-primary-contrast: black;
  --border-primary-contrast: 1px solid var(--color-primary-contrast);
}
```

```css
/* button.st.css */
@st-import [
    --color-primary,
    --color-primary-contrast,
    --border-primary-contrast
] from "../project.st.css";

.root {
  border: var(--border-primary-contrast);
  background: var(--color-primary);
}
.text {
  color: var(--color-primary-contrast);
}
```

```tsx
/* button.jsx */
import { st, classes } from "./button.st.css";
export const Button = ({ text, className }) => (
  <button className={st(classes.root, className)}>
    <span className={classes.text}>{text}</span>
  </button>
);
```

```css
/* link.st.css */
@st-import [ --color-primary-contrast ] from "../project.st.css";

.root {
  color: var(--color-primary-contrast);
}
```

```tsx
/* link.jsx */
import { st, classes } from "./link.st.css";
export const Link = ({ href, text, className }) => (
  <a className={st(classes.root, className)} href={href}>
    {text}
  </a>
);
```

```tsx
/* app.jsx */
import { Button } from "./components/button";
import { Link } from "./components/link";

ReactDOM.render(
    <div>
       <Button text="Click Me"/>
       <Link href="#Home" text="Home"/>
    <div>,
    document.body
)
```

##### Adding a dark theme

```css
/* dark-theme.st.css */
@st-import [ 
  --color-primary,
  --color-primary-contrast
] from "../project.st.css";

.root {
  --color-primary: black;
  --color-primary-contrast: white;
}
```

```tsx
/* app.jsx */
import { Button } from "./components/button";
import { Link } from "./components/link";
import { classes as darkTheme } from "./themes/dark";

document.body.classList.add(darkTheme.root);

ReactDOM.render(
    <div>
       <Button text="Click Me"/>
       <Link href="#Home" text="Home"/>
    <div>,
    document.body
)
```

##### Organizing the app

- extract commons
  - vars
  - variants
  - utils

#### App with secondary theme (dark)

### Component library

##### Expose a public API

Q:

index in themes?
variants like xs xl...
publishing and consumption

Todo:

- es6 import optional (pr with more work needed).
- multiple compose (pr with more work needed).
- fix optimize variants (pr with more work needed).
