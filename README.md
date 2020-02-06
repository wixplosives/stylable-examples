# Stylable examples

This repo serves as a collection of use-case examples of how Stylable can be used in a variety of different situations.

## Running the projects
Each project in the `packages` directory is a stand-alone project, with its demo page.

To run the projects locally:

- Clone this repo
- Run `yarn` in the repo root
- Run `yarn start` in the desired project directory
- Open `http://localhost:8080/` in your browser 

## Example projects

### Simple App
This project shows a simple e-commerce products page demo application.

#### Example highlights
- A collection of components used together to build an application, with `products-collection-page` as its top level component
- All components that are required for the application are written specifically for it and are not generic in nature
- No 3rd-party components are used
- The project uses CSS vars (custom properties) in its common definitions and throughout all of the components
- The project includes multiple themes: `Basic`, `Dark` and `Gentle`. Achieved by overriding the project variables and specifically customizing pieces of UI to the desired result

### Components Library
This projects demonstrates a way of creating a Stylable component library.

#### Example highlights
- Generic demo components (`Button`, `ImageView`, `Menu` and `Card`) written using a common `project.st.css` file, creating a unified look for the library
- All components define and wire internal CSS vars to the `project` ones, allowing easy customization of all components, or a specific one through a theme or override
- The library comes with a base `raw` look, including the minimal CSS required for the components to function, and a `Basic` theme giving them a styled look ready for use 
