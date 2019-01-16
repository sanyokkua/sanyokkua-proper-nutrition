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
                                <th data-field="name">{ this.props.text.productTableHeadName }</th>
                                <th data-field="energy">{ this.props.text.productTableHeadEnergy }</th>
                                <th data-field="amount">Amount</th>
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
                                    { this.props.text.productButtonDelete }
                                </Button>
                            </Col>
                            <Col s={ 3 }>
                                <DishesEdit text={ this.props.text }
                                            isCreation={ true }
                                            onSave={ this.onSave }
                                            dish={ dish }
                                            modalTrigger={ <Button large={ true } waves='green' className='green darken-2'>{ this.props.text.productButtonEdit } </Button> }
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
    text: PropTypes.object.isRequired,
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
