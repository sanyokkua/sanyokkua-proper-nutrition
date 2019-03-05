import React        from 'react';
import { Input }    from 'react-materialize';
import Utils        from '../../utils/Utils'
import PropTypes    from "prop-types";
import TextPropType from "../../utils/TextPropType";

class ProductTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.valuesList, "valuesList");
        Utils.checkCallback(this.props.onValueSelected, "onValueSelected");
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, value) {
        let filter = this.props.valuesList.filter(type => type.prodTypeId === Number(value));
        this.props.onValueSelected(filter.pop());
    }

    render() {
        return this.props.valuesList && this.props.valuesList.length > 0 ? (
            <Input s={ 6 } type='select' label={ this.props.text.products.tableHeadType } defaultValue={ this.props.defaultValue ? this.props.defaultValue : 0 } onChange={ this.onChange }>
                { this.props.valuesList && this.props.valuesList.length > 0 ? (this.props.valuesList.map((type) => {
                    return (<option key={ type.prodTypeId } value={ type.prodTypeId }>{ type.name }</option>)
                })) : null }
            </Input>
        ) : null
    }
}

ProductTypeSelect.propTypes = {
    onValueSelected: PropTypes.func.isRequired,
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    valuesList: PropTypes.array.isRequired
};
export default ProductTypeSelect;