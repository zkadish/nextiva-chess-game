import React from 'react';
import { TextField, Button } from '@nextiva/next-ui';

import './signin.scss';

const Signin = () => (
    <div className="signin">
        <form>
            <h3>Sing in</h3>
            <TextField className="signin__credentials" placeholder={'username'}/>
            <TextField className="signin__credentials" placeholder={'password'}/>
            <Button kind='success' className="signin__button">Sign in</Button>
            <a href=""><p>Lost you password?</p></a>
        </form>
    </div>
)

export default Signin;