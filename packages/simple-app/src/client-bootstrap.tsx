import ReactDOM from 'react-dom';
import React from 'react';

import { ProductsCollectionPage } from './components/products-collection-page/products-collection-page';
import { loadFonts } from './setup/load-fonts';
import { demoProducts } from './stores/demo-products';
import { ThemeBar, changeTheme } from './theme-selector';

const breadCrumbs = [
    { title: 'Home', url: '#' },
    { title: 'Watches', url: '#' }
];
const theme = localStorage.currentTheme || 'basic';

loadFonts();
changeTheme(theme);

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
    <>
        <ThemeBar theme={theme} />
        <ProductsCollectionPage products={demoProducts} breadCrumbs={breadCrumbs} />
    </>,
    root
);
