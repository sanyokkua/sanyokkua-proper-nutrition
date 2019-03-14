import React              from 'react';
import { CardPanel, Row } from "react-materialize";
import DishesList         from "./DishesList";
import Utils              from "../../utils/Utils";
import PropTypes          from "prop-types";
import SearchForm         from "../common/SearchForm";
import TextPropType       from "../../utils/TextPropType";

class ProfileDishView extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.text, "text");
    }

    render() {
        return <div>
            <CardPanel className="white lighten-1 black-text z-depth-4">
                <Row s={ 12 }><SearchForm onChange={ this.props.onDishSearch }/></Row>
                <DishesList text={ this.props.text }
                            editable={ false }
                            dishList={ this.props.dishList }
                            activePage={ this.props.currentPage }
                            totalPages={ this.props.totalPages }

                            onPageChange={ this.props.onPageChange }
                            onDishCreate={ dish => {} }
                            onDishEdit={ dish => {} }
                            onDishDelete={ dish => {} }
                            onDishSelect={ this.props.onDishSelect }

                />
            </CardPanel>
        </div>
    }
}

ProfileDishView.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,

    dishList: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,

    onDishSelect: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onDishSearch: PropTypes.func.isRequired
};

export default ProfileDishView;
