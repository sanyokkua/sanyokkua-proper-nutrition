import React        from 'react';
import PropTypes    from "prop-types";
import TextPropType from "../../utils/TextPropType";

class User extends React.Component {
    render() {
        return <div>
        </div>
    }
}

User.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired
};
export default User;
