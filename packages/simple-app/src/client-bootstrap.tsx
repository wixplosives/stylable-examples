import React from 'react';
import ReactDOM from 'react-dom';

import { ProductsCollectionPage } from './components/products-collection-page/products-collection-page';
import { loadFonts } from './setup/load-fonts';
import { demoProducts } from './stores/demo-products';
import { ThemeBar, changeTheme } from './theme-selector';

const breadCrumbs = [
    { title: 'Home', url: '#' },
    { title: 'Watches', url: '#' },
];
const theme = (localStorage.currentTheme as 'basic' | 'dark' | 'gentle') || 'basic';

loadFonts();
changeTheme(theme);

const root = document.createElement('div');
document.body.appendChild(root);

// This is the top level render of our application.
// The "ThemeBar" component is external to the application
// and serves as way to quickly change themes in runtime.
ReactDOM.render(
    <>
        <ThemeBar theme={theme} />
        <ProductsCollectionPage products={demoProducts} breadCrumbs={breadCrumbs} />
    </>,
    root
);
