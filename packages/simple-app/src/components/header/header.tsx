import React from 'react';
import ReactDOM from 'react-dom';
import { st, classes } from './header.st.css';
import { UserStatus } from '../user-status/user-status';
import { useContext, useState } from 'react';
import { LoggedInUserContext } from '../../stores/user-store';
import { Menu, MenuProps } from '../menu/menu';
import { Logo } from '../logo/logo';
import { ShoppingCart, ShoppingCartProps } from '../shopping-cart/shopping-cart';
import { MobileMenu } from '../mobile-menu/mobile-menu';

export interface HeaderProps {
    className?: string;
    menuItems: MenuProps['menuItems'];
    shoppingCartItemsCount: ShoppingCartProps['itemsCount'];
}

export const Header = React.memo<HeaderProps>(props => {
    const { className, menuItems, shoppingCartItemsCount } = props;

    const loggedInUser = useContext(LoggedInUserContext);

    const [menuIsShown, setMenuIsShown] = useState(false);

    const showMenu = () => setMenuIsShown(true);
    const hideMenu = () => setMenuIsShown(false);

    return (
        <div className={st(classes.root, className)}>
            <StripeMenu onClick={showMenu} />
            <Logo className={classes.logo} />
            <Menu className={classes.menu} menuItems={menuItems} layout={'horizontal'} />
            <div className={classes.user}>
                <ShoppingCart className={classes.shoppingCart} itemsCount={shoppingCartItemsCount} />
                <UserStatus className={classes.userStatus} userInfo={loggedInUser} />
            </div>
            {menuIsShown &&
                ReactDOM.createPortal(
                    <MobileMenu className={classes.mobileMenu} menuItems={menuItems} onCloseButtonClick={hideMenu} />,
                    document.body
                )}
        </div>
    );
});

function StripeMenu({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
    return (
        <div className={classes.menuButton} onClick={onClick}>
            <div className={classes.menuButtonBar} />
            <div className={classes.menuButtonBar} />
            <div className={classes.menuButtonBar} />
        </div>
    );
}
