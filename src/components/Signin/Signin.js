import React from 'react';
import { TextField, Button, Spinner } from '@nextiva/next-ui';
import { connect } from 'react-redux';

import signIn from '../../redux/actions/signin';

import './signin.scss';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChangeEmail = (event, value) => this.setState({ email: value });
    handleChangePassword = (event, value) => this.setState({ password: value });

    render(){
        return (
            <div className="signin">
                <form>
                    <h3>Sing in</h3>
                    <TextField 
                        className="signin__credentials"
                        value={ this.state.email }
                        placeholder={'email'}
                        onChange={this.handleChangeEmail}/>
                    <TextField 
                        className="signin__credentials" 
                        type="password"
                        value={ this.state.password }
                        placeholder={'password'}
                        onChange={this.handleChangePassword}/>
                    <Button 
                        kind='success'
                        type="submit"
                        className="signin__button"
                        disabled={this.props.isLoading}
                        onClick={() => this.props.signIn(this.state)}>
                        Sign in
                    </Button>
                    {this.props.isLoading && <Spinner className="signin__spinner" />}
                    {this.props.loaded && this.props.data && console.log(`Data: ${JSON.stringify(this.props.data)}`) }
                    {this.props.loaded && this.props.error && console.log(`Error: ${this.props.error}`) }
                    { this.props.error && <div className="signin__error">Some error was occurred! </div> }
                    <a href=""><p>Lost you password?</p></a>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.user.loading,
    loaded: state.user.loaded,
    data: state.user.data,
    error: state.user.error
});

const mapDispatchToProps = (dispatch) => ({
    signIn: (payload) => signIn(dispatch, payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);