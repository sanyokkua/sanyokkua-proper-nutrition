import React                                                from 'react';
import { Button, CardPanel, Col, Input, Modal, Row, Table } from "react-materialize";
import PropTypes                                            from "prop-types";
import Products                                             from "../products/Products";
import DishService                                          from "../../services/DishService";

class DishesEdit extends React.Component {
    constructor(props) {
        super(props);
        let currentDish = {
            id: null,
            name: '',
            products: [],
            totalEnergy: 0
        };
        if (this.props.dish) {
            currentDish = this.props.dish;
        }
        this.state = {
            id: currentDish.id,
            name: currentDish.name,
            products: currentDish.products,
            totalEnergy: currentDish.totalEnergy,
            isReadyForSave: this.isValid()
        };
        this.onDishNameChange = this.onDishNameChange.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
        this.onDishSave = this.onDishSave.bind(this);
        this.onProductAmountChange = this.onProductAmountChange.bind(this);
        this.onProductRemove = this.onProductRemove.bind(this);
    }

    onDishNameChange(event, value) {
        this.setState({name: value}, this.validate);
    }

    onProductAmountChange(productAmount, product) {
        let resultList = this.state.products.map(productInList => {
            if (productInList.id === product.id) {
                productInList.amount = productAmount;
            }
            return productInList;
        });
        let totalEnergy = DishService.calculateTotalEnergy(resultList);
        this.setState({products: resultList, totalEnergy: totalEnergy}, this.validate);
    }

    onProductRemove(product) {
        let filteredCollection = this.state.products.filter(value => value.id !== product.id);
        let totalEnergy = DishService.calculateTotalEnergy(filteredCollection);
        this.setState({products: filteredCollection, totalEnergy: totalEnergy}, this.validate);
    }

    onProductSelect(product) {
        let filteredCollection = this.state.products.filter(value => value.id === product.id);
        if (filteredCollection.length === 0) {
            let selectedProducts = this.state.products;
            selectedProducts.push(product);
            let total = DishService.calculateTotalEnergy(selectedProducts);
            this.setState({products: selectedProducts, totalEnergy: total}, this.validate);
        } else {
            window.Materialize.toast("Already in list: " + product.name, 1000);
        }

    }

    onDishSave(event, value) {
        if (this.state.name && this.state.products && this.state.products.length > 0) {
            let products = [];
            this.state.products.forEach(product => {
                products.push(product);
            });
            let dish = {
                id: this.state.id,
                name: this.state.name,
                products: JSON.stringify(products)
            };
            this.props.onSave(dish);

        } else {
            event.preventDefault();
        }

    }

    validate() {
        this.setState({isReadyForSave: this.isValid()});
    }

    isValid() {
        return this.state && this.state.name && this.state.products.length > 0;
    }

    render() {
        return <Modal style={ {width: '100%', height: '100%', maxHeight: '90%'} } className="max-height: 100%" fixedFooter header={ "Editor" } trigger={ this.props.modalTrigger } actions={
            <div>
                <Button disabled={ !this.state.isReadyForSave } modal="close" waves="light" className="red darken-2" onClick={ this.onDishSave }>{ this.props.text.modalProdTypeBtnSave }</Button>
                <Button flat modal="close" waves="light">{ this.props.text.modalProductCancel }</Button>
            </div>
        }>
            <CardPanel className="white black-text z-depth-4">
                <Row>
                    <Col s={ 6 } className=''>
                        <Row><Col s={ 12 }><h3 className="">Total energy: { this.state.totalEnergy }</h3></Col> </Row>
                        <Row>
                            <Col s={ 6 }>
                                <Input className="" required label={ this.props.text.modalProductInputName } onChange={ this.onDishNameChange } defaultValue={ this.state.name }/>
                            </Col>
                        </Row>
                        <Row/>
                        <Row>
                            <Table>
                                <thead>
                                <tr>
                                    <th data-field="name">{ this.props.text.productTableHeadName }</th>
                                    <th data-field="energy">{ this.props.text.productTableHeadEnergy }</th>
                                    <th data-field="amount">Size</th>
                                    <th data-field="Remove">{ this.props.text.productButtonDelete }</th>
                                </tr>
                                </thead>
                                <tbody>
                                { (this.state.products.map((product) => {
                                    return (
                                        <tr key={ product.id } onClick={ () => window.Materialize.toast("Selected product name: -- " + product.name, 1000) }>
                                            <td>{ product.name }</td>
                                            <td>{ product.energy }</td>
                                            <td><Input type="number" min="1" className="" required label="Size" onChange={ (event, value) => {this.onProductAmountChange(value, product)} } defaultValue={ product.amount ? product.amount :0 }/></td>
                                            <td><Button waves="light" className="red darken-2" onClick={ () => this.onProductRemove(product) }>{ this.props.text.productButtonDelete }</Button></td>
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
