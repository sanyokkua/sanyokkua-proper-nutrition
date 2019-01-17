import React                                                                 from 'react';
import { Button, Col, Collapsible, CollapsibleItem, Pagination, Row, Table } from "react-materialize";
import PropTypes                                                             from "prop-types";
import DishesEdit                                                            from "./DishesEdit";
import Utils                                                                 from "../../utils/Utils";

class DishesList extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
        Utils.checkCallback(this.props.onPageChange, "onPageChange");
        Utils.checkCallback(this.props.onDishCreate, "onDishCreate");
        Utils.checkCallback(this.props.onDishEdit, "onDishEdit");
        Utils.checkCallback(this.props.onDishDelete, "onDishDelete");
        this.onPageChange = this.onPageChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onPageChange(pageNumber) {
        this.props.onPageChange(pageNumber);
    }

    onSave(dish) {
        this.props.onDishEdit(dish);
    }

    onDelete(dish) {
        this.props.onDishDelete(dish);
    }

    isDishListExists() {
        return this.props.dishList && this.props.dishList.length > 0;
    }

    render() {
        return <div>
            <Collapsible popout className="white">
                { this.isDishListExists() ? (this.props.dishList.map(dish => {
                    return <CollapsibleItem key={ dish.id } header={ <Table>
                        <tbody>
                        <tr>
                            <td className="left-align">{ dish.name }</td>
                            <td className="right-align">{ dish.totalEnergy }</td>
                        </tr>
                        </tbody>
                    </Table>
                    }>
                        <Table hoverable responsive bordered className="z-depth-1">
                            <thead>
                            <tr>
                                <th data-field="name">{ this.props.text.dishes.tableHeadName }</th>
                                <th data-field="energy">{ this.props.text.dishes.tableHeadEnergy }</th>
                                <th data-field="amount">{ this.props.text.dishes.tableHeadAmount }</th>
                            </tr>
                            </thead>
                            <tbody>
                            { dish.products.map(product => {
                                return <tr key={ product.id }>
                                    <td className="left-align">{ product.name }</td>
                                    <td>{ product.energy }</td>
                                    <td>{ product.amount }</td>
                                </tr>
                            }) }
                            </tbody>
                        </Table>
                        <Row/>
                        { this.props.editable ? (<Row className="right-align">
                            <Col s={ 6 }/>
                            <Col s={ 3 }>
                                <Button large waves='yellow' className='red darken-4' onClick={ () => this.onDelete(dish) }>
                                    { this.props.text.dishes.buttonDelete }
                                </Button>
                            </Col>
                            <Col s={ 3 }>
                                <DishesEdit text={ this.props.text }
                                            isCreation={ true }
                                            onSave={ this.onSave }
                                            dish={ dish }
                                            modalTrigger={ <Button large={ true } waves='green' className='green darken-2'>{ this.props.text.dishes.buttonEdit } </Button> }
                                />
                            </Col>
                        </Row>) : null
                        }
                    </CollapsibleItem>
                })) : (null) }
            </Collapsible>
            <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.onPageChange }/>
        </div>
    }
}

DishesList.propTypes = {
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
    editable: PropTypes.bool.isRequired,
    dishList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onDishEdit: PropTypes.func.isRequired,
    onDishDelete: PropTypes.func.isRequired,
    onDishCreate: PropTypes.func.isRequired
};

export default DishesList;
