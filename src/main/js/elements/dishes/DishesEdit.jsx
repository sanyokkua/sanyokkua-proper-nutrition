import React                                                from 'react';
import { Button, CardPanel, Col, Input, Modal, Row, Table } from "react-materialize";
import PropTypes                                            from "prop-types";
import Products                                             from "../products/Products";

class DishesEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProducts: [],
            totalEnergy: 0,
            name: ''
        };
        this.onProductSelect = this.onProductSelect.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNameChange(event, value) {
        this.setState({name: value});
    }

    onProductSelect(product) {
        let selectedProducts = this.state.selectedProducts;
        selectedProducts.push(product);
        let total = 0;
        selectedProducts.forEach(value => {total += value.energy});
        this.setState({
                          selectedProducts: selectedProducts,
                          totalEnergy: total
                      }, () => {
            window.Materialize.toast("Product name: -- " + product.name, 1000);
        });

    }

    onSave(event, value) {
        if (this.state.name && this.state.selectedProducts && this.state.selectedProducts.length > 0) {
            let products = {};
            this.state.selectedProducts.forEach(product => {
                products[product.name] = product.energy;
            });
            let dish = {
                name: this.state.name,
                products: JSON.stringify(products)
            };
            this.props.onSave(dish);

        } else {
            event.preventDefault();
        }

    }

    render() {
        return <Modal className="max-height: 100%" fixedFooter header={ "Editor" } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button modal="close" waves="light" className="red darken-2" onClick={ this.onSave }>{ this.props.text.modalProdTypeBtnSave }</Button>
                <Button flat modal="close" waves="light">{ this.props.text.modalProductCancel }</Button>
            </div>
        }>
            <CardPanel className="green lighten-1 black-text z-depth-4">
                <Row>
                    <Col s={ 6 } className=''>
                        <Row>
                            <Col s={ 3 }>
                                <Input required label={ this.props.text.modalProductInputName } onChange={ this.onNameChange } defaultValue={ this.state.name }/>
                            </Col>
                            <Col s={ 6 }><h3>{ this.state.totalEnergy }</h3></Col>
                        </Row>
                        <Row/>
                        <Row>
                            <Table>
                                <thead>
                                <tr>
                                    <th data-field="name">{ this.props.text.productTableHeadName }</th>
                                    <th data-field="energy">{ this.props.text.productTableHeadEnergy }</th>
                                </tr>
                                </thead>
                                <tbody>
                                { (this.state.selectedProducts.map((product) => {
                                    return (
                                        <tr key={ product.id } onClick={ () => window.Materialize.toast("Selected product name: -- " + product.name, 1000) }>
                                            <td>{ product.name }</td>
                                            <td>{ product.energy }</td>
                                        </tr>
                                    )
                                }))
                                }
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <Col s={ 6 } className=''>
                        <Products onProductRowClick={ this.onProductSelect } editable={ false } text={ this.props.text }/>
                    </Col>
                </Row>
            </CardPanel>
        </Modal>
    }
}

DishesEdit.propTypes = {
    text: PropTypes.object.isRequired,
    modalTrigger: PropTypes.node.isRequired,
    isCreation: PropTypes.bool.isRequired,
    dish: PropTypes.object,
    onSave: PropTypes.func.isRequired
};

export default DishesEdit;
