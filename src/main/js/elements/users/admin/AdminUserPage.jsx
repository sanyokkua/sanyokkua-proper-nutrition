import React                                from 'react';
import { Button, Input, Pagination, Table } from "react-materialize";
import PropTypes                            from "prop-types";
import TextPropType                         from "../../../utils/TextPropType";

class AdminUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onPageChange(pageNumber) {
    }

    onSave() {
    }

    onDelete() {
    }

    render() {
        return <div>
            <Table>
                <thead>
                <tr>
                    <th data-field="email">Email</th>
                    <th data-field="role">User Role</th>
                    <th data-field="Actions">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>email</td>
                    <td><Input s={ 12 } type='select' label="Role" defaultValue='0'>
                        <option value='1'>Admin</option>
                        <option value='2'>Manager</option>
                        <option value='3'>User</option>
                    </Input></td>
                    <td>
                        <Button waves='purple' className='red darken-4 white-text' onClick={ this.onDelete }>Delete</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
            <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.onPageChange }/>
        </div>
    }
}

AdminUserPage.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired
};

export default AdminUserPage;
