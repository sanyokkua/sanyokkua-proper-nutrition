import React        from 'react';
import { Input }    from "react-materialize";
import PropTypes    from "prop-types";
import TextPropType from "../../../utils/TextPropType";
import Utils        from "../../../utils/Utils";

class RoleSelect extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onRoleSelected, "onRoleSelected");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.rolesList, "rolesList");
        Utils.checkRequiredProperty(this.props.defaultValue, "defaultValue");
        this.onRoleSelected = this.onRoleSelected.bind(this);
    }

    onRoleSelected(event, roleId) {
        this.props.onRoleSelected(roleId);
    }

    render() {
        const isNotEmpty = this.props.rolesList && this.props.rolesList.length > 0;
        const defaultValue = isNotEmpty && this.props.defaultValue ? this.props.defaultValue : this.props.rolesList[0].roleId;
        return isNotEmpty ? <Input s={ 6 } type='select' label={ this.props.text.admin.roleSelect } defaultValue={ defaultValue } onChange={ this.onRoleSelected }>
            { this.props.rolesList.map((role) => <option key={ role.roleId } value={ role.roleId }>{ this.props.text.admin[role.roleName] }</option>) }
        </Input> : null;
    }
}

RoleSelect.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    rolesList: PropTypes.array.isRequired,
    defaultValue: PropTypes.number.isRequired,
    onRoleSelected: PropTypes.func.isRequired
};

export default RoleSelect;
