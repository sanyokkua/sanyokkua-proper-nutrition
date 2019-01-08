import { Button, Col, Pagination, Row, Table } from 'react-materialize';
import ProductEdit                             from "./ProductEdit";

const React = require('react');

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit(product, event) {
        console.log(product);
        console.log(event);
        this.props.onEditList(this.props.productsList, product, event);
    }

    handleDelete(product, event) {
        console.log(product);
        console.log(event);
        this.props.onDeleteFromList(this.props.productsList, product, event);
    }

    componentDidMount() {
    }

    render() {
        return !this.props.productsList || this.props.productsList.length < 1 ? ('') :
               (<div className="black-text">
                   <Table hoverable={ true } responsive={ true }>
                       <thead>
                       { this.props.editable ? (<tr>
                           <th data-field="name">Name</th>
                           <th data-field="energy">Energy</th>
                           <th data-field="edit">Actions</th>
                       </tr>) : (<tr>
                           <th data-field="name">Name</th>
                           <th data-field="energy">Energy</th>
                       </tr>) }
                       </thead>
                       <tbody>
                       { this.props.editable ? (this.props.productsList.map((product) => {
                           return <tr key={ product.id }>
                               <td>{ product.name }</td>
                               <td>{ product.energy }</td>
                               <td>
                                   <Row>
                                       <Col s={ 3 }>
                                           <ProductEdit isCreation={ false } onEditClick={ this.handleEdit } modalTrigger={ <Button waves='green' className='green darken-1'>Edit</Button> } currentProduct={ product }/>
                                       </Col>
                                       <Col s={ 3 }>
                                           <Button waves='purple' className='red darken-1' onClick={ (e) => this.handleDelete(product, e) }>Delete</Button>
                                       </Col>
                                   </Row>
                               </td>
                           </tr>
                       })) : this.props.productsList.map((product) => {
                           return <tr key={ product.id }>
                               <td>{ product.name }</td>
                               <td>{ product.energy }</td>
                           </tr>
                       }) }
                       </tbody>
                   </Table>
                   <div className='container black-text '>
                       <Pagination className='center-align' items={ 10 } activePage={ 1 } maxButtons={ this.props.productsList.length / 10 }/>
                   </div>
               </div>)
    }
}

export default ProductsList;