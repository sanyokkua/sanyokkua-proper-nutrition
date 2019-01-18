import React                                from 'react';
import { Button, Input, Modal, Row, Table } from 'react-materialize';
import Utils                                from '../../utils/Utils';
import PropTypes                            from 'prop-types';

class ProductTypes extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onCreate, "onCreate");
        Utils.checkCallback(this.props.onSave, "onSave");
        Utils.checkCallback(this.props.onDelete, "onDelete");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.productTypes, "productTypes");
        this.state = {newProductType: ''};
        this.onCreateClick = this.onCreateClick.bind(this);
        this.onEditName = this.onEditName.bind(this);
        this.onProductTypeSaveClick = this.onProductTypeSaveClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onEditName(event, value) {
        this.setState({newProductType: value});
    }

    onCreateClick() {
        if (this.state.newProductType) {
            this.props.onCreate({id: 0, name: this.state.newProductType}, () => {
                window.Materialize.toast("Created type with name: " + this.state.newProductType, 1000);
            }, () => {
                window.Materialize.toast("Error with creating: " + this.state.newProductType, 4000);
            });
        } else {
            window.Materialize.toast("Name can't be empty ", 1000);
        }
    }

    onProductTypeSaveClick(productType) {
        this.props.onSave(productType, () => {
            window.Materialize.toast("Saved type with name: " + productType.name, 1000);
        }, () => {
            window.Materialize.toast("Error with saving: " + productType.name, 4000);
        });
    }

    onDeleteClick(productType) {
        this.props.onDelete(productType, () => {
            window.Materialize.toast("Deleted type with name: " + productType.name, 1000);
        }, () => {
            window.Materialize.toast("Error with deleting: " + productType.name, 4000);
        });
    }

    render() {
        return !this.props.productTypes || this.props.productTypes.length < 1 ? '' : (
            <Modal fixedFooter header={ this.props.text.products.modalEditTypeHeader } trigger={ this.props.modalTrigger } actions={
                <Button flat modal="close" waves="light">Cancel</Button>
            }>
                <div>
                    <Row>
                        <Input s={ 9 } required label={ this.props.text.products.modalEditTypeInputName } onChange={ this.onEditName }/>
                        <Button s={ 3 } large={ true } waves='green' className='green darken-1' onClick={ this.onCreateClick }>{ this.props.text.products.modalEditTypeButtonCreate }</Button>
                    </Row>
                    <Table hoverable={ true } responsive={ true } bordered={ true }>
                        <thead>
                        <tr>
                            <th data-field="name">{ this.props.text.products.modalEditTypeTableHeadName }</th>
                            <th data-field="edit">{ this.props.text.products.modalEditTypeTableHeadEdit }</th>
                            <th data-field="delete">{ this.props.text.products.modalEditTypeTableHeadDelete }</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.productTypes.filter((productType) => productType.name).map((productType) => {
                            return (
                                <tr key={ productType.id }>
                                    <td>
                                        <Input s={ 3 } onChange={ (event, value) => productType.name = value } defaultValue={ productType.name }/>
                                    </td>
                                    <td>
                                        <Button waves='red' className='yellow darken-1' onClick={ () => this.onProductTypeSaveClick(productType) }>{ this.props.text.products.modalEditTypeButtonSave }</Button>
                                    </td>
                                    <td>
                                        <Button waves='purple' className='red darken-1' onClick={ () => this.onDeleteClick(productType) }>{ this.props.text.products.buttonDelete }</Button>
                                    </td>
                                </tr>
                            )
                        }) }
                        </tbody>
                    </Table>
                </div>
            </Modal>

        )
    }
}

ProductTypes.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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
    productTypes: PropTypes.array.isRequired,
    modalTrigger: PropTypes.element.isRequired
};

export default ProductTypes;