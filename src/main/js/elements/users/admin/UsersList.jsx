import React                                                     from 'react';
import { Button, CardPanel, Col, Input, Pagination, Row, Table } from "react-materialize";
import PropTypes                                                 from "prop-types";
import RoleSelect                                                from "../helpers/RoleSelect";
import SearchForm                                                from "../../common/SearchForm";
import TextPropType                                              from "../../../utils/TextPropType";
import Utils                                                     from "../../../utils/Utils";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.usersList, "usersList");
        Utils.checkRequiredProperty(this.props.rolesList, "rolesList");
        Utils.checkRequiredProperty(this.props.totalPages, "totalPages");
        Utils.checkRequiredProperty(this.props.currentPage, "currentPage");
        Utils.checkRequiredProperty(this.props.numberOfRecords, "numberOfRecords");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkCallback(this.props.onPageChange, "onPageChange");
        Utils.checkCallback(this.props.onUserSave, "onUserSave");
        Utils.checkCallback(this.props.onSearchChange, "onSearchChange");
        Utils.checkCallback(this.props.onUserDelete, "onUserDelete");
        Utils.checkCallback(this.props.onNumberOfRecordsChange, "onNumberOfRecordsChange");
        Utils.checkCallback(this.props.onRoleFilterChanged, "onRoleFilterChanged");

        this.onPageChange = this.onPageChange.bind(this);
        this.onNumberOfRecordsChange = this.onNumberOfRecordsChange.bind(this);
        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onRoleSelected = this.onRoleSelected.bind(this);
        this.onRoleFilterChanged = this.onRoleFilterChanged.bind(this);
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

    onRoleFilterChanged(roleId) {
        if (roleId) {
            this.props.onRoleFilterChanged(roleId);
        } else {
            console.warn("onRoleFilterChanged: Role is null ");
            this.props.onRoleFilterChanged(roleId);
        }
    }

    render() {
        const users = this.props.usersList;
        const isNotEmpty = users && users.length > 0;
        const rolesListForFilter = JSON.parse(JSON.stringify(this.props.rolesList));
        rolesListForFilter.unshift({roleId: -1, roleName: ""});
        return <div>
            <CardPanel className="teal lighten-5 black-text">
                <Row>
                    <Col s={ 6 }>
                        <SearchForm onChange={ this.onSearchTextChanged }/>
                    </Col>
                    <Col s={ 4 }>
                        <RoleSelect text={ this.props.text } rolesList={ rolesListForFilter } defaultValue={ -1 } onRoleSelected={ this.onRoleFilterChanged }/>
                    </Col>
                    <Col s={ 2 }>
                        <Input type="number" min="1" onChange={ this.onNumberOfRecordsChange } label={ this.props.text.admin.numberOfRecords } defaultValue={ this.props.numberOfRecords }/>
                    </Col>
                </Row>
                <Table hoverable responsive striped>
                    <thead>
                    <tr>
                        <th data-field="email">{ this.props.text.admin.tableHeaderEmail }</th>
                        <th data-field="role">{ this.props.text.admin.tableHeaderRole }</th>
                        <th data-field="actions">{ this.props.text.admin.tableHeaderActions }</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        isNotEmpty ? users.map((user) =>
                                                   <tr key={ user.userId }>
                                                       <td>{ user.email }</td>
                                                       <td><RoleSelect text={ this.props.text }
                                                                       rolesList={ this.props.rolesList }
                                                                       defaultValue={ user.roleId }
                                                                       onRoleSelected={ (roleId) => this.onRoleSelected(user, roleId) }/>
                                                       </td>
                                                       <td>
                                                           <Button waves='purple' className='red darken-4 white-text' onClick={ () => this.onDelete(user) }>{ this.props.text.admin.tableActionDelete }</Button>
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
    onRoleFilterChanged: PropTypes.func.isRequired,

    usersList: PropTypes.array.isRequired,
    rolesList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    numberOfRecords: PropTypes.number.isRequired,

    text: PropTypes.oneOfType([TextPropType]).isRequired
};

export default UsersList;
