import React     from 'react';
import { Input } from 'react-materialize';

class ProductTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, value) {
        if (this.props.onValueSelected) {
            this.props.onValueSelected(value);
        }
    }

    render() {
        return this.props.valuesList && this.props.valuesList.length > 0 ? (
            <Input s={ 6 } type='select' label="Product type" defaultValue='1' onChange={ this.onChange }>
                { this.props.valuesList && this.props.valuesList.length > 0 ? (this.props.valuesList.map((type) => {
                    return (<option key={ type.id } value={ type.id }>{ type.name }</option>)
                })) : '' }
            </Input>
        ) : '';
    }
}

export default ProductTypeSelect;