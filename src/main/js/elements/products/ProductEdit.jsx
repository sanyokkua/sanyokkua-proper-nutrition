import React                         from 'react';
import { Button, Input, Modal, Row } from 'react-materialize';
import ProductTypeSelect             from "./ProductTypeSelect";
import Utils                         from '../../utils/Utils'
import PropTypes                     from "prop-types";

class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.isCreation, "isCreation");
        Utils.checkRequiredProperty(this.props.typesList, "type list");
        Utils.checkCallback(this.props.onEditClick, "onEditClick");
        let currentProd = this.props.currentProduct ? this.props.currentProduct : {id: null, name: '', energy: ''};
        this.state = {product: currentProd};
        this.onConfirmEditButtonClick = this.onConfirmEditButtonClick.bind(this);
        this.onEditName = this.onEditName.bind(this);
        this.onEditEnergy = this.onEditEnergy.bind(this);
        this.onTypeEdit = this.onTypeEdit.bind(this);
    }

    onConfirmEditButtonClick(product) {
        this.props.onEditClick(product);
    }

    onEditName(event, value) {
        let currentProduct = this.state.product;
        currentProduct.name = value;
        this.setState({product: currentProduct});
    }

    onEditEnergy(event, value) {
        let currentProduct = this.state.product;
        currentProduct.energy = value;
        this.setState({product: currentProduct})
    }

    onTypeEdit(typeId) {
        if (typeId) {
            let currentProduct = this.state.product;
            currentProduct.typeId = typeId;
            this.setState({product: currentProduct})
        }
    }

    render() {
        return <Modal header={ this.props.editorHeader } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button modal="close" waves="light" className="red darken-2" onClick={ () => this.onConfirmEditButtonClick(this.state.product) }>{ this.props.editorHeader }</Button>
                <Button flat modal="close" waves="light">{ this.props.text.products.modalEditProductButtonCancel }</Button>
            </div>
        }>
            <Row>
                <Input s={ 3 } label={ this.props.text.products.modalEditProductInputName } onChange={ this.onEditName } defaultValue={ this.state.product.name }/>
                <Input s={ 3 } type="number" min="0" onChange={ this.onEditEnergy } label={ this.props.text.products.modalEditProductInputEnergy } defaultValue={ this.state.product.energy }/>
                <ProductTypeSelect text={ this.props.text } valuesList={ this.props.typesList } onValueSelected={ this.onTypeEdit } defaultValue={ this.state.product.typeId }/>
            </Row>
        </Modal>
    }
}

ProductEdit.propTypes = {
    onEditClick: PropTypes.func.isRequired,
    text: PropTypes.shape({
                              general: PropTypes.shape({
                                                           tabUser: PropTypes.string.isRequired,
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
                                                      }).isRequired
                          }).isRequired,
    isCreation: PropTypes.bool.isRequired,
    typesList: PropTypes.array.isRequired,
    currentProduct: PropTypes.object,
    modalTrigger: PropTypes.node.isRequired,
    editorHeader: PropTypes.string.isRequired

};
export default ProductEdit;