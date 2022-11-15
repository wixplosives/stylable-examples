import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeBar, changeTheme } from './theme-selector';
import { st, classes as demo } from './demo.st.css';

import { Card } from './components/card/card';
import { Button } from './components/button/button';
import { ImageView } from './components/image-view/image-view';
import { Menu } from './components/menu/menu';
import { classes as buttonVariants } from './components/button/variants.st.css';

// native form elements themed variants
import { classes as formElements } from './components/form-elements/form-element.st.css';

const theme = (localStorage.currentTheme as 'basic' | 'raw') || 'basic';

import compassUrl from '../assets/compass.jpg';

changeTheme(theme);

const menuItems = [
    { title: 'Item A', url: '#' },
    { title: 'Item B', url: '#' },
    { title: 'Item C', url: '#' },
    { title: 'Item D', url: '#' },
];

function ComponentsPlayground() {
    return (
        <div className={demo.root}>
            <h1>Components Demo</h1>
            <h2>Button</h2>
            <h4>Default</h4>
            <div className={demo.box}>
                <Button text="Click Me" />
            </div>
            <h4>Disabled</h4>
            <div className={demo.box}>
                <Button text="Click Me" disabled />
            </div>

            <h3>Variants</h3>
            <h4>Cancel Button</h4>
            <div className={demo.box}>
                <Button text="Click Me" className={buttonVariants.cancelButton} />
            </div>
            <h4>Ok Button</h4>
            <div className={demo.box}>
                <Button text="Click Me" className={buttonVariants.okButton} />
            </div>
            <h2>ImageView</h2>
            <div className={st(demo.box, demo.row)}>
                <div>
                    <h4>Default</h4>
                    <ImageView src={compassUrl} width={300} />
                </div>
                <div>
                    <h4>Contain - 300x100</h4>
                    <ImageView src={compassUrl} resizeMode={'contain'} width={300} height={100} />
                </div>
                <div>
                    <h4>Fill - 300x150</h4>
                    <ImageView src={compassUrl} resizeMode={'fill'} width={300} height={150} />
                </div>
                <div style={{ marginLeft: '20px' }}>
                    <h4>Cover - 300x150</h4>
                    <ImageView src={compassUrl} resizeMode={'cover'} width={300} height={150} />
                </div>
            </div>
            <h2>Menu</h2>
            <div className={demo.box}>
                <Menu menuItems={menuItems} layout="horizontal" />
            </div>
            <br />
            <div className={demo.box}>
                <Menu menuItems={menuItems} layout="vertical" />
            </div>
            <h2>Card</h2>
            <div className={demo.box}>
                <Card>Hello World</Card>
            </div>
            <br />
            <div className={demo.box}>
                <Card style={{ width: 300 }}>
                    <h4>Time is ticking</h4>
                    <ImageView src={compassUrl} />
                    <p>There is no way we can find more time</p>
                </Card>
            </div>

            <h2>Form Elements</h2>
            <input type="checkbox" className={formElements.checkbox} />
            <input type="checkbox" className={formElements.checkbox} disabled />
            <input type="radio" className={formElements.radio} name="radio" />
            <input type="radio" className={formElements.radio} name="radio" />
            <input type="checkbox" className={formElements.toggle} />
            <input type="checkbox" className={formElements.toggle} disabled />

            <h2>Typography</h2>
            <h1>H1 Heading</h1>
            <h2>H2 Heading</h2>
            <h3>H3 Heading</h3>
            <h4>H4 Heading</h4>
            <h5>H5 Heading</h5>
            <h6>H6 Heading</h6>
            <p>Paragraph</p>
        </div>
    );
}

createRoot(document.body.appendChild(document.createElement('div'))).render(
    <React.StrictMode>
        <ThemeBar theme={theme} />
        <ComponentsPlayground />
    </React.StrictMode>
);
