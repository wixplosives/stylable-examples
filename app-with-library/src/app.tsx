import { Button } from 'component-library/button';
import { Card } from 'component-library/card';
import { ImageView } from 'component-library/image-view';
import { Menu } from 'component-library/menu';
import { ThemeBar } from 'component-library/themes-selector';

import { classes as buttonVariants } from 'component-library/button-variants';
import { classes as formElements } from 'component-library/form-elements';
import { classes as defaultTheme } from 'component-library/themes/default';

import { st, classes as demo } from './app.st.css.js';

const stylableLogo = new URL('./assets/96-logo-OnlySymbol@2x.png', import.meta.url).href;

const menuItems = [
    { title: 'Item A', url: '#' },
    { title: 'Item B', url: '#' },
    { title: 'Item C', url: '#' },
    { title: 'Item D', url: '#' },
];

export function App() {
    return (
        <>
            <ThemeBar
                themes={{
                    raw: [],
                    default: [defaultTheme.root],
                }}
            />

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
                        <ImageView src={stylableLogo} width={300} />
                    </div>
                    <div>
                        <h4>Contain - 300x100</h4>
                        <ImageView src={stylableLogo} resizeMode={'contain'} width={300} height={100} />
                    </div>
                    <div>
                        <h4>Fill - 300x150</h4>
                        <ImageView src={stylableLogo} resizeMode={'fill'} width={300} height={150} />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <h4>Cover - 300x150</h4>
                        <ImageView src={stylableLogo} resizeMode={'cover'} width={300} height={150} />
                    </div>
                </div>
                <h2>Menu</h2>
                <div className={demo.box}>
                    <Menu items={menuItems} layout="horizontal" />
                </div>
                <br />
                <div className={demo.box}>
                    <Menu items={menuItems} layout="vertical" />
                </div>
                <h2>Card</h2>
                <div className={demo.box}>
                    <Card>Hello World</Card>
                </div>
                <br />
                <div className={demo.box}>
                    <Card style={{ width: 300 }}>
                        <h4>Time is ticking</h4>
                        <ImageView src={stylableLogo} />
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
        </>
    );
}
