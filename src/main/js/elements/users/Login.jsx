import React                         from 'react';
import { Button, Input, Modal, Row } from 'react-materialize';
import PropTypes                     from "prop-types";
import TextPropType                  from "../../utils/TextPropType";
import Utils                         from "../../utils/Utils";
import LoginService                  from "../../services/LoginService";

class Login extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onLoginSuccess, "onLoginSuccess");
        Utils.checkRequiredProperty(this.props.loginButtonTrigger, "loginButtonTrigger");
        Utils.checkRequiredProperty(this.props.text, "text");

        this.state = {email: '', password: '', isReadyForLogin: false, errorMessage: ''};

        this.onLogin = this.onLogin.bind(this);
        this.onEmailTextChange = this.onEmailTextChange.bind(this);
        this.onPasswordTextChange = this.onPasswordTextChange.bind(this);
        this.onLoginAndPasswordValidate = this.onLoginAndPasswordValidate.bind(this);
    }

    onLogin() {
        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.password);
        LoginService.login({email: this.state.email, password: this.state.password}, user => {
            console.log("User logged in; UserId: " + user.userId);
            $('.modal').modal('close');
            this.props.onLoginSuccess(user);
        }, error => {
            this.setState({errorMessage: error});
        });
    }

    onEmailTextChange(event, value) {
        if (value) {
            this.setState({email: value}, this.onLoginAndPasswordValidate);
        } else {
            console.warn("Email is empty");
        }
    }

    onPasswordTextChange(event, value) {
        if (value) {
            this.setState({password: value}, this.onLoginAndPasswordValidate);
        } else {
            console.warn("Password is empty");
        }
    }

    onLoginAndPasswordValidate() {
        if (this.state.email && this.state.password && Utils.isValidEmail(this.state.email)) {
            this.setState({isReadyForLogin: true});
        } else {
            this.setState({isReadyForLogin: false});
        }
    }

    render() {
        return <Modal header={ "Login" } trigger={ this.props.loginButtonTrigger } actions={
            <div>
                <Button waves="light" className="green darken-2" disabled={ !this.state.isReadyForLogin } onClick={ this.onLogin }>{ "Login" }</Button>
                <Button flat modal="close" waves="light">{ "Cancel" }</Button>
            </div>
        }>
            <Row><Input required s={ 6 } label={ "Email" } onChange={ this.onEmailTextChange } validate type="email"/></Row>
            <Row><Input required s={ 6 } label={ "Password" } onChange={ this.onPasswordTextChange } type="password"/></Row>
            <Row><span className="red-text"> { this.state.errorMessage } </span></Row>
        </Modal>
    }
}

Login.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    loginButtonTrigger: PropTypes.node.isRequired,
    onLoginSuccess: PropTypes.func.isRequired
};
export default Login;
