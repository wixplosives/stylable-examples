import React from 'react';
import { UserInfo } from '../../stores/user-store';
import { CommonClasses } from '../../common/common-classes';
import { st, classes } from './user-status.st.css';

export interface UserStatusProps {
    className?: string;
    userInfo?: UserInfo | null;
}

export const UserStatus = React.memo<UserStatusProps>(props => {
    const { className, userInfo } = props;

    return (
        <a href={'#'} className={st(classes.root, className, CommonClasses.noUserSelect)}>
            {userInfo ? userInfo.fullName : 'Sign In'}
        </a>
    );
});
