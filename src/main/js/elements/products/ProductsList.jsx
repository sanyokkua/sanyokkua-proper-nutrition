import React                         from 'react';
import { Button, Pagination, Table } from 'react-materialize';
import ProductEdit                   from "./ProductEdit";
import Utils                         from '../../utils/Utils'
import PropTypes                     from "prop-types";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onEditList, "onEditList");
        Utils.checkCallback(this.props.onDeleteFromList, "onDeleteFromList");
        Utils.checkCallback(this.props.onPageChange, "onPageChange");
        Utils.checkCallback(this.props.onRowClick, "onRowClick");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.productsList, "productsList");
        Utils.checkRequiredProperty(this.props.typesList, "typesList");
        Utils.checkRequiredProperty(this.props.editable, "editable");
        Utils.checkRequiredProperty(this.props.totalPages, "totalPages");
        Utils.checkRequiredProperty(this.props.currentPage, "currentPage");

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleEdit(product) {
        this.props.onEditList(product);
    }

    handleDelete(product, e) {
        e.stopPropagation();
        this.props.onDeleteFromList(product);
    }

    handlePageChange(pageNumber) {
        this.props.onPageChange(pageNumber);
    }

    handleRowClick(product) {
        this.props.onRowClick(product);
    }

    isProductListExist() {
        return this.props.productsList && this.props.productsList.length > 0;
    }

    render() {
        return this.isProductListExist() ? (
            <div className="black-text">
                <Table hoverable={ true } responsive={ true } bordered={ true }>
                    <thead>
                    <tr>
                        <th data-field="name">{ this.props.text.products.tableHeadName }</th>
                        <th data-field="energy">{ this.props.text.products.tableHeadEnergy }</th>
                        <th data-field="typeName">{ this.props.text.products.tableHeadType }</th>
                        { this.props.editable ? (<th data-field="edit">{ this.props.text.products.tableHeadActions }</th>) : null }
                    </tr>
                    </thead>
                    <tbody>
                    { (this.props.productsList.map((product) => {
                        return (
                            <tr key={ product.productId } onClick={ () => this.handleRowClick(product) }>
                                <td>{ product.name }</td>
                                <td>{ product.energy }</td>
                                <td>{ product.typeName }</td>
                                { this.props.editable ? (
                                    <td>
                                        <ProductEdit text={ this.props.text }
                                                     typesList={ this.props.typesList }
                                                     isCreation={ false }
                                                     editorHeader={ this.props.text.products.buttonEdit }
                                                     onEditClick={ this.handleEdit }
                                                     modalTrigger={ <Button waves='green' className='green darken-1'>{ this.props.text.products.buttonEdit }</Button> }
                                                     currentProduct={ product }/>
                                        <Button waves='purple' className='red darken-1' onClick={ (e) => this.handleDelete(product, e) }>{ this.props.text.products.buttonDelete }</Button>
                                    </td>) : null }
                            </tr>
                        )
                    }))
                    }
                    </tbody>
                </Table>
                <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.handlePageChange }/>
            </div>
        ) : null;
    }
}

ProductsList.propTypes = {
    onEditList: PropTypes.func.isRequired,
    onDeleteFromList: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
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
    productsList: PropTypes.array.isRequired,
    typesList: PropTypes.array.isRequired,
    editable: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default ProductsList;