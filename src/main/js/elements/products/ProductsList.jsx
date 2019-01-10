import React                         from 'react';
import { Button, Pagination, Table } from 'react-materialize';
import ProductEdit                   from "./ProductEdit";
import Utils                         from '../../utils/Utils'

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        let utils = new Utils();
        utils.checkCallback(this.props.onEditList, "onEditList");
        utils.checkCallback(this.props.onDeleteFromList, "onDeleteFromList");
        utils.checkCallback(this.props.onPageChange, "onPageChange");
        utils.checkCallback(this.props.onRowClick, "onRowClick");
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleEdit(product) {
        this.props.onEditList(product);
    }

    handleDelete(product) {
        this.props.onDeleteFromList(product);
    }

    handlePageChange(pageNumber) {
        this.props.onPageChange(pageNumber);
    }

    handleRowClick(product) {
        this.props.onRowClick(product);
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
                            <th data-field="typeName">Type</th>
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
                            <tr key={ product.id } onClick={ () => this.handleRowClick(product) }>
                                <td>{ product.name }</td>
                                <td>{ product.energy }</td>
                                <td>{ product.typeName }</td>
                                <td>
                                    <ProductEdit typesList={ this.props.typesList } isCreation={ false } onEditClick={ this.handleEdit } modalTrigger={ <Button waves='green' className='green darken-1'>Edit</Button> } currentProduct={ product }/>
                                    <Button waves='purple' className='red darken-1' onClick={ (e) => this.handleDelete(product, e) }>Delete</Button>
                                </td>
                            </tr>
                        )
                    })) : this.props.productsList.map((product) => {
                        return (
                            <tr key={ product.id } onClick={ () => this.handleRowClick(product) }>
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