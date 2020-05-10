# Stylable Examples

This repo is a collection of use-case examples showing how Stylable can be used in different situations. Working with these examples can show you how Stylable can be used in your own projects.

## What we talk about when we talk about theming
Theming enables taking components or applications and quickly overriding or customizing them to create a new look or style without changing the internals of the component.

By creating even a single theme for your project, you enforce a certain degree of design consistency across your project, and can ensure that various parts of the UI work together well and adhere to the same aesthetic. 

Theming is also about organizing your project in a way that is easy to maintain and less prone to style repetitions. Themes can also ensure that there is a consistent, predictable way of interacting with the project's inner parts.

### Disclaimer

Theming components and applications can be done in many different ways. Some of the important factors to take into consideration include product requirements, runtime environments, supported platforms, available resources.

Theming is not a clearly defined term, but rather, a range of possible solutions offering various trade-offs.  
Generally speaking the more customizable or theme-able you want your project to be, the more wiring and internal dependencies are created. Maintaining such complex styling structures can have a considerable development cost, and should be considered in advance.

## Running the projects
Each project in the `packages` directory is a stand-alone project, with its demo page.

To run the projects locally:

- Clone this repo
- Run `yarn` in the repo root
- Run `yarn start` in the target project directory
- Open `http://localhost:8080/` in your browser 

## Example projects

Here is a list of the example projects included in this repo and a brief highlights description of each one.

### Simple App
The **Simple App** project shows a demo application of a simple e-commerce products page.

#### Example highlights
- A collection of components used together to build an application, with `products-collection-page` as its top level component.
- All components that are required for the application are written specifically for it and are not generic in nature.
- No 3rd-party components are used.
- The project uses CSS vars (custom properties) in its common definitions and throughout all of the components.
- The project includes multiple themes: `Basic`, `Dark` and `Gentle`. Each theme is achieved by overriding the project variables and specifically customizing pieces of UI to get the desired result.

### Components Library
The **Components Library** project demonstrates creating a Stylable component library.

#### Example highlights
- Generic demo components (`Button`, `ImageView`, `Menu` and `Card`) written using a common `project.st.css` file, creating a unified look for the library.
- All components define and wire internal CSS vars to the `project` ones, allowing easy customization of all components, or a specific one through a theme or override.
- The library comes with a base `raw` look, including the minimal CSS required for the components to function, and a `Basic` theme giving them a styled look ready for use.

## To Do!
We intend to incrementally add various use-cases to demonstrate additional topics or problems. We gladly welcome new issues suggesting further patterns or uses.

These are on our list to add:
- Publishing - how to publish various project types for consumption with and without Stylable.
- Namespacing - advanced namespacing solutions for creating public APIs.
- Server-side rendering - how to implement server side rendering using `@stylable/node`.
- Cross mono-repo usage - how to create and consume a component library in different packages within the same mono-repo.
