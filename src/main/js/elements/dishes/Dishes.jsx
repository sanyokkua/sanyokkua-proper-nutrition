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
            <CardPanel className="white lighten-1 black-text z-depth-4">
                <Row>
                    <Col s={ this.props.editable ? 9 : 12 }>
                        <SearchForm onChange={ this.onDishSearch }/>
                    </Col>
                    { this.props.editable ? (
                        <Col s={ 2 }>
                            <DishesEdit text={ this.props.text }
                                        onSave={ this.onDishCreate }
                                        modalTrigger={ <Button large={ true } waves='green' className='green darken-4 white-text'>{ this.props.text.dishes.buttonCreate } </Button> }
                            />
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
    text: PropTypes.shape({
                              general: PropTypes.shape({
                                                           tabUser: PropTypes.string.isRequired,
                                                           tabProducts: PropTypes.string.isRequired,
                                                           tabDishes: PropTypes.string.isRequired,
                                                           tabLogout: PropTypes.string.isRequired,
                                                           tabEditMode: PropTypes.string.isRequired
                                                       }).isRequired,
                              calculator: PropTypes.shape({
                                                              age: PropTypes.string.isRequired,
                                                              height: PropTypes.string.isRequired,
                                                              weight: PropTypes.string.isRequired,
                                                              gender: PropTypes.string.isRequired,
                                                              genderMale: PropTypes.string.isRequired,
                                                              genderFemale: PropTypes.string.isRequired,
                                                              activity: PropTypes.string.isRequired,
                                                              formula: PropTypes.string.isRequired,
                                                              benedict: PropTypes.string.isRequired,
                                                              mifflin: PropTypes.string.isRequired,
                                                              low: PropTypes.string.isRequired,
                                                              medium: PropTypes.string.isRequired,
                                                              high: PropTypes.string.isRequired,
                                                              very_high: PropTypes.string.isRequired,
                                                              buttonCalculate: PropTypes.string.isRequired,
                                                              modalHeaderCalculate: PropTypes.string.isRequired,
                                                              modalResultText: PropTypes.string.isRequired,
                                                              modalButtonCancel: PropTypes.string.isRequired
                                                          }).isRequired,
                              products: PropTypes.shape({
                                                            buttonCreate: PropTypes.string.isRequired,
                                                            buttonProductTypes: PropTypes.string.isRequired,
                                                            buttonLoadCsv: PropTypes.string.isRequired,
                                                            buttonEdit: PropTypes.string.isRequired,
                                                            buttonDelete: PropTypes.string.isRequired,
                                                            inputRecordsNumber: PropTypes.string.isRequired,
                                                            selectType: PropTypes.string.isRequired,
                                                            tableHeadName: PropTypes.string.isRequired,
                                                            tableHeadEnergy: PropTypes.string.isRequired,
                                                            tableHeadType: PropTypes.string.isRequired,
                                                            tableHeadActions: PropTypes.string.isRequired,
                                                            modalEditProductHeadCreate: PropTypes.string.isRequired,
                                                            modalEditProductHeadEdit: PropTypes.string.isRequired,
                                                            modalEditProductInputName: PropTypes.string.isRequired,
                                                            modalEditProductInputEnergy: PropTypes.string.isRequired,
                                                            modalEditProductSelectType: PropTypes.string.isRequired,
                                                            modalEditProductButtonCancel: PropTypes.string.isRequired,
                                                            modalEditTypeHeader: PropTypes.string.isRequired,
                                                            modalEditTypeButtonCancel: PropTypes.string.isRequired,
                                                            modalEditTypeInputName: PropTypes.string.isRequired,
                                                            modalEditTypeButtonCreate: PropTypes.string.isRequired,
                                                            modalEditTypeButtonSave: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadName: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadEdit: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadDelete: PropTypes.string.isRequired
                                                        }).isRequired,
                              dishes: PropTypes.shape({
                                                          buttonCreate: PropTypes.string.isRequired,
                                                          tableHeadName: PropTypes.string.isRequired,
                                                          tableHeadEnergy: PropTypes.string.isRequired,
                                                          tableHeadAmount: PropTypes.string.isRequired,
                                                          buttonEdit: PropTypes.string.isRequired,
                                                          buttonDelete: PropTypes.string.isRequired,
                                                          modalEditHeader: PropTypes.string.isRequired,
                                                          modalEditTotalEnergyText: PropTypes.string.isRequired,
                                                          modalEditInputProductName: PropTypes.string.isRequired,
                                                          modalEditTableHeaderName: PropTypes.string.isRequired,
                                                          modalEditTableHeaderEnergy: PropTypes.string.isRequired,
                                                          modalEditTableHeaderAmount: PropTypes.string.isRequired,
                                                          modalEditTableHeaderDelete: PropTypes.string.isRequired,
                                                          modalEditTableInputAmount: PropTypes.string.isRequired,
                                                          modalEditButtonCancel: PropTypes.string.isRequired,
                                                          modalEditButtonSave: PropTypes.string.isRequired
                                                      }).isRequired
                          }).isRequired
};

export default Dishes;
