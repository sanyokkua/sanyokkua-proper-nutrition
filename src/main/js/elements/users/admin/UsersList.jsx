import React                                                     from 'react';
import { Button, CardPanel, Col, Input, Pagination, Row, Table } from "react-materialize";
import PropTypes                                                 from "prop-types";
import RoleSelect                                                from "./RoleSelect";
import SearchForm                                                from "../../common/SearchForm";
import TextPropType                                              from "../../../utils/TextPropType";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
        this.onNumberOfRecordsChange = this.onNumberOfRecordsChange.bind(this);
        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onRoleSelected = this.onRoleSelected.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onPageChange(pageNumber) {
        if (pageNumber) {
            this.props.onPageChange(pageNumber);
        } else {
            console.warn("onPageChange: page is null");
        }
    }

    onSearchTextChanged(value) {
        if (value) {
            this.props.onSearchChange(value);
        } else {
            console.warn("onSearchTextChanged: empty search text");
            this.props.onSearchChange(value);
        }
    }

    onSave(user) {
        if (user) {
            this.props.onUserSave(user);
        } else {
            console.warn("onSave: Problem with saving user. User is null")
        }
    }

    onRoleSelected(user, roleId) {
        if (user && roleId) {
            user.roleId = Number(roleId);
            this.onSave(user);
        } else {
            console.warn("onRoleSelected: Problem with updating user. User or role is null")
        }
    }

    onDelete(user) {
        if (user) {
            this.props.onUserDelete(user);
        } else {
            console.warn("onDelete: Problem with deleting user. User is null ");
        }
    }

    onNumberOfRecordsChange(event, page) {
        if (page) {
            this.props.onNumberOfRecordsChange(page);
        } else {
            console.warn("onNumberOfRecordsChange: Page is null ")
        }

    }

    render() {
        const users = this.props.usersList;
        const isNotEmpty = users && users.length > 0;
        return <div>
            <CardPanel className="blue lighten-5 black-text">
                <Row>
                    <Col s={ 9 }>
                        <SearchForm onChange={ this.onSearchTextChanged }/>
                    </Col>
                    <Col s={ 3 }>
                        <Input s={ 12 } type="number" min="1" onChange={ this.onNumberOfRecordsChange } label={ "Number of records per page" } defaultValue={ this.props.numberOfRecords }/>
                    </Col>
                </Row>
                <Table hoverable responsive striped>
                    <thead>
                    <tr>
                        <th data-field="email">Email</th>
                        <th data-field="role">User Role</th>
                        <th data-field="actions">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        isNotEmpty ? users.map((user) =>
                                                   <tr key={ user.userId }>
                                                       <td>{ user.email }</td>
                                                       <td><
                                                           RoleSelect text={ this.props.text }
                                                                      rolesList={ this.props.rolesList }
                                                                      defaultValue={ user.roleId }
                                                                      onRoleSelected={ (roleId) => this.onRoleSelected(user, roleId) }/>
                                                       </td>
                                                       <td>
                                                           <Button waves='purple' className='red darken-4 white-text' onClick={ () => this.onDelete(user) }>Delete</Button>
                                                       </td>
                                                   </tr>
                        ) : null
                    }
                    </tbody>
                </Table>
                <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.onPageChange }/>
            </CardPanel>
        </div>
    }
}

UsersList.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    onUserSave: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onUserDelete: PropTypes.func.isRequired,
    onNumberOfRecordsChange: PropTypes.func.isRequired,

    usersList: PropTypes.array.isRequired,
    rolesList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    numberOfRecords: PropTypes.number.isRequired,

    text: PropTypes.oneOfType([TextPropType]).isRequired
};

export default UsersList;
