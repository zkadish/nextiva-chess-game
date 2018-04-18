import React from 'react';
import { Button } from '@nextiva/next-ui';
import { connect } from 'react-redux';

import logOut from '../../redux/actions/logOut';

import './header.scss';

const Header = (props) => {
    return (
        <div className="header">
            <div className="header__description">Nextiva Chess</div>
            <div className="header__right">
                { props.user && <Button kind="success" onClick={props.logOut}>Logout</Button> }
            </div>
        </div>
    )
}

const mapStateToProps = ( state ) => ({
    user: state.user.data
});

const mapDispatchToProps = ( dispatch ) => ({
    logOut: () => logOut(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);