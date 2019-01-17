import { Button, CardPanel, Input, Modal, Row } from 'react-materialize';
import React                                    from 'react';
import PropTypes                                from 'prop-types';
import CalculatorService                        from '../../services/CalculatorService';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
            height: '',
            weight: '',
            gender: 'male',
            formula: 'benedict',
            activity: 'low',
            result: '',
            submitState: true
        };

        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleFormulaChange = this.handleFormulaChange.bind(this);
        this.handleActivityChange = this.handleActivityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAgeChange(event) {
        this.update({age: event.target.value});
    }

    handleHeightChange(event) {
        this.update({height: event.target.value});
    }

    handleWeightChange(event) {
        this.update({weight: event.target.value});
    }

    handleGenderChange(event) {
        this.update({gender: event.target.value});
    }

    handleFormulaChange(event) {
        this.update({formula: event.target.value});
    }

    handleActivityChange(event) {
        this.update({activity: event.target.value});
    }

    update(state) {
        this.setState(state, () => {
            if (this.state.age && this.state.height && this.state.weight) {
                this.setState({submitState: false});
            } else {
                this.setState({submitState: true});
            }
        });
    }

    handleSubmit(event) {
        CalculatorService.calculate({
                                        age: this.state.age,
                                        height: this.state.height,
                                        weight: this.state.weight,
                                        gender: this.state.gender,
                                        formula: this.state.formula,
                                        activity: this.state.activity
                                    }, result => {
            this.setState({result: result}, () => {
                if (this.state.result) {
                    $('#calcResultModal').modal('open');
                }
            });
        }, (error, message) => {
            console.log(error);
            window.Materialize.toast(message, 5000);
        });
        event.preventDefault();
    }

    render() {
        return <div>
            <CardPanel className="blue darken-2 white-text z-depth-3">
                <h3>{ this.props.text.calculator.modalHeaderCalculate }</h3>
                <br/>
                <Row>
                    <Input required type="number" s={ 4 } value={ this.state.age } onChange={ this.handleAgeChange } label={ this.props.text.calculator.age }/>
                    <Input required type="number" s={ 4 } value={ this.state.height } onChange={ this.handleHeightChange } label={ this.props.text.calculator.height }/>
                    <Input required type="number" s={ 4 } value={ this.state.weight } onChange={ this.handleWeightChange } label={ this.props.text.calculator.weight }/>
                    <Input s={ 4 } value={ this.state.gender } onChange={ this.handleGenderChange } type='select' label="Gender">
                        <option value='male'>{ this.props.text.calculator.genderMale }</option>
                        <option value='female'>{ this.props.text.calculator.genderFemale }</option>
                    </Input>
                    <Input s={ 4 } value={ this.state.activity } onChange={ this.handleActivityChange } type='select' label={ this.props.text.calculator.activity }>
                        <option value='low'>{ this.props.text.calculator.low }</option>
                        <option value='medium'>{ this.props.text.calculator.medium }</option>
                        <option value='high'>{ this.props.text.calculator.height }</option>
                        <option value='very_high'>{ this.props.text.calculator.very_high }</option>
                    </Input>
                    <Input s={ 4 } value={ this.state.formula } onChange={ this.handleFormulaChange } type='select' label={ this.props.text.calculator.formula }>
                        <option value='benedict'>{ this.props.text.calculator.benedict }</option>
                        <option value='mifflin'>{ this.props.text.calculator.mifflin }</option>
                    </Input>
                    <div>
                        <Button waves='light' disabled={ this.state.submitState } className='red darken-1' onClick={ this.handleSubmit }>{ this.props.text.calculator.buttonCalculate }</Button>
                        <Modal id='calcResultModal' header={ this.props.text.calculator.modalHeaderCalculate } actions={ <div>
                            <Button flat modal="close" waves="light">{ this.props.text.calculator.modalButtonCancel }</Button>
                        </div>
                        }>
                            <p>{ this.props.text.calculator.modalResultText }{ this.state.result }</p>
                        </Modal>
                    </div>
                </Row>
            </CardPanel>
        </div>
    }
}

Calculator.propTypes = {
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
export default Calculator;
