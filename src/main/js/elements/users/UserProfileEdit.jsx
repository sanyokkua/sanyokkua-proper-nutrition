import React                              from 'react';
import { Button, Col, Input, Modal, Row } from 'react-materialize';
import PropTypes                          from "prop-types";
import Utils                              from "../../utils/Utils";

class UserProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            fields: { //TODO: load user fields from props
                login: {
                    isValid: false,
                    value: null,
                    error: null
                },
                email: {
                    isValid: false,
                    value: null,
                    error: null
                },
                password: {
                    isValid: false,
                    value: null,
                    error: null
                },
                passwordConfirm: {
                    isValid: false,
                    value: null,
                    error: null
                },
                age: {
                    isValid: false,
                    value: null,
                    error: null
                },
                height: {
                    isValid: false,
                    value: null,
                    error: null
                },
                weight: {
                    isValid: false,
                    value: null,
                    error: null
                },
                gender: {
                    isValid: false,
                    value: null,
                    error: null
                },
            },
            passwordsIsSame: false,
        };
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
        let result = {isValid: isValid, value: value, error: !isValid ? invalidText : null};
        this.updateState(fieldName, result, callback);
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
            this.props.onEditClick({
                                       age: fields.age.value,
                                       weight: fields.weight.value,
                                       height: fields.height.value,
                                       login: fields.login.value,
                                       email: fields.email.value,
                                       gender: fields.gender.value,
                                       lastCalculatedEnergy: 0
                                   });
        }
    }


    render() {
        return <Modal fixedFooter header={ "" } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button disabled={ !this.state.isValid } modal="close" waves="light" className="red darken-2" onClick={ this.onProfileUpdateButtonClick }>{ this.props.text.userProfile.buttonEdit }</Button>
                <Button flat modal="close" waves="light">{ this.props.text.userProfile.buttonCancel }</Button>
            </div>
        }>
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
        </Modal>
    }
}

