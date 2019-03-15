import React        from 'react';
import { Input }    from "react-materialize";
import PropTypes    from "prop-types";
import TextPropType from "../../../utils/TextPropType";
import Utils        from "../../../utils/Utils";

class GenderSelect extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onGenderSelected, "onGenderSelected");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.gendersList, "gendersList");
        Utils.checkRequiredProperty(this.props.defaultValue, "defaultValue");
        this.onGenderSelected = this.onGenderSelected.bind(this);
    }

    onGenderSelected(event, genderId) {
        this.props.onGenderSelected(genderId);
    }

    render() {
        const isNotEmpty = this.props.gendersList && this.props.gendersList.length > 0;
        const defaultValue = isNotEmpty && this.props.defaultValue ? this.props.gendersList[0].genderId : null;
        return isNotEmpty ? <Input s={ 6 } type='select' label={ this.props.text.admin.genderSelect } defaultValue={ defaultValue } onChange={ this.onGenderSelected }>
            { this.props.gendersList.map((gender) => <option key={ gender.genderId } value={ gender.genderId }>{ this.props.text.admin[gender.genderName] }</option>) }
        </Input> : null;
    }
}

GenderSelect.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    gendersList: PropTypes.array.isRequired,
    onGenderSelected: PropTypes.func.isRequired
};

export default GenderSelect;
