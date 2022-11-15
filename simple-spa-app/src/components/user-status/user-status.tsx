import React from 'react';
import type { UserInfo } from '../../stores/user-store';
import { st, classes } from './user-status.st.css';

export interface UserStatusProps {
    className?: string;
    userInfo?: UserInfo | null;
}

export const UserStatus = React.memo<UserStatusProps>(function UserStatus(props) {
    const { className, userInfo } = props;

    return (
        <a href={'#'} className={st(classes.root, className)}>
            {userInfo ? userInfo.fullName : 'Sign In'}
        </a>
    );
});
