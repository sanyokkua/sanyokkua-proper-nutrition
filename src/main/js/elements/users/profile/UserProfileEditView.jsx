import React                       from 'react';
import { Button, Col, Input, Row } from 'react-materialize';
import PropTypes                   from "prop-types";
import Utils                       from "../../../utils/Utils";
import UserService                 from "../../../services/UserService";
import TextPropType                from "../../../utils/TextPropType"

class UserProfileEditView extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkCallback(this.props.onSaveButtonClick, "onEditClick");
        let userIsDefined = Boolean(this.props.user);
        this.state = {
            isValid: false,
            fields: {
                login: {
                    isValid: userIsDefined,
                    value: !userIsDefined ? null : this.props.user.login,
                    error: null
                },
                email: {
                    isValid: userIsDefined,
                    value: !userIsDefined ? null : this.props.user.email,
                    error: null
                },
                password: {
                    isValid: userIsDefined,
                    value: null,
                    error: null
                },
                passwordConfirm: {
                    isValid: userIsDefined,
                    value: null,
                    error: null
                },
                age: {
                    isValid: userIsDefined,
                    value: !userIsDefined ? null : this.props.user.age,
                    error: null
                },
                height: {
                    isValid: userIsDefined,
                    value: !userIsDefined ? null : this.props.user.height,
                    error: null
                },
                weight: {
                    isValid: userIsDefined,
                    value: !userIsDefined ? null : this.props.user.weight,
                    error: null
                },
                gender: {
                    isValid: userIsDefined,
                    value: !userIsDefined ? null : this.props.user.gender,
                    error: null
                },
            },
            isEditingCurrentUser: userIsDefined,
            passwordsIsSame: true,
        };
        this.userService = new UserService();
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onHeightChange = this.onHeightChange.bind(this);
        this.onWeightChange = this.onWeightChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.onProfileUpdateButtonClick = this.onProfileUpdateButtonClick.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            this.validateForm();
            console.log("component did mount");
        }
    }

    updateState(fieldName, objValue, callback) {
        let objForUpdate = JSON.parse(JSON.stringify(this.state.fields));
        objForUpdate[fieldName] = objValue;
        this.setState({fields: objForUpdate}, () => {
            this.validateForm(callback);
        });
    }

    validateForm(callback) {
        let isValid = true;
        let fields = this.state.fields;
        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {
                let field = fields[key];
                isValid &= field.isValid;
            }
        }
        isValid &= this.state.passwordsIsSame;
        if (callback) {
            this.setState({isValid: isValid}, callback)
        } else {
            this.setState({isValid: isValid});
        }
    }

    generalUpdateState(value, fieldName, invalidText, validatorFunc, callback) {
        let isValid = validatorFunc(value);
        if (!this.state.isEditingCurrentUser) {
            if (isValid && "login" === fieldName) {
                this.userService.loginIsInUse(value, (isInUse) => {
                    isValid &= !isInUse;
                    let result = {isValid: isValid, value: value, error: !isValid ? invalidText : null};
                    this.updateState(fieldName, result, callback);
                }, () => {
                    isValid = false;
                    let result = {isValid: isValid, value: value, error: !isValid ? invalidText : null};
                    this.updateState(fieldName, result, callback);
                });
            } else if (isValid && "email" === fieldName) {
                this.userService.emailIsInUse(value, (isInUse) => {
                    isValid &= !isInUse;
                    let result = {isValid: isValid, value: value, error: !isValid ? invalidText : null};
                    this.updateState(fieldName, result, callback);
                }, () => {
                    isValid = false;
                    let result = {isValid: isValid, value: value, error: !isValid ? invalidText : null};
                    this.updateState(fieldName, result, callback);
                });
            } else {
                let result = {isValid: isValid, value: value, error: !isValid ? invalidText : null};
                this.updateState(fieldName, result, callback);
            }
        } else {
            let result = {isValid: isValid, value: value, error: !isValid ? invalidText : null};
            this.updateState(fieldName, result, callback);
        }
    }

    onLoginChange(event, value) {
        this.generalUpdateState(value, "login", this.props.text.userProfile.validationErrorLogin, Utils.isValidText);
    }

    onEmailChange(event, value) {
        this.generalUpdateState(value, "email", this.props.text.userProfile.validationErrorEmail, Utils.isValidEmail);
    }

    onAgeChange(event, value) {
        this.generalUpdateState(value, "age", this.props.text.userProfile.validationErrorAge, Utils.isValidNumber);
    }

    onHeightChange(event, value) {
        this.generalUpdateState(value, "height", this.props.text.userProfile.validationErrorHeight, Utils.isValidNumber);
    }

    onWeightChange(event, value) {
        this.generalUpdateState(value, "weight", this.props.text.userProfile.validationErrorWeight, Utils.isValidNumber);
    }

    onGenderChange(event, value) {
        let result = {isValid: true, value: value, error: null};
        this.updateState("gender", result);
    }

    onPasswordChange(event, value) {
        this.generalUpdateState(value, "password", this.props.text.userProfile.validationErrorPassword, Utils.isValidPassword, this.validatePasswords);
    }

    onPasswordConfirmChange(event, value) {
        this.generalUpdateState(value, "passwordConfirm", this.props.text.userProfile.validationErrorPasswordConfirm, Utils.isValidPassword, this.validatePasswords);
    }

    validatePasswords() {
        let pass = this.state.fields.password;
        let confirm = this.state.fields.passwordConfirm;
        if (pass.isValid && confirm.isValid) {
            if (pass.value !== confirm.value) {
                let resultPassword = {isValid: true, value: pass.value, error: this.props.text.userProfile.validationErrorPasswordAndConfirmDiff};
                let resultPasswordConfirm = {isValid: true, value: confirm.value, error: this.props.text.userProfile.validationErrorPasswordAndConfirmDiff};
                this.setState({passwordsIsSame: false}, () => this.updateState("password", resultPassword, () => this.updateState("passwordConfirm", resultPasswordConfirm)))
            } else {
                let resultPassword = {isValid: true, value: pass.value, error: null};
                let resultPasswordConfirm = {isValid: true, value: confirm.value, error: null};
                this.setState({passwordsIsSame: true}, () => this.updateState("password", resultPassword, () => this.updateState("passwordConfirm", resultPasswordConfirm)))
            }
        }
    }

    onProfileUpdateButtonClick() {
        if (this.state.isValid) {
            let fields = this.state.fields;
            this.props.onSaveButtonClick({
                                             id: this.props.user ? this.props.user.id : null,
                                             age: Number(fields.age.value),
                                             weight: Number(fields.weight.value),
                                             height: Number(fields.height.value),
                                             login: fields.login.value,
                                             email: fields.email.value,
                                             gender: fields.gender.value,
                                             lastCalculatedEnergy: 0
                                         });
        }
    }

    render() {
        return <div>
            <Row>
                <Col s={ 6 }>
                    <div>
                        <Input required validate defaultValue={ this.props.user.login }
                               placeholder={ this.props.text.userProfile.inputLogin }
                               label={ this.props.text.userProfile.inputLogin }
                               success={ this.state.fields.login.isValid ? this.props.text.userProfile.validationSuccessLogin : null }
                               onChange={ this.onLoginChange }
                        />
                        <span className="red-text"> { this.state.fields.login.error } </span>
                    </div>
                    <div>
                        <Input required validate type="email" defaultValue={ this.props.user.email }
                               label={ this.props.text.userProfile.inputEmail }
                               success={ this.state.fields.email.isValid ? this.props.text.userProfile.validationSuccessEmail : null }
                               onChange={ this.onEmailChange }
                        />
                        <span className="red-text"> { this.state.fields.email.error } </span>
                    </div>
                    <div>
                        <Input required validate type="number" min="1" defaultValue={ this.props.user.age }
                               label={ this.props.text.userProfile.inputAge }
                               success={ this.state.fields.age.isValid ? this.props.text.userProfile.validationSuccessAge : null }
                               onChange={ this.onAgeChange }
                        />
                        <span className="red-text"> { this.state.fields.age.error } </span>
                    </div>
                    <div>
                        <Input required validate type="number" min="1" defaultValue={ this.props.user.height }
                               label={ this.props.text.userProfile.inputHeight }
                               success={ this.state.fields.height.isValid ? this.props.text.userProfile.validationSuccessHeight : null }
                               onChange={ this.onHeightChange }
                        />
                        <span className="red-text"> { this.state.fields.height.error } </span>
                    </div>
                    <div>
                        <Input required validate type="number" min="1" defaultValue={ this.props.user.weight }
                               label={ this.props.text.userProfile.inputWeight }
                               success={ this.state.fields.weight.isValid ? this.props.text.userProfile.validationSuccessWeight : null }
                               onChange={ this.onWeightChange }
                        />
                        <span className="red-text"> { this.state.fields.weight.error } </span>
                    </div>
                    <div>
                        <Input type='select' label={ this.props.text.userProfile.selectGender } onChange={ this.onGenderChange } defaultValue={ this.props.user.gender }>
                            <option value='male'>{ this.props.text.userProfile.selectGenderMale }</option>
                            <option value='female'>{ this.props.text.userProfile.selectGenderFemale }</option>
                        </Input>
                    </div>
                </Col>
                <Col s={ 6 }>
                    <div>
                        <Input required validate type="password" minLength="6" maxLength="16"
                               label={ this.props.text.userProfile.inputPassword }
                               success={ this.state.fields.password.isValid ? this.props.text.userProfile.validationSuccessPassword : null }
                               onChange={ this.onPasswordChange }/>
                        <span className="red-text"> { this.state.fields.password.error }</span>
                    </div>
                    <div>
                        <Input required validate type="password" minLength="6" maxLength="16"
                               label={ this.props.text.userProfile.inputConfirmPassword }
                               success={ this.state.fields.passwordConfirm.isValid ? this.props.text.userProfile.validationSuccessPasswordConfirm : null }
                               onChange={ this.onPasswordConfirmChange }/>
                        <span className="red-text"> { this.state.fields.passwordConfirm.error } </span>
                    </div>
                </Col>
            </Row>
            <Row className="center-align">
                <Button modal="close" disabled={ !this.state.isValid } waves='teal' className='blue darken-4 white-text center-align z-depth-3'
                        onClick={ this.onProfileUpdateButtonClick }>{ this.props.onSaveButtonText }</Button>
            </Row>
        </div>
    }
}

UserProfileEditView.propTypes = {
    onSaveButtonClick: PropTypes.func.isRequired,
    onSaveButtonText: PropTypes.string.isRequired,
    text: TextPropType,
    user: PropTypes.shape({
                              id: PropTypes.number.isRequired,
                              age: PropTypes.number.isRequired,
                              weight: PropTypes.number.isRequired,
                              height: PropTypes.number.isRequired,
                              login: PropTypes.string.isRequired,
                              email: PropTypes.string.isRequired,
                              gender: PropTypes.string.isRequired,
                              lastCalculatedEnergy: PropTypes.number.isRequired
                          }),

};
export default UserProfileEditView;