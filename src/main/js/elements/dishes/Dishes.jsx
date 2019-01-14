import React                           from 'react';
import { Button, CardPanel, Col, Row } from "react-materialize";
import DishesList                      from "./DishesList";
import DishService                     from "../../services/DishService";
import Utils                           from "../../utils/Utils";
import PropTypes                       from "prop-types";
import SearchForm                      from "../other/SearchForm";
import DishesEdit                      from "./DishesEdit";

class Dishes extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.editable, "editable");
        this.dishService = new DishService();
        this.state = {
            dishList: [],
            currentPage: 0,
            totalPages: 0,
            name: '',
            numberOfRecords: 10
        };
        this.reloadDishes();
        this.onDishSearch = this.onDishSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onDishCreate = this.onDishCreate.bind(this);
        this.onDishEdit = this.onDishEdit.bind(this);
        this.onDishDelete = this.onDishDelete.bind(this);
    }

    reloadDishes() {
        this.dishService.getDishes({currentPage: this.state.currentPage, name: this.state.name, numberOfRecords: this.state.numberOfRecords},
                                   result => this.setState({dishList: result.content, currentPage: result.currentPage, totalPages: result.totalPages}),
                                   error => console.log(error));
    }

    onDishSearch(value) {
        this.setState({name: value, currentPage: 0, totalPages: 0}, () => {
            window.Materialize.toast(value, 1000);
            this.reloadDishes();
        });
    }

    onPageChange(pageNumber) {
        if (pageNumber) {
            this.setState({currentPage: pageNumber}, this.reloadDishes);
        }
    }

    onDishCreate(dish) {
        this.dishService.createDish(dish, () => {
            this.reloadDishes();
        }, error => console.log(error));
    }

    onDishEdit(dish) {
        this.dishService.updateDish(dish, () => {
            this.reloadDishes();
        }, error => console.log(error));
    }

    onDishDelete(dish) {
        this.dishService.deleteDish(dish, () => {
            this.reloadDishes();
        }, error => console.log(error));
    }

    render() {
        return <div>
            <CardPanel className="green lighten-1 black-text z-depth-4">
                <Row>
                    <Col s={ this.props.editable ? 9 : 12 }>
                        <SearchForm onChange={ this.onDishSearch }/>
                    </Col>
                    { this.props.editable ? (
                        <Col s={ 2 }>
                            <DishesEdit text={ this.props.text } modalTrigger={ <Button large={ true } waves='green' className='green darken-4 white-text'>{ this.props.text.productButtonCreate } </Button> } isCreation={ true }
                                        onSave={ this.onDishCreate }/>
                        </Col>
                    ) : null }
                </Row>

                <DishesList text={ this.props.text }
                            editable={ this.props.editable }
                            dishList={ this.state.dishList }
                            totalPages={ this.state.totalPages }
                            activePage={ this.state.currentPage }
                            onPageChange={ this.onPageChange }
                            onDishCreate={ this.onDishCreate }
                            onDishEdit={ this.onDishEdit }
                            onDishDelete={ this.onDishDelete }
                />

            </CardPanel>
        </div>
    }
}

Dishes.propTypes = {
    editable: PropTypes.bool.isRequired,
    text: PropTypes.object.isRequired
};

export default Dishes;
