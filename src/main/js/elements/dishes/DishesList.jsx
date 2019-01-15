import React                                                                                             from 'react';
import { Button, Col, Collapsible, CollapsibleItem, Collection, CollectionItem, Pagination, Row, Table } from "react-materialize";
import PropTypes                                                                                         from "prop-types";
import DishesEdit                                                                                        from "./DishesEdit";

class DishesList extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.onProductSelect = this.onProductSelect.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onProductSelect(product) {
        window.Materialize.toast("Product name: -- " + product.name, 1000);
    }

    onPageChange(pageNumber) {
        this.props.onPageChange(pageNumber);
    }

    onEdit(dish) {
        this.props.onDishEdit(dish);
    }

    onDelete(dish) {
        this.props.onDishDelete(dish);
    }

    render() {
        return <div>
            <Collapsible popout className="white">
                { this.props.dishList && this.props.dishList.length > 0 ? (this.props.dishList.map(value => {
                        return <CollapsibleItem key={ value.id } header={ <Table>
                            <tbody>
                            <tr>
                                <td className="left-align">{ value.name }</td>
                                <td className="right-align">{ value.totalEnergy }</td>
                            </tr>
                            </tbody>
                        </Table> }>
                            <Collection className="z-depth-1">
                                { value.products.map(item => {
                                    return (<CollectionItem className="hoverable" key={ this.id++ }>
                                        <Table>
                                            <tbody>
                                            <tr>
                                                <td className="left-align">{ item.name }</td>
                                                <td className="right-align">{ item.energy }</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </CollectionItem>)
                                })
                                }
                            </Collection>
                            <Row/>
                            <Row className="right-align">
                                <Col s={ 6 }/>
                                <Col s={ 3 }> <Button large={ true } waves='yellow' className='red darken-4' onClick={ () => this.onDelete(value) }>{ this.props.text.productButtonDelete }</Button></Col>
                                <Col s={ 3 }>
                                    <DishesEdit text={ this.props.text }
                                                isCreation={ true }
                                                onSave={ this.onEdit }
                                                editable={ true }
                                                dish={ value }
                                                modalTrigger={ <Button large={ true } waves='green' className='green darken-2'>{ this.props.text.productButtonEdit } </Button> }
                                    />
                                </Col>
                            </Row>
                        </CollapsibleItem>
                    })

                ) : (null) }
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
