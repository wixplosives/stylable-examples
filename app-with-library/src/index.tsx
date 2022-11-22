import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

import { ThemeBar, changeTheme } from './theme-selector';

const theme = (localStorage.currentTheme as 'raw') || 'raw';

changeTheme(theme);



createRoot(document.body.appendChild(document.createElement('div'))).render(
    <React.StrictMode>
        <ThemeBar theme={theme} />
        <App />
    </React.StrictMode>
);
