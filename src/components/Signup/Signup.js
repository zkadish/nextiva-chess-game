import React from 'react';
import { TextField, Button } from '@nextiva/next-ui';

import './signup.scss';

const Signup = () => (
    <div className="signup">
        <form>
            <h3>Sign up</h3>
            <TextField className="signup__credentials" placeholder={'Username'} />
            <TextField className="signup__credentials" placeholder={'Email'} />
            <TextField className="signup__credentials" placeholder={'Password'} />
            <TextField className="signup__credentials" placeholder={'Confirm password'} />
            <div className="signup__bottom">
                <Button kind='success' className="signup__signup">Sign up</Button>
                <Button kind='close' className="signup__cencel">Cancel</Button>
            </div>
        </form>
    </div>
)

export default Signup;