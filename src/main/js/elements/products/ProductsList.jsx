import React                         from 'react';
import { Button, Pagination, Table } from 'react-materialize';
import ProductEdit                   from "./ProductEdit";
import Utils                         from '../../utils/Utils'
import PropTypes                     from "prop-types";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onEditList, "onEditList");
        Utils.checkCallback(this.props.onDeleteFromList, "onDeleteFromList");
        Utils.checkCallback(this.props.onPageChange, "onPageChange");
        Utils.checkCallback(this.props.onRowClick, "onRowClick");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.productsList, "productsList");
        Utils.checkRequiredProperty(this.props.typesList, "typesList");
        Utils.checkRequiredProperty(this.props.editable, "editable");
        Utils.checkRequiredProperty(this.props.totalPages, "totalPages");
        Utils.checkRequiredProperty(this.props.currentPage, "currentPage");

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleEdit(product) {
        this.props.onEditList(product);
    }

    handleDelete(product, e) {
        e.stopPropagation();
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
                    <tr>
                        <th data-field="name">{ this.props.text.productTableHeadName }</th>
                        <th data-field="energy">{ this.props.text.productTableHeadEnergy }</th>
                        <th data-field="typeName">{ this.props.text.productTableHeadType }</th>
                        { this.props.editable ? (<th data-field="edit">Actions</th>) : null }
                    </tr>
                    </thead>
                    <tbody>
                    { (this.props.productsList.map((product) => {
                        return (
                            <tr key={ product.id } onClick={ () => this.handleRowClick(product) }>
                                <td>{ product.name }</td>
                                <td>{ product.energy }</td>
                                <td>{ product.typeName }</td>
                                { this.props.editable ? (
                                    <td>
                                        <ProductEdit text={ this.props.text }
                                                     typesList={ this.props.typesList }
                                                     isCreation={ false }
                                                     onEditClick={ this.handleEdit }
                                                     modalTrigger={ <Button waves='green' className='green darken-1'>{ this.props.text.productButtonEdit }</Button> }
                                                     currentProduct={ product }/>
                                        <Button waves='purple' className='red darken-1' onClick={ (e) => this.handleDelete(product, e) }>{ this.props.text.productButtonDelete }</Button>
                                    </td>) : null }
                            </tr>
                        )
                    }))
                    }
                    </tbody>
                </Table>
                <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.handlePageChange }/>
            </div>
        )
    }
}

ProductsList.propTypes = {
    onEditList: PropTypes.func.isRequired,
    onDeleteFromList: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
    productsList: PropTypes.array.isRequired,
    typesList: PropTypes.array.isRequired,
    editable: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default ProductsList;