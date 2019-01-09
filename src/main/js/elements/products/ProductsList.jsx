import React                         from 'react';
import { Button, Pagination, Table } from 'react-materialize';
import ProductEdit                   from "./ProductEdit";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleEdit(product) {
        this.props.onEditList(this.props.productsList, product);
    }

    handleDelete(product) {
        this.props.onDeleteFromList(this.props.productsList, product);
    }

    handlePageChange(pageNumber) {
        this.props.onPageChange(pageNumber);
    }

    render() {
        return !this.props.productsList || this.props.productsList.length < 1 ? '' : (
            <div className="black-text">
                <Table hoverable={ true } responsive={ true } bordered={ true }>
                    <thead>
                    { this.props.editable ? (
                        <tr>
                            <th data-field="name">Name</th>
                            <th data-field="energy">Energy</th>
                            <th data-field="edit">Actions</th>
                        </tr>
                    ) : (
                          <tr>
                              <th data-field="name">Name</th>
                              <th data-field="energy">Energy</th>
                          </tr>
                      )
                    }
                    </thead>
                    <tbody>
                    { this.props.editable ? (this.props.productsList.map((product) => {
                        return (
                            <tr key={ product.id }>
                                <td>{ product.name }</td>
                                <td>{ product.energy }</td>
                                <td>
                                    <ProductEdit isCreation={ false } onEditClick={ this.handleEdit } modalTrigger={ <Button waves='green' className='green darken-1'>Edit</Button> } currentProduct={ product }/>
                                    <Button waves='purple' className='red darken-1' onClick={ (e) => this.handleDelete(product, e) }>Delete</Button>
                                </td>
                            </tr>
                        )
                    })) : this.props.productsList.map((product) => {
                        return (
                            <tr key={ product.id }>
                                <td>{ product.name }</td>
                                <td>{ product.energy }</td>
                            </tr>
                        )
                    }) }
                    </tbody>
                </Table>
                <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.handlePageChange }/>
            </div>
        )
    }
}

export default ProductsList;