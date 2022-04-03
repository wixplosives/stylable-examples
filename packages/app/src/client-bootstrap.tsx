import React from 'react';
import { createRoot } from 'react-dom/client';

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

// This is the top level render of our application.
// The "ThemeBar" component is external to the application
// and serves as way to quickly change themes in runtime.
createRoot(document.body.appendChild(document.createElement('div'))).render(
    <React.StrictMode>
        <ThemeBar theme={theme} />
        <ProductsCollectionPage products={demoProducts} breadCrumbs={breadCrumbs} />
    </React.StrictMode>
);
