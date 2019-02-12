import React                                from 'react';
import { Button, Input, Pagination, Table } from "react-materialize";
import PropTypes                            from "prop-types";

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
                    <th data-field="login">Login</th>
                    <th data-field="email">Email</th>
                    <th data-field="role">User Role</th>
                    <th data-field="Actions">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>login</td>
                    <td>email</td>
                    <td><Input s={ 12 } type='select' label="Role" defaultValue='0'>
                        <option value='1'>Admin</option>
                        <option value='2'>Content</option>
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
    editable: PropTypes.bool.isRequired,
    totalPages: PropTypes.string.isRequired,
    activePage: PropTypes.string.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default AdminUserPage;
