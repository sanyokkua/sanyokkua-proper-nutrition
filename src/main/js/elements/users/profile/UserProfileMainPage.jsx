import React                              from 'react';
import { Button, Col, Modal, Row, Table } from "react-materialize";
import PropTypes                          from "prop-types";
import UserService                        from "../../../services/UserService";
import UserProfileEditView                from "./UserProfileEditView";
import TextPropType                       from "../../../utils/TextPropType";
import UserDishService                    from "../../../services/UserDishService";
import ProfileDishView                    from "../../dishes/ProfileDishView";

class UserProfileMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.userDishService = new UserDishService();
        this.userService = new UserService();

        this.state = {
            user: this.props.user,
            lastCalculatedEnergy: this.props.user.energy,

            currentPage: 0,
            totalPages: 0,
            numberOfRecords: 5,
            dishList: [],
            search: '',

            showDishes: false
        };
        this.reloadDishes();
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.onUpdateUser = this.onUpdateUser.bind(this);
        this.onDishSelect = this.onDishSelect.bind(this);
        this.onDishSearch = this.onDishSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    reloadDishes() {
        this.userDishService.getDishesForUser({
                                                  search: this.state.search,
                                                  currentPage: this.state.currentPage,
                                                  numberOfRecords: this.state.numberOfRecords,
                                                  userId: this.props.user.userId
                                              },
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

    onDishSelect(dishId) {
        this.userDishService.deleteDishFromUser({dishId: dishId, userId: this.props.user.userId}, () => {
                                                    console.log("removing dish: " + dishId + " from user: " + this.props.user.userId);
                                                    this.reloadDishes();
                                                },
                                                error => {
                                                    console.warn(error + "");
                                                });
    }

    onDishSearch(value) {
        this.setState({search: value, currentPage: 0, totalPages: 0}, () => {
            this.reloadDishes();
        });
    }

    onPageChange(pageNumber) {
        if (pageNumber) {
            this.setState({currentPage: pageNumber}, this.reloadDishes);
        }
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
                    <ProfileDishView text={ this.props.text }
                                     dishList={ this.state.dishList }
                                     currentPage={ this.state.currentPage }
                                     onDishSelect={ this.onDishSelect }
                                     onPageChange={ this.onPageChange }
                                     onDishSearch={ this.onDishSearch }
                                     totalPages={ this.state.totalPages }
                    />
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
