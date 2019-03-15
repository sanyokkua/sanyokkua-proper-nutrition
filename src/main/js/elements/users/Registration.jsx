import React                              from 'react';
import { Button, Col, Input, Modal, Row } from 'react-materialize';
import PropTypes                          from "prop-types";
import TextPropType                       from "../../utils/TextPropType";
import GenderSelect                       from "./helpers/GenderSelect";
import GenderService                      from "../../services/GenderService";
import Utils                              from "../../utils/Utils";
import UserService                        from "../../services/UserService";
import User                               from "../../pojos/User";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.Field = function (value, success, error, isValid) {
            this.value = value;
            this.success = success;
            this.error = error;
            this.isValid = isValid;
        };
        this.state = {
            email: new this.Field("", null, false),
            password: new this.Field("", null, false),
            confirm: new this.Field("", null, false),
            age: new this.Field(null, null, false),
            weight: new this.Field(null, null, false),
            height: new this.Field(null, null, false),
            gender: new this.Field(null, null, false),
            isReady: false,
            registrationError: null,
            genderList: []
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onHeightChange = this.onHeightChange.bind(this);
        this.onWeightChange = this.onWeightChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkForm = this.checkForm.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.validatePasswords = this.validatePasswords.bind(this);
    }

    componentDidMount() {
        GenderService.getGenders(data => {
            this.setState({genderList: data.content});
        }, () => {
            console.warn("Problem with loading gender list");
        });
    }

    onEmailChange(event, value) {
        let isValid = Utils.isValidEmail(value);
        if (isValid) {
            UserService.emailIsInUse(value, (isInUse) => {
                isValid &= !isInUse;
                const success = isValid ? this.props.text.userProfile.validationSuccessEmail : null;
                const error = isValid ? null : this.props.text.userProfile.validationErrorEmailExists;
                let email = new this.Field(value, success, error, isValid);
                this.setState({email: email}, this.checkForm);
            }, () => {
                isValid = false;
                const success = isValid ? this.props.text.userProfile.validationSuccessEmail : null;
                const error = isValid ? null : this.props.text.userProfile.validationErrorEmailExists;
                let email = new this.Field(value, success, error, isValid);
                this.setState({email: email}, this.checkForm);
            });
        } else {
            const success = isValid ? this.props.text.userProfile.validationSuccessEmail : null;
            const error = isValid ? null : this.props.text.userProfile.validationErrorEmail;
            let email = new this.Field(value, success, error, isValid);
            this.setState({email: email}, this.checkForm);
        }
    }

    onChange(field, value, successText, errorText, validateFunc, callBack) {
        const isValid = validateFunc(value);
        const success = isValid ? successText : null;
        const error = isValid ? null : errorText;
        let valueField = new this.Field(value, success, error, isValid);
        let currentState = this.state;
        currentState[field] = valueField;
        this.setState(currentState, () => this.checkForm(callBack));
    }

    checkForm(callBack) {
        let isValid = true;
        [
            this.state.email,
            this.state.password,
            this.state.confirm,
            this.state.age,
            this.state.weight,
            this.state.height,
            this.state.gender
        ].forEach(field => {
            isValid &= field.isValid;
        });
        this.setState({isReady: isValid}, () => {
            if (callBack) {
                callBack();
            }
        });
    }

    onAgeChange(event, value) {
        this.onChange("age", value, this.props.text.userProfile.validationSuccessAge, this.props.text.userProfile.validationErrorAge, Utils.isValidNumber);
    }

    onHeightChange(event, value) {
        this.onChange("height", value, this.props.text.userProfile.validationSuccessHeight, this.props.text.userProfile.validationErrorHeight, Utils.isValidNumber);
    }

    onWeightChange(event, value) {
        this.onChange("weight", value, this.props.text.userProfile.validationSuccessWeight, this.props.text.userProfile.validationErrorWeight, Utils.isValidNumber);
    }

    onGenderChange(value) {
        this.onChange("gender", value, "Ok", "Problem", Utils.isValidText);
    }

    onPasswordChange(event, value) {
        this.onChange("password", value, this.props.text.userProfile.validationSuccessPassword, this.props.text.userProfile.validationErrorPassword, Utils.isValidPassword, this.validatePasswords);
    }

    onPasswordConfirmChange(event, value) {
        this.onChange("confirm", value, this.props.text.userProfile.validationSuccessPasswordConfirm, this.props.text.userProfile.validationErrorPasswordConfirm, Utils.isValidPassword, this.validatePasswords);
    }

    validatePasswords() {
        let pass = this.state.password;
        let confirm = this.state.confirm;
        if (pass.isValid && confirm.isValid) {
            if (pass.value !== confirm.value) {
                const success = null;
                const error = this.props.text.userProfile.validationErrorPasswordAndConfirmDiff;
                let password = new this.Field(pass.value, success, error, false);
                let confirm = new this.Field(pass.value, success, error, false);
                this.setState({password: password, confirm: confirm}, this.checkForm);
            } else {
                const error = null;
                let password = new this.Field(pass.value, pass.success, error, true);
                let confirm = new this.Field(pass.value, pass.success, error, true);
                this.setState({password: password, confirm: confirm}, this.checkForm);
            }
        }
    }

    onRegisterClick() {
        console.log("onRegisterClick");
        let email = this.state.email.value;
        let password = this.state.password.value;
        let age = this.state.age.value;
        let weight = this.state.weight.value;
        let height = this.state.height.value;
        let gender = this.state.gender.value;
        let user = new User(null, email, password, age, height, weight, gender, null);
        UserService.register(user, registeredUser => {
            console.info("Registration.onLoginSuccess: Registered user: " + user ? JSON.stringify(user) : null);
            $('#regModal').modal('close');
            this.props.onLoginSuccess(registeredUser);
        }, error => {
            console.warn("Problem with registration");
            this.setState({registrationError: error + ""});
        });
    }

    render() {
        return <Modal id='regModal' header={ this.props.text.admin.headerRegistration } trigger={ this.props.loginButtonTrigger } actions={
            <div>
                <Button waves="light" className="green darken-2" disabled={ !this.state.isReady } onClick={ this.onRegisterClick }>{ this.props.text.admin.buttonRegister }</Button>
                <Button flat modal="close" waves="light">{ this.props.text.admin.buttonCancel }</Button>
            </div>
        }>
            <div>
                <Row>
                    <Col s={ 12 }>
                        <Row>
                            <div>
                                <Input required validate type="email"
                                       label={ this.props.text.userProfile.inputEmail }
                                       success={ this.state.email.success }
                                       onChange={ this.onEmailChange }
                                />
                            </div>
                        </Row>
                        <Row>
                            <span className="red-text"> { this.state.email.error } </span>
                        </Row>
                    </Col>
                    <Col s={ 6 }>
                        <div>
                            <Input required validate type="password" minLength="6" maxLength="16"
                                   label={ this.props.text.userProfile.inputPassword }
                                   success={ this.state.password.success }
                                   onChange={ this.onPasswordChange }/>
                            <span className="red-text"> { this.state.password.error }</span>
                        </div>
                    </Col>
                    <Col s={ 6 }>
                        <div>
                            <Input required validate type="password" minLength="6" maxLength="16"
                                   label={ this.props.text.userProfile.inputConfirmPassword }
                                   success={ this.state.confirm.success }
                                   onChange={ this.onPasswordConfirmChange }/>
                            <span className="red-text"> { this.state.confirm.error } </span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col s={ 4 }>
                        <div>
                            <Input required validate type="number" min="1"
                                   label={ this.props.text.userProfile.inputAge }
                                   success={ this.state.age.success }
                                   onChange={ this.onAgeChange }
                            />
                            <span className="red-text"> { this.state.age.error } </span>
                        </div>
                    </Col>
                    <Col s={ 4 }>
                        <div>
                            <Input required validate type="number" min="1"
                                   label={ this.props.text.userProfile.inputHeight }
                                   success={ this.state.height.success }
                                   onChange={ this.onHeightChange }
                            />
                            <span className="red-text"> { this.state.height.error } </span>
                        </div>
                    </Col>
                    <Col s={ 4 }>
                        <div>
                            <Input required validate type="number" min="1"
                                   label={ this.props.text.userProfile.inputWeight }
                                   success={ this.state.weight.success }
                                   onChange={ this.onWeightChange }
                            />
                            <span className="red-text"> { this.state.weight.error } </span>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col s={ 6 }>
                        <GenderSelect text={ this.props.text } gendersList={ this.state.genderList } onGenderSelected={ this.onGenderChange }/>
                    </Col>
                </Row>
                <Row>
                    { <h3>{ this.state.registrationError }</h3> }
                </Row>
            </div>
        </Modal>
    }
}

Registration.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    loginButtonTrigger: PropTypes.node.isRequired,
    onLoginSuccess: PropTypes.func.isRequired

};
export default Registration;