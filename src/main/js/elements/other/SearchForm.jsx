import React     from 'react';
import PropTypes from "prop-types";
import { Icon }  from "react-materialize";
import Utils     from "../../utils/Utils";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onChange, "onChange");
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onChange(event.target.value);
        event.preventDefault();
    }

    render() {
        return <nav>
            <div className="nav-wrapper">
                <form>
                    <div className="input-field">
                        <input id="search" type="search" onChange={ this.onChange }/>
                        <label htmlFor="search">
                            <Icon>search</Icon>
                        </label>
                        <Icon>close</Icon>
                    </div>
                </form>
            </div>
        </nav>
    }
}

SearchForm.propTypes = {
    onChange: PropTypes.func.isRequired
};
export default SearchForm;