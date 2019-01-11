import { Button, CardPanel, Input, Modal, Row } from 'react-materialize';
import React                                    from 'react';
import CalculatorService                        from '../../services/CalculatorService';
import PropTypes                                from 'prop-types'

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
                <h3>{ this.props.text.calcHeader }</h3>
                <br/>
                <Row>
                    <Input required type="number" s={ 4 } value={ this.state.age } onChange={ this.handleAgeChange } label={ this.props.text.calcInputAgeTip }/>
                    <Input required type="number" s={ 4 } value={ this.state.height } onChange={ this.handleHeightChange } label={ this.props.text.calcInputHeightTip }/>
                    <Input required type="number" s={ 4 } value={ this.state.weight } onChange={ this.handleWeightChange } label={ this.props.text.calcInputWeightTip }/>
                    <Input s={ 4 } value={ this.state.gender } onChange={ this.handleGenderChange } type='select' label="Gender">
                        <option value='male'>{ this.props.text.calcGenderMale }</option>
                        <option value='female'>{ this.props.text.calcGenderFemale }</option>
                    </Input>
                    <Input s={ 4 } value={ this.state.activity } onChange={ this.handleActivityChange } type='select' label={ this.props.text.calcComboActivityTip }>
                        <option value='low'>{ this.props.text.calcActivityLow }</option>
                        <option value='medium'>{ this.props.text.calcActivityMedium }</option>
                        <option value='high'>{ this.props.text.calcActivityHigh }</option>
                        <option value='very_high'>{ this.props.text.calcActivityVeryHigh }</option>
                    </Input>
                    <Input s={ 4 } value={ this.state.formula } onChange={ this.handleFormulaChange } type='select' label={ this.props.text.calcComboFormulaTip }>
                        <option value='benedict'>{ this.props.text.calcFormulaBenedict }</option>
                        <option value='mifflin'>{ this.props.text.calcFormulaMifflin }</option>
                    </Input>
                    <div>
                        <Button waves='light' disabled={ this.state.submitState } className='red darken-1' onClick={ this.handleSubmit }>{ this.props.text.calcButtonCalc }</Button>
                        <Modal id='calcResultModal' header={ this.props.text.calcModalHeaderResult }>
                            <p>{ this.props.text.calcResult }{ this.state.result }</p>
                        </Modal>
                    </div>
                </Row>
            </CardPanel>
        </div>
    }
}

Calculator.propTypes = {
    text: PropTypes.object.isRequired
};
export default Calculator;
