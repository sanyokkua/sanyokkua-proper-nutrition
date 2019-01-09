import React                         from 'react';
import { Button, Input, Modal, Row } from 'react-materialize';

class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        let currentProd = this.props.currentProduct ? this.props.currentProduct : {id: null, name: '', energy: ''};
        this.state = {product: currentProd, editorType: this.props.isCreation ? 'Create' : 'Edit'};
        this.onConfirmEditButtonClick = this.onConfirmEditButtonClick.bind(this);
        this.onEditName = this.onEditName.bind(this);
        this.onEditEnergy = this.onEditEnergy.bind(this);
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

    render() {
        return <Modal header={ this.state.editorType } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button modal="close" waves="light" className="red darken-2" onClick={ (e) => this.onConfirmEditButtonClick(this.state.product) }>{ this.state.editorType }</Button>
                <Button flat modal="close" waves="light">Cancel</Button>
            </div>
        }>
            <Row>
                <Input s={ 6 } label="Name" onChange={ this.onEditName } defaultValue={ this.state.product.name }/>
                <Input s={ 6 } type="number" min="0" onChange={ this.onEditEnergy } label="Energy" defaultValue={ this.state.product.energy }/>
            </Row>
        </Modal>
    }
}

export default ProductEdit;