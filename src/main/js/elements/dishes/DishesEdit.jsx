import React                                                from 'react';
import { Button, CardPanel, Col, Input, Modal, Row, Table } from "react-materialize";
import PropTypes                                            from "prop-types";
import Products                                             from "../products/Products";
import DishService                                          from "../../services/DishService";
import Utils                                                from "../../utils/Utils";

class DishesEdit extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.modalTrigger, "modalTrigger");
        Utils.checkCallback(this.props.onSave, "onSave");
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
        let resultProducts = this.state.products.map(productInList => {
            if (productInList.id === product.id) {
                productInList.amount = productAmount;
            }
            return productInList;
        });
        let totalEnergy = DishService.calculateTotalEnergy(resultProducts);
        this.setState({products: resultProducts, totalEnergy: totalEnergy}, this.validate);
    }

    onProductRemove(product) {
        let filteredProducts = this.state.products.filter(productFromList => productFromList.id !== product.id);
        let totalEnergy = DishService.calculateTotalEnergy(filteredProducts);
        this.setState({products: filteredProducts, totalEnergy: totalEnergy}, this.validate);
    }

    onProductSelect(product) {
        let filteredProducts = this.state.products.filter(productFromList => productFromList.id === product.id);
        if (filteredProducts.length === 0) {
            let selectedProducts = this.state.products;
            selectedProducts.push(product);
            let totalEnergy = DishService.calculateTotalEnergy(selectedProducts);
            this.setState({products: selectedProducts, totalEnergy: totalEnergy}, this.validate);
        } else {
            window.Materialize.toast("Already in list: " + product.name, 1000);
        }
    }

    onDishSave(event) {
        if (this.state.name && this.state.products && this.state.products.length > 0) {
            let products = [];
            this.state.products.forEach(product => {
                products.push(product);
            });
            let dish = {
                id: this.state.id,
                name: this.state.name,
                products: JSON.stringify(products),
                totalEnergy: this.state.totalEnergy
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
        let isHasAmounts = (this.state && this.state.products && this.state.products.length > 0 && this.state.products.filter(product => !product.amount || product.amount <= 0).length === 0);
        return this.state && this.state.name && this.state.products.length > 0 && isHasAmounts;
    }

    render() {
        return <Modal style={ {width: '100%', height: '100%', maxHeight: '90%'} }
                      fixedFooter
                      header={ this.props.text.dishes.modalEditHeader }
                      trigger={ this.props.modalTrigger }
                      actions={ <div>
                          <Button disabled={ !this.state.isReadyForSave } modal="close" waves="light" className="red darken-2" onClick={ this.onDishSave }>{ this.props.text.dishes.modalEditButtonSave }</Button>
                          <Button flat modal="close" waves="light">{ this.props.text.dishes.modalEditButtonCancel }</Button>
                      </div>
                      }>
            <CardPanel className="white black-text z-depth-4">
                <Row>
                    <Col s={ 6 }>
                        <Row><Col s={ 12 }><h3>{ this.props.text.dishes.modalEditTotalEnergyText }{ this.state.totalEnergy }</h3></Col> </Row>
                        <Row>
                            <Col s={ 6 }>
                                <Input required
                                       label={ this.props.text.dishes.modalEditInputProductName }
                                       onChange={ this.onDishNameChange }
                                       defaultValue={ this.state.name }/>
                            </Col>
                        </Row>
                        <Row/>
                        <Row>
                            <Table>
                                <thead>
                                <tr>
                                    <th data-field="name">{ this.props.text.dishes.tableHeadName }</th>
                                    <th data-field="energy">{ this.props.text.dishes.tableHeadEnergy }</th>
                                    <th data-field="amount">{ this.props.text.dishes.tableHeadAmount }</th>
                                    <th data-field="Remove">{ this.props.text.dishes.modalEditTableHeaderDelete }</th>
                                </tr>
                                </thead>
                                <tbody>
                                { (this.state.products.map((product) => {
                                    return (
                                        <tr key={ product.id }>
                                            <td>{ product.name }</td>
                                            <td>{ product.energy }</td>
                                            <td><Input required
                                                       type="number"
                                                       min="1"
                                                       label={ this.props.text.dishes.modalEditTableInputAmount }
                                                       onChange={ (event, value) => {this.onProductAmountChange(value, product)} }
                                                       defaultValue={ product.amount ? product.amount : null }/>
                                            </td>
                                            <td><Button waves="light"
                                                        className="red darken-2"
                                                        onClick={ () => this.onProductRemove(product) }>{ this.props.text.dishes.buttonDelete }</Button>
                                            </td>
                                        </tr>
                                    )
                                })) }
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <Col s={ 6 }>
                        <Products onProductRowClick={ this.onProductSelect } editable={ false } text={ this.props.text } numberOfRecords={ 5 }/>
                    </Col>
                </Row>
            </CardPanel>
        </Modal>
    }
}

DishesEdit.propTypes = {
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
    modalTrigger: PropTypes.node.isRequired,
    dish: PropTypes.object,
    onSave: PropTypes.func.isRequired
};

export default DishesEdit;
