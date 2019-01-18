import React                                               from 'react';
import { Button, Card, CardPanel, Col, Modal, Row, Table } from "react-materialize";
import PropTypes                                           from "prop-types";
import UserProfileEdit                                     from "./UserProfileEdit";
import DishService                                         from '../../services/DishService'
import Dishes                                              from "../dishes/Dishes";
import Calculator                                          from "../calculator/Calculator";

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.dishService = new DishService();
        this.state = {
            user: this.props.user,
            currentPage: 0,
            totalPages: 0,
            numberOfRecords: 10,
            dishList: []
        };
        this.reloadDishes();
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.onEditProfileButtonClick = this.onEditProfileButtonClick.bind(this);
        this.onUpdateUser = this.onUpdateUser.bind(this);
    }

    reloadDishes() {
        this.dishService.getDishes({currentPage: this.state.currentPage, name: '', numberOfRecords: this.state.numberOfRecords},
                                   result => this.setState({dishList: result.content, currentPage: result.currentPage, totalPages: result.totalPages}),
                                   error => console.log(error));
    }

    onUpdateButtonClick(user) {
        this.setState({user: user});
    }

    onEditProfileButtonClick() {
        //TODO: save user to server
    }

    onUpdateUser(user) {
        //TODO: save user to server
    }

    render() {
        return <div>
            <CardPanel className="white black-text">
                <Row>
                    <Col s={ 6 }>
                        <Card className='blue lighten-5 z-depth-4' textClassName='black-text' title={ this.props.text.userProfile.userInfoTitle }
                              actions={ [<Modal key={ "calc" } fixedFooter header={ "" }
                                                trigger={ <Button waves='teal' className='deep-purple darken-4 white-text'>{ this.props.text.userProfile.buttonUpdate }</Button> }
                                                actions={ <Button flat modal="close" waves="light">{ this.props.text.userProfile.buttonCancel }</Button> }>
                                             <Calculator isUpdating={ true } text={ this.props.text } user={ this.state.user } onResultCalculated={ this.onUpdateButtonClick }/>
                                         </Modal>]
                              }>
                            <Row>
                            </Row>
                            <Row>
                                <Table hoverable bordered>
                                    <tbody>
                                    <tr>
                                        <td className="left-align">{ this.props.text.userProfile.inputAge }</td>
                                        <td className="right-align">{ this.props.user.age }</td>
                                    </tr>
                                    <tr>
                                        <td className="left-align">{ this.props.text.userProfile.inputHeight }</td>
                                        <td className="right-align">{ this.props.user.height }</td>
                                    </tr>
                                    <tr>
                                        <td className="left-align">{ this.props.text.userProfile.inputWeight }</td>
                                        <td className="right-align">{ this.props.user.weight }</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <div><h2>{ this.state.user.lastCalculatedEnergy }</h2></div>
                            </Row>
                        </Card>
                        <Row className='center-align'>
                            <UserProfileEdit user={ this.state.user } onEditClick={ this.onUpdateUser } text={ this.props.text } modalTrigger={
                                <Button waves='teal' className='blue darken-4 white-text center-align z-depth-3'>{ this.props.text.userProfile.buttonEditProfile }</Button>
                            }/>
                        </Row>

                    </Col>
                    <Col s={ 6 }>
                        <Dishes editable={ false } text={ this.props.text } numberOfRecords={ 5 }/>
                    </Col>
                </Row>
            </CardPanel>
        </div>
    }
}

UserProfilePage.propTypes = {
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

export default UserProfilePage;
