import { Button, Input, Modal, Row } from 'react-materialize';

const React = require('react');

class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        let currentProd = this.props.currentProduct ? this.props.currentProduct : {id: null, name: '', energy: ''};
        this.state = {
            product: currentProd,
            editorType: this.props.isCreation ? 'Create' : 'Edit'
        };
        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.onEditName = this.onEditName.bind(this);
        this.onEditEnergy = this.onEditEnergy.bind(this);
    }

    onEditButtonClick(product, event) {
        console.log(product);
        console.log(event);
        this.props.onEditClick(product);
    }

    componentDidMount() {

    }

    onEditName(event, value) {
        let prod = this.state.product;
        prod.name = value;
        this.setState({
                          product: prod
                      });
    }

    onEditEnergy(event, value) {
        let prod = this.state.product;
        prod.energy = value;
        this.setState({
                          product: prod
                      })
    }

    render() {
        return <Modal header={ this.state.editorType } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button modal="close" waves="light" className="red darken-2" onClick={ (e) => this.onEditButtonClick(this.state.product, e) }>
                    { this.state.editorType }
                </Button>
                <Button flat modal="close" waves="light">Cancel</Button>
            </div>
        }>
            <Row>
                <Input s={ 6 } label="Name" onChange={ this.onEditName } defaultValue={ this.state.product.name }/>
                <Input s={ 6 } type="number" onChange={ this.onEditEnergy } label="Energy" defaultValue={ this.state.product.energy }/>
            </Row>
        </Modal>
    }
}

export default ProductEdit;