import React                              from 'react';
import { Button, Col, Input, Modal, Row } from 'react-materialize';
import PropTypes                          from "prop-types";

class UserProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            passwordSuccessMessage: '',
            passwordConfirmSuccessMessage: '',
            passwordErrorMessage: '',
            passwordConfirmErrorMessage: '',
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

    onLoginChange(event, value) {

    }

    onEmailChange(event, value) {

    }

    onAgeChange(event, value) {

    }

    onHeightChange(event, value) {

    }

    onWeightChange(event, value) {

    }

    onGenderChange(event, value) {

    }

    onPasswordChange(event, value) {

    }

    onPasswordConfirmChange(event, value) {

    }

    onProfileUpdateButtonClick() {

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
                    <Input required validate defaultValue={ this.props.user.login }
                           placeholder={ this.props.text.userProfile.inputLogin }
                           label={ this.props.text.userProfile.inputLogin }
                           success={ this.props.text.userProfile.validationSuccessLogin }
                           error={ this.props.text.userProfile.validationErrorLogin }
                    />
                    <Input required validate type="email" defaultValue={ this.props.user.email }
                           label={ this.props.text.userProfile.inputEmail }
                           success={ this.props.text.userProfile.validationSuccessEmail }
                           error={ this.props.text.userProfile.validationErrorEmail }
                    />
                    <Input required validate type="number" min="1" defaultValue={ this.props.user.age }
                           label={ this.props.text.userProfile.inputAge }
                           success={ this.props.text.userProfile.validationSuccessAge }
                           error={ this.props.text.userProfile.validationErrorAge }
                           onChange={ this.onAgeChange }
                    />
                    <Input required validate type="number" min="1" defaultValue={ this.props.user.height }
                           label={ this.props.text.userProfile.inputHeight }
                           success={ this.props.text.userProfile.validationSuccessHeight }
                           error={ this.props.text.userProfile.validationErrorHeight }
                           onChange={ this.onHeightChange }
                    />
                    <Input required validate type="number" min="1" defaultValue={ this.props.user.weight }
                           label={ this.props.text.userProfile.inputWeight }
                           success={ this.props.text.userProfile.validationSuccessWeight }
                           error={ this.props.text.userProfile.validationErrorWeight }
                           onChange={ this.onWeightChange }
                    />
                    <Input type='select' label={ this.props.text.userProfile.selectGender } onChange={ this.onGenderChange } defaultValue={ this.props.user.gender }>
                        <option value='male'>{ this.props.text.userProfile.selectGenderMale }</option>
                        <option value='female'>{ this.props.text.userProfile.selectGenderFemale }</option>
                    </Input>
                </Col>
                <Col s={ 6 }>
                    <Input required validate type="password"
                           label={ this.props.text.userProfile.inputPassword }
                           success={ this.state.passwordSuccessMessage }
                           error={ this.state.passwordErrorMessage }
                           onChange={ this.onPasswordChange }/>
                    <Input required validate type="password"
                           label={ this.props.text.userProfile.inputConfirmPassword }
                           success={ this.state.passwordConfirmSuccessMessage }
                           error={ this.state.passwordConfirmErrorMessage }
                           onChange={ this.onPasswordConfirmChange }/>
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