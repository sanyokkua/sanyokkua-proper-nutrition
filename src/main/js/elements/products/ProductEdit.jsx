import React                         from 'react';
import { Button, Input, Modal, Row } from 'react-materialize';
import Utils                         from '../../utils/Utils'
import ProductTypeSelect             from "../product_types/ProductTypeSelect";

class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        let utils = new Utils();
        utils.checkCallback(this.props.onEditClick, "onEditClick");
        utils.checkRequiredProperty(this.props.typesList, "type list");
        let currentProd = this.props.currentProduct ? this.props.currentProduct : {id: null, name: '', energy: ''};
        this.state = {product: currentProd, editorType: this.props.isCreation ? 'Create' : 'Edit'};
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
        return <Modal header={ this.state.editorType } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button modal="close" waves="light" className="red darken-2" onClick={ () => this.onConfirmEditButtonClick(this.state.product) }>{ this.state.editorType }</Button>
                <Button flat modal="close" waves="light">Cancel</Button>
            </div>
        }>
            <Row>
                <Input s={ 3 } label="Name" onChange={ this.onEditName } defaultValue={ this.state.product.name }/>
                <Input s={ 3 } type="number" min="0" onChange={ this.onEditEnergy } label="Energy" defaultValue={ this.state.product.energy }/>
                <ProductTypeSelect valuesList={ this.props.typesList } onValueSelected={ this.onTypeEdit } defaultValue={this.state.product.typeId}/>
            </Row>
        </Modal>
    }
}

export default ProductEdit;