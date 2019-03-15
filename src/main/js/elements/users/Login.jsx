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
            console.log("Login.onLoginSuccess: " + user ? JSON.stringify(user) : null);
            $('#loginModal').modal('close');
            this.props.onLoginSuccess(user);
        }, error => {
            this.setState({errorMessage: error});
        });
    }

    onEmailTextChange(event, value) {
        if (value) {
            this.setState({email: value}, this.onLoginAndPasswordValidate);
        } else {
            this.setState({email: value}, this.onLoginAndPasswordValidate);
            console.warn("Email is empty");
        }
    }

    onPasswordTextChange(event, value) {
        if (value) {
            this.setState({password: value}, this.onLoginAndPasswordValidate);
        } else {
            this.setState({password: value}, this.onLoginAndPasswordValidate);
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
        return <Modal id="loginModal" header={ this.props.text.admin.headerLogin } trigger={ this.props.loginButtonTrigger } actions={
            <div>
                <Button waves="light" className="green darken-2" disabled={ !this.state.isReadyForLogin } onClick={ this.onLogin }>{ this.props.text.admin.buttonLogin }</Button>
                <Button flat modal="close" waves="light">{ this.props.text.admin.buttonCancel }</Button>
            </div>
        }>
            <Row><Input required s={ 6 } label={ this.props.text.admin.fieldEmail } onChange={ this.onEmailTextChange } validate type="email"/></Row>
            <Row><Input required s={ 6 } label={ this.props.text.admin.fieldPassword } onChange={ this.onPasswordTextChange } type="password"/></Row>
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
