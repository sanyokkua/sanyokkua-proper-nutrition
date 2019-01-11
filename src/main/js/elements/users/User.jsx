import React      from 'react';
import Calculator from "../calculator/Calculator";
import PropTypes  from "prop-types";

class User extends React.Component {
    render() {
        return <div>
            <Calculator text={ this.props.text }/>
        </div>
    }
}

User.propTypes = {
    text: PropTypes.object.isRequired
};
export default User;
