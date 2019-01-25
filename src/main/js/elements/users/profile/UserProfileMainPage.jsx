import React                                    from 'react';
import { Button, CardPanel, Modal, Row, Table } from "react-materialize";
import PropTypes                                from "prop-types";
import DishService                              from '../../../services/DishService'
import UserService                              from "../../../services/UserService";
import Calculator                               from "../../calculator/Calculator";
import UserProfileEditView                      from "./UserProfileEditView";
import TextPropType                             from "../../../utils/TextPropType";
import Dishes                                   from "../../dishes/Dishes";

class UserProfileMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.dishService = new DishService();
        this.userService = new UserService();

        this.state = {
            user: this.props.user,
            lastCalculatedEnergy: this.props.user.lastCalculatedEnergy,
            currentPage: 0,
            totalPages: 0,
            numberOfRecords: 10,
            dishList: [],
            showDishes: false
        };
        this.reloadDishes();
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.onUpdateUser = this.onUpdateUser.bind(this);
    }

    reloadDishes() {
        this.dishService.getDishes({currentPage: this.state.currentPage, name: '', numberOfRecords: this.state.numberOfRecords},
                                   result => this.setState({dishList: result.content, currentPage: result.currentPage, totalPages: result.totalPages}),
                                   error => console.log(error));
    }

    onUpdateButtonClick(user) {
        let newUserData = JSON.parse(JSON.stringify(user));
        this.setState({user: newUserData, lastCalculatedEnergy: newUserData.lastCalculatedEnergy});
    }

    onUpdateUser(user) {
        //TODO: save user to server
        console.log(JSON.stringify(user));
        this.setState({user: JSON.parse(JSON.stringify(user))});
        // this.userService.updateUser(user, () => {
        //     //CalculatorService.calculate({}, ()=>{}, ()=>{});
        //     this.setState({user: user});
        // }, (error) => {console.log(error)})
    }

    render() {
        const currentUser = this.state.user;
        const currentTabText = this.props.text.userProfile;
        const CalculatorModal = ({updateButtonText, cancelButtonText, text, user, onResult}) => {
            return <Modal fixedFooter header={ "" }
                          trigger={ <Button waves='teal' className='deep-purple darken-4 white-text'>{ updateButtonText }</Button> }
                          actions={ <Button flat modal="close" waves="light">{ cancelButtonText }</Button> }>
                <Calculator isUpdating={ true } text={ text } user={ user } onResultCalculated={ onResult }/>
            </Modal>
        };
        CalculatorModal.propTypes = {
            updateButtonText: PropTypes.string.isRequired,
            cancelButtonText: PropTypes.string.isRequired,
            text: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired,
            onResult: PropTypes.func.isRequired
        };
        const UserProfileEditModal = ({onUserSave, userSaveButtonText, dialogCancelButtonText, text, user, modalButtonText,}) => {
            return <Modal fixedFooter header={ "" }
                          trigger={ <Button waves='teal' className='blue darken-4 white-text center-align z-depth-3'>{ modalButtonText }</Button> }
                          actions={ <Button flat modal="close" waves="light">{ dialogCancelButtonText }</Button>
                          }>
                <UserProfileEditView onSaveButtonClick={ onUserSave } onSaveButtonText={ userSaveButtonText } user={ user } text={ text }/>
            </Modal>
        };
        UserProfileEditModal.propTypes = {
            onUserSave: PropTypes.func.isRequired,
            userSaveButtonText: PropTypes.string.isRequired,
            dialogCancelButtonText: PropTypes.string.isRequired,
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
            modalButtonText: PropTypes.string.isRequired,
        };

        return <div>
            <CardPanel className="blue lighten-5 z-depth-4 black-text">
                <Row>
                    <h3>{ currentTabText.userInfoTitle }</h3>
                </Row>
                <Row>
                    <UserProfileEditModal dialogCancelButtonText={ currentTabText.buttonCancel }
                                          modalButtonText={ currentTabText.buttonEditProfile }
                                          onUserSave={ this.onUpdateUser }
                                          userSaveButtonText={ currentTabText.buttonEdit }
                                          text={ this.props.text }
                                          user={ this.state.user }/>
                </Row>
                <Row>
                    <Table hoverable bordered>
                        <tbody>
                        <tr>
                            <td className="left-align">{ currentTabText.inputAge }</td>
                            <td className="right-align">{ currentUser.age }</td>
                        </tr>
                        <tr>
                            <td className="left-align">{ currentTabText.inputHeight }</td>
                            <td className="right-align">{ currentUser.height }</td>
                        </tr>
                        <tr>
                            <td className="left-align">{ currentTabText.inputWeight }</td>
                            <td className="right-align">{ currentUser.weight }</td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <div><h2>{ this.state.lastCalculatedEnergy }</h2></div>
                </Row>
                <Row>
                    <Table key={ "buttons" }>
                        <tbody>
                        <tr>
                            <td className={ "right-align" }>
                                <CalculatorModal key={ "calc" } text={ this.props.text }
                                                 user={ currentUser }
                                                 updateButtonText={ currentTabText.buttonUpdate }
                                                 cancelButtonText={ currentTabText.buttonCancel }
                                                 onResult={ this.onUpdateButtonClick }
                                /></td>
                            <td className={ "left-align" }>
                                <Button waves='teal' className='deep-purple darken-4 white-text' onClick={ () => {this.setState({showDishes: !this.state.showDishes})} }>{ this.props.text.general.tabDishes }</Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
                <Row>{ this.state.showDishes ? (<Dishes editable={ false } text={ this.props.text } numberOfRecords={ 5 }/>) : (null) }</Row>
            </CardPanel>
        </div>
    }
}

UserProfileMainPage.propTypes = {
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
    user: PropTypes.shape({
                              age: PropTypes.number.isRequired,
                              weight: PropTypes.number.isRequired,
                              height: PropTypes.number.isRequired,
                              login: PropTypes.string.isRequired,
                              email: PropTypes.string.isRequired,
                              gender: PropTypes.string.isRequired,
                              lastCalculatedEnergy: PropTypes.number.isRequired
                          }).isRequired
};

export default UserProfileMainPage;
