import ReactDOM from 'react-dom';
import React from 'react';

import { ThemeBar, changeTheme } from './theme-selector';
import { st, classes as demo } from './demo.st.css';

// import { classes as project } from './common/project.st.css';

import { Card } from './components/card/card';
import { Button } from './components/button/button';
import { classes as buttonVariants } from './components/button/variants.st.css';
import { ImageView } from './components/image-view/image-view';
import { Menu } from './components/menu/menu';

const theme = localStorage.currentTheme || 'basic';

changeTheme(theme);

const root = document.createElement('div');
document.body.appendChild(root);

function ComponentsPlayground() {
    return (
        <div className={demo.root}>
            <h1>Components Demo</h1>
            <h2>Button</h2>
            <h3>Default button</h3>
            <div className={demo.box}>
                <Button text="Click Me" />
            </div>

            <h3>States</h3>
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
                    <ImageView src={'../assets/compass.jpg'} width={300} />
                </div>
                <div>
                    <h4>Contain</h4>
                    <ImageView src={'../assets/compass.jpg'} resizeMode={'contain'} width={300} height={100} />
                </div>
                <div>
                    <h4>Fill</h4>
                    <ImageView src={'../assets/compass.jpg'} resizeMode={'fill'} width={300} height={150} />
                </div>
            </div>
            <h2>Menu</h2>
            <div className={demo.box}>
                <Menu
                    menuItems={[
                        { title: 'Item A', url: '#' },
                        { title: 'Item B', url: '#' },
                        { title: 'Item C', url: '#' },
                        { title: 'Item D', url: '#' }
                    ]}
                    layout="horizontal"
                />
            </div>
            <br />
            <div className={demo.box}>
                <Menu
                    menuItems={[
                        { title: 'Item A', url: '#' },
                        { title: 'Item B', url: '#' },
                        { title: 'Item C', url: '#' },
                        { title: 'Item D', url: '#' }
                    ]}
                    layout="vertical"
                />
            </div>
            <h2>Card</h2>
            <div className={demo.box}>
                <Card>Hello World</Card>
            </div>
            <h2>Typography</h2>
            <h1>Heading</h1>
            <h2>Heading</h2>
            <h3>Heading</h3>
            <h4>Heading</h4>
            <h5>Heading</h5>
            <h6>Heading</h6>
            <p>Paragraph</p>
        </div>
    );
}

ReactDOM.render(
    <>
        <ThemeBar theme={theme} />
        <ComponentsPlayground />
    </>,
    root
);