UserProfileEdit.propTypes = {
    onEditClick: PropTypes.func.isRequired,
    text: PropTypes.shape({
                              general: PropTypes.shape({
                                                           tabUser: PropTypes.string.isRequired,
                                                           tabUserProfile: PropTypes.string.isRequired,
                                                           tabProducts: PropTypes.string.isRequired,
                                                           tabDishes: PropTypes.string.isRequired,
                                                           tabLogout: PropTypes.string.isRequired,
                                                           tabEditMode: PropTypes.string.isRequired
                                                       }).isRequired,
                              calculator: PropTypes.shape({
                                                              age: PropTypes.string.isRequired,
                                                              height: PropTypes.string.isRequired,
                                                              weight: PropTypes.string.isRequired,
                                                              gender: PropTypes.string.isRequired,
                                                              genderMale: PropTypes.string.isRequired,
                                                              genderFemale: PropTypes.string.isRequired,
                                                              activity: PropTypes.string.isRequired,
                                                              formula: PropTypes.string.isRequired,
                                                              benedict: PropTypes.string.isRequired,
                                                              mifflin: PropTypes.string.isRequired,
                                                              low: PropTypes.string.isRequired,
                                                              medium: PropTypes.string.isRequired,
                                                              high: PropTypes.string.isRequired,
                                                              very_high: PropTypes.string.isRequired,
                                                              buttonCalculate: PropTypes.string.isRequired,
                                                              modalHeaderCalculate: PropTypes.string.isRequired,
                                                              modalResultText: PropTypes.string.isRequired,
                                                              modalButtonCancel: PropTypes.string.isRequired
                                                          }).isRequired,
                              products: PropTypes.shape({
                                                            buttonCreate: PropTypes.string.isRequired,
                                                            buttonProductTypes: PropTypes.string.isRequired,
                                                            buttonLoadCsv: PropTypes.string.isRequired,
                                                            buttonEdit: PropTypes.string.isRequired,
                                                            buttonDelete: PropTypes.string.isRequired,
                                                            inputRecordsNumber: PropTypes.string.isRequired,
                                                            selectType: PropTypes.string.isRequired,
                                                            tableHeadName: PropTypes.string.isRequired,
                                                            tableHeadEnergy: PropTypes.string.isRequired,
                                                            tableHeadType: PropTypes.string.isRequired,
                                                            tableHeadActions: PropTypes.string.isRequired,
                                                            modalEditProductHeadCreate: PropTypes.string.isRequired,
                                                            modalEditProductHeadEdit: PropTypes.string.isRequired,
                                                            modalEditProductInputName: PropTypes.string.isRequired,
                                                            modalEditProductInputEnergy: PropTypes.string.isRequired,
                                                            modalEditProductSelectType: PropTypes.string.isRequired,
                                                            modalEditProductButtonCancel: PropTypes.string.isRequired,
                                                            modalEditTypeHeader: PropTypes.string.isRequired,
                                                            modalEditTypeButtonCancel: PropTypes.string.isRequired,
                                                            modalEditTypeInputName: PropTypes.string.isRequired,
                                                            modalEditTypeButtonCreate: PropTypes.string.isRequired,
                                                            modalEditTypeButtonSave: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadName: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadEdit: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadDelete: PropTypes.string.isRequired
                                                        }).isRequired,
                              dishes: PropTypes.shape({
                                                          buttonCreate: PropTypes.string.isRequired,
                                                          tableHeadName: PropTypes.string.isRequired,
                                                          tableHeadEnergy: PropTypes.string.isRequired,
                                                          tableHeadAmount: PropTypes.string.isRequired,
                                                          buttonEdit: PropTypes.string.isRequired,
                                                          buttonDelete: PropTypes.string.isRequired,
                                                          modalEditHeader: PropTypes.string.isRequired,
                                                          modalEditTotalEnergyText: PropTypes.string.isRequired,
                                                          modalEditInputProductName: PropTypes.string.isRequired,
                                                          modalEditTableHeaderName: PropTypes.string.isRequired,
                                                          modalEditTableHeaderEnergy: PropTypes.string.isRequired,
                                                          modalEditTableHeaderAmount: PropTypes.string.isRequired,
                                                          modalEditTableHeaderDelete: PropTypes.string.isRequired,
                                                          modalEditTableInputAmount: PropTypes.string.isRequired,
                                                          modalEditButtonCancel: PropTypes.string.isRequired,
                                                          modalEditButtonSave: PropTypes.string.isRequired
                                                      }).isRequired,
                              userProfile: PropTypes.shape({
                                                               inputAge: PropTypes.string.isRequired,
                                                               inputHeight: PropTypes.string.isRequired,
                                                               inputWeight: PropTypes.string.isRequired,
                                                               inputLogin: PropTypes.string.isRequired,
                                                               inputEmail: PropTypes.string.isRequired,
                                                               inputPassword: PropTypes.string.isRequired,
                                                               inputConfirmPassword: PropTypes.string.isRequired,
                                                               selectGender: PropTypes.string.isRequired,
                                                               selectGenderMale: PropTypes.string.isRequired,
                                                               selectGenderFemale: PropTypes.string.isRequired,
                                                               buttonEdit: PropTypes.string.isRequired,
                                                               buttonCancel: PropTypes.string.isRequired,
                                                               buttonEditProfile: PropTypes.string.isRequired,
                                                               buttonUpdate: PropTypes.string.isRequired,
                                                               validationSuccessAge: PropTypes.string.isRequired,
                                                               validationSuccessHeight: PropTypes.string.isRequired,
                                                               validationSuccessWeight: PropTypes.string.isRequired,
                                                               validationSuccessLogin: PropTypes.string.isRequired,
                                                               validationSuccessEmail: PropTypes.string.isRequired,
                                                               validationSuccessPassword: PropTypes.string.isRequired,
                                                               validationSuccessPasswordConfirm: PropTypes.string.isRequired,
                                                               validationErrorAge: PropTypes.string.isRequired,
                                                               validationErrorHeight: PropTypes.string.isRequired,
                                                               validationErrorWeight: PropTypes.string.isRequired,
                                                               validationErrorLogin: PropTypes.string.isRequired,
                                                               validationErrorEmail: PropTypes.string.isRequired,
                                                               validationErrorPassword: PropTypes.string.isRequired,
                                                               validationErrorPasswordConfirm: PropTypes.string.isRequired,
                                                               validationErrorPasswordAndConfirmDiff: PropTypes.string.isRequired,
                                                               validationErrorPasswordLength: PropTypes.string.isRequired,
                                                               userInfoTitle: PropTypes.string.isRequired
                                                           })
                          }).isRequired,
    modalTrigger: PropTypes.node.isRequired,
    user: PropTypes.shape({
                              age: PropTypes.number.isRequired,
                              weight: PropTypes.number.isRequired,
                              height: PropTypes.number.isRequired,
                              login: PropTypes.string.isRequired,
                              email: PropTypes.string.isRequired,
                              gender: PropTypes.string.isRequired,
                              lastCalculatedEnergy: PropTypes.number.isRequired
                          })

};
export default UserProfileEdit;