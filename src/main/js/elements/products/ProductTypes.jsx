import React                                from 'react';
import { Button, Input, Modal, Row, Table } from 'react-materialize';
import Utils                                from '../../utils/Utils';
import PropTypes                            from 'prop-types';
import TextPropType                         from "../../utils/TextPropType";

class ProductTypes extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onCreate, "onCreate");
        Utils.checkCallback(this.props.onSave, "onSave");
        Utils.checkCallback(this.props.onDelete, "onDelete");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.productTypes, "productTypes");
        this.state = {newProductType: ''};
        this.onCreateClick = this.onCreateClick.bind(this);
        this.onEditName = this.onEditName.bind(this);
        this.onProductTypeSaveClick = this.onProductTypeSaveClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onEditName(event, value) {
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
            <Modal fixedFooter header={ this.props.text.products.modalEditTypeHeader } trigger={ this.props.modalTrigger } actions={
                <Button flat modal="close" waves="light">Cancel</Button>
            }>
                <div>
                    <Row>
                        <Input s={ 9 } required label={ this.props.text.products.modalEditTypeInputName } onChange={ this.onEditName }/>
                        <Button s={ 3 } large={ true } waves='green' className='green darken-1' onClick={ this.onCreateClick }>{ this.props.text.products.modalEditTypeButtonCreate }</Button>
                    </Row>
                    <Table hoverable={ true } responsive={ true } bordered={ true }>
                        <thead>
                        <tr>
                            <th data-field="name">{ this.props.text.products.modalEditTypeTableHeadName }</th>
                            <th data-field="edit">{ this.props.text.products.modalEditTypeTableHeadEdit }</th>
                            <th data-field="delete">{ this.props.text.products.modalEditTypeTableHeadDelete }</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.productTypes.filter((productType) => productType.name).map((productType) => {
                            return (
                                <tr key={ productType.prodTypeId }>
                                    <td>
                                        <Input s={ 3 } onChange={ (event, value) => productType.name = value } defaultValue={ productType.name }/>
                                    </td>
                                    <td>
                                        <Button waves='red' className='yellow darken-1' onClick={ () => this.onProductTypeSaveClick(productType) }>{ this.props.text.products.modalEditTypeButtonSave }</Button>
                                    </td>
                                    <td>
                                        <Button waves='purple' className='red darken-1' onClick={ () => this.onDeleteClick(productType) }>{ this.props.text.products.buttonDelete }</Button>
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

ProductTypes.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    productTypes: PropTypes.array.isRequired,
    modalTrigger: PropTypes.element.isRequired
};

export default ProductTypes;