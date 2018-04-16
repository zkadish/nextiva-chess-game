import React from 'react';
import { Button } from '@nextiva/next-ui';

import './header.scss';

const Header = () => (
    <div className="header">
        <div className="header__description">Nextiva Chess</div>
        <div className="header__right">
            <Button kind="success">Logout</Button>
        </div>
    </div>
)

export default Header;