import { st, classes } from './mobile-menu.st.css';
import React, { useContext } from 'react';
import { Menu, MenuProps } from '../menu/menu';
import { Button } from '../button/button';
import { UserStatus } from '../user-status/user-status';
import { LoggedInUserContext } from '../../stores/user-store';

export interface MobileMenuProps {
    menuItems: MenuProps['menuItems'];
    onCloseButtonClick?: () => void;
    className?: string;
}

const xIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <g fillRule="evenodd">
            <path d="M30.607 10.808l-19.8 19.799-1.414-1.415 19.8-19.799z" />
            <path d="M30.607 29.192l-1.415 1.415-19.799-19.8 1.415-1.414z" />
        </g>
    </svg>
);

export const MobileMenu = React.memo<MobileMenuProps>(props => {
    const { className, menuItems, onCloseButtonClick } = props;

    const loggedInUser = useContext(LoggedInUserContext);

    return (
        <div className={st(classes.root, className)}>
            <div className={classes.body}>
                <Menu className={classes.appMenu} menuItems={menuItems} layout={'vertical'} />
                <div className={classes.separator} />
                <UserStatus className={classes.userStatus} userInfo={loggedInUser} />
            </div>
            <Button className={classes.closeButton} onClick={onCloseButtonClick} icon={xIcon} />
        </div>
    );
});
