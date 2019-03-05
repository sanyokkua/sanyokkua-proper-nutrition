import React        from 'react';
import Calculator   from './Calculator';
import PropTypes    from "prop-types";
import TextPropType from "../../utils/TextPropType";

class CalculatorTab extends React.Component {
    render() {
        return <div>
            <Calculator text={ this.props.text } isUpdating={ false }/>
        </div>
    }
}

CalculatorTab.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired
};
export default CalculatorTab;