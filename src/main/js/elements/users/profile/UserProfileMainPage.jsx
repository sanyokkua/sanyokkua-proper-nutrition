import React                              from 'react';
import { Button, Col, Modal, Row, Table } from "react-materialize";
import PropTypes                          from "prop-types";
import DishService                        from '../../../services/DishService'
import UserService                        from "../../../services/UserService";
import UserProfileEditView                from "./UserProfileEditView";
import TextPropType                       from "../../../utils/TextPropType";
import Dishes                             from "../../dishes/Dishes";

class UserProfileMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.dishService = new DishService();
        this.userService = new UserService();

        this.state = {
            user: this.props.user,
            lastCalculatedEnergy: this.props.user.energy,
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
        this.setState({user: newUserData, energy: newUserData.energy});
    }

    onUpdateUser(user) {
        //TODO: save user to server
        console.log(JSON.stringify(user));
        this.setState({user: JSON.parse(JSON.stringify(user)), lastCalculatedEnergy: user.energy});
        // this.userService.updateUser(user, () => {
        //     //CalculatorService.calculate({}, ()=>{}, ()=>{});
        //     this.setState({user: user});
        // }, (error) => {console.log(error)})
    }

    render() {
        const currentUser = this.state.user;
        const currentTabText = this.props.text.userProfile;
        return <div>
            <Row>
                <Col s={ 4 }>
                    <Row>
                        <h3>{ currentTabText.userInfoTitle }</h3>
                    </Row>
                    <Row>
                        <Modal fixedFooter header={ "" }
                               trigger={ <Button waves='teal' className='blue darken-4 white-text center-align z-depth-3'>{ currentTabText.buttonEditProfile }</Button> }
                               actions={ <Button flat modal="close" waves="light">{ currentTabText.buttonCancel }</Button> }>
                            <UserProfileEditView onSaveButtonClick={ this.onUpdateUser } onSaveButtonText={ currentTabText.buttonEdit } user={ this.state.user } text={ this.props.text }/>
                        </Modal>
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
                </Col>
                <Col s={ 8 }>
                    <Dishes editable={ false } text={ this.props.text } numberOfRecords={ 5 }/>
                </Col>
            </Row>
        </div>
    }
}

UserProfileMainPage.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    user: PropTypes.object.isRequired
};

export default UserProfileMainPage;
