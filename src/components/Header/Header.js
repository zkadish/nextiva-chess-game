import React from 'react';
import { Button } from '@nextiva/next-ui';

import './header.scss';

const Header = () => {
    const logOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('token') ;
    }


    return (
        <div className="header">
            <div className="header__description">Nextiva Chess</div>
            <div className="header__right">
                <Button 
                    kind="success"
                    onClick={logOut}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Header;