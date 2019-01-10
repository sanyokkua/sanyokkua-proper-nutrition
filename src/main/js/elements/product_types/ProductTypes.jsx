import React                                from 'react';
import { Button, Input, Modal, Row, Table } from 'react-materialize';
import Utils                                from '../../utils/Utils'

class ProductTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newProductType: ''
        };
        let utils = new Utils();
        utils.checkCallback(this.props.onCreate, "onCreate");
        utils.checkCallback(this.props.onSave, "onSave");
        utils.checkCallback(this.props.onDelete, "onDelete");
        this.onCreateClick = this.onCreateClick.bind(this);
        this.onEditNewProductNameClick = this.onEditNewProductNameClick.bind(this);
        this.onProductTypeSaveClick = this.onProductTypeSaveClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onEditNewProductNameClick(event, value) {
        this.setState({newProductType: value});
    }

    onCreateClick() {
        if (this.state.newProductType) {
            this.props.onCreate({id: 0, name: this.state.newProductType}, () => {
                window.Materialize.toast("Created type with name: " + this.state.newProductType, 1000);
            }, () => {
                window.Materialize.toast("Error with creating: " + this.state.newProductType, 4000);
            });
        } else {
            window.Materialize.toast("Name can't be empty ", 1000);
        }
    }

    onProductTypeSaveClick(productType) {
        this.props.onSave(productType, () => {
            window.Materialize.toast("Saved type with name: " + productType.name, 1000);
        }, () => {
            window.Materialize.toast("Error with saving: " + productType.name, 4000);
        });
    }

    onDeleteClick(productType) {
        this.props.onDelete(productType, () => {
            window.Materialize.toast("Deleted type with name: " + productType.name, 1000);
        }, () => {
            window.Materialize.toast("Error with deleting: " + productType.name, 4000);
        });
    }

    render() {
        return !this.props.productTypes || this.props.productTypes.length < 1 ? '' : (
            <Modal header={ "ProductType" } trigger={ this.props.modalTrigger } actions={
                <Button flat modal="close" waves="light">Cancel</Button>
            }>
                <div>
                    <Row>
                        <Input s={ 9 } required label="Name" onChange={ this.onEditNewProductNameClick }/>
                        <Button s={ 3 } large={ true } waves='green' className='green darken-1' onClick={ this.onCreateClick }>Create</Button>
                    </Row>
                    <Table hoverable={ true } responsive={ true } bordered={ true }>
                        <thead>
                        <tr>
                            <th data-field="name">Name</th>
                            <th data-field="edit">Edit</th>
                            <th data-field="delete">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.productTypes.filter((productType) => productType.name).map((productType) => {
                            return (
                                <tr key={ productType.id }>
                                    <td>
                                        <Input s={ 3 } onChange={ (event, value) => productType.name = value } defaultValue={ productType.name }/>
                                    </td>
                                    <td>
                                        <Button waves='red' className='yellow darken-1' onClick={ () => this.onProductTypeSaveClick(productType) }>Save</Button>
                                    </td>
                                    <td>
                                        <Button waves='purple' className='red darken-1' onClick={ () => this.onDeleteClick(productType) }>Delete</Button>
                                    </td>
                                </tr>
                            )
                        }) }
                        </tbody>
                    </Table>
                </div>
            </Modal>

        )
    }
}

export default ProductTypes;