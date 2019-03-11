import React        from 'react';
import PropTypes    from "prop-types";
import TextPropType from "../../../utils/TextPropType";
import UsersList    from "./UsersList";
import UserService  from "../../../services/UserService";
import RoleService  from "../../../services/RoleService";

class AdminUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.roleService = new RoleService();
        this.state = {
            usersList: [],
            rolesList: [],
            currentPage: 0,
            totalPages: 0,
            search: '',
            numberOfRecords: 10,
            currentRole: null
        };
        this.onPageChange = this.onPageChange.bind(this);
        this.onNumberOfRecordsChange = this.onNumberOfRecordsChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onUserSave = this.onUserSave.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData() {
        this.roleService.getRoles((roles) => {
            this.setState({rolesList: roles.content}, () => {
                this.userService.getUsers({
                                              currentPage: this.state.currentPage,
                                              numberOfRecords: this.state.numberOfRecords,
                                              search: this.state.search,
                                              currentRole: this.state.currentRole
                                          },
                                          result => this.setState({
                                                                      usersList: result.content,
                                                                      currentPage: result.currentPage,
                                                                      totalPages: result.totalPages
                                                                  }),
                                          error => console.log(error));
            });
        }, error => console.log(error));
    }

    onPageChange(pageNumber) {
        this.setState({currentPage: pageNumber}, this.reloadData);
    }

    onNumberOfRecordsChange(value) {
        this.setState({numberOfRecords: Number(value), currentPage: 0}, this.reloadData);
    }

    onSearchChange(searchString) {
        this.setState({search: searchString, currentPage: 0, totalPages: 0}, () => {
            this.reloadData();
        });
    }

    onUserSave(user) {
        this.userService.updateUser(user, () => this.reloadData(), error => console.log(error));
    }

    onUserDelete(user) {
        this.userService.deleteUser(user, () => this.reloadData(), error => console.log(error));
    }

    render() {
        return <div>

            <UsersList onPageChange={ this.onPageChange }
                       onUserSave={ this.onUserSave }
                       onSearchChange={ this.onSearchChange }
                       onUserDelete={ this.onUserDelete }
                       onNumberOfRecordsChange={ this.onNumberOfRecordsChange }
                       numberOfRecords={ this.state.numberOfRecords }
                       usersList={ this.state.usersList }
                       rolesList={ this.state.rolesList }
                       totalPages={ this.state.totalPages }
                       currentPage={ this.state.currentPage }
                       text={ this.props.text }
            />
        </div>
    }
}

AdminUserPage.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired
};

export default AdminUserPage;
