import React from 'react';
import { Button } from '@nextiva/next-ui';

import './header.scss';

const Header = () => (
    <div className="header">
        <div className="description">Nextiva Chess</div>
        <div className="right">
            <Button>Logout</Button>
        </div>
    </div>
)

export default Header;