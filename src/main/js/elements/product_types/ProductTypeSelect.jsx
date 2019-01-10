import React     from 'react';
import { Input } from 'react-materialize';
import Utils     from '../../utils/Utils'

class ProductTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        new Utils().checkCallback(this.props.onValueSelected, "onValueSelected");
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, value) {
        this.props.onValueSelected(value);
    }

    render() {
        return this.props.valuesList && this.props.valuesList.length > 0 ? (
            <Input s={ 6 } type='select' label="Product type" defaultValue={ this.props.defaultValue ? this.props.defaultValue : 0 } onChange={ this.onChange }>
                { this.props.valuesList && this.props.valuesList.length > 0 ? (this.props.valuesList.map((type) => {
                    return (<option key={ type.id } value={ type.id }>{ type.name }</option>)
                })) : '' }
            </Input>
        ) : '';
    }
}

export default ProductTypeSelect;