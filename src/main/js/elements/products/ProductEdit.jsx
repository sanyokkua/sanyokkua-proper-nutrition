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
        this.editorName = this.props.isCreation ? this.props.text.productButtonCreate : this.props.text.productButtonEdit;
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
        return <Modal header={ this.editorName } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button modal="close" waves="light" className="red darken-2" onClick={ () => this.onConfirmEditButtonClick(this.state.product) }>{ this.editorName }</Button>
                <Button flat modal="close" waves="light">{ this.props.text.modalProductCancel }</Button>
            </div>
        }>
            <Row>
                <Input s={ 3 } label={ this.props.text.modalProductInputName } onChange={ this.onEditName } defaultValue={ this.state.product.name }/>
                <Input s={ 3 } type="number" min="0" onChange={ this.onEditEnergy } label={ this.props.text.modalProductInputEnergy } defaultValue={ this.state.product.energy }/>
                <ProductTypeSelect text={ this.props.text } valuesList={ this.props.typesList } onValueSelected={ this.onTypeEdit } defaultValue={ this.state.product.typeId }/>
            </Row>
        </Modal>
    }
}

ProductEdit.propTypes = {
    onEditClick: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
    isCreation: PropTypes.bool.isRequired,
    typesList: PropTypes.array.isRequired,
    currentProduct: PropTypes.object,
    modalTrigger: PropTypes.node.isRequired

};
export default ProductEdit;