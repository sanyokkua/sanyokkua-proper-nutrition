import { Button, CardPanel, Input, Row } from 'react-materialize';
import React                             from 'react';
import PropTypes                         from 'prop-types';
import CalculatorService                 from '../../services/CalculatorService';
import TextPropType                      from "../../utils/TextPropType";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: null,
            height: null,
            weight: null,
            formula: null,
            activity: null,
            gender: null,
            result: null,
            submitState: true,
            formulasList: [],
            gendersList: [],
            activitiesList: [],
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
        this.update({age: Number(event.target.value)});
    }

    handleHeightChange(event) {
        this.update({height: Number(event.target.value)});
    }

    handleWeightChange(event) {
        this.update({weight: Number(event.target.value)});
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
        this.setState(state, this.switchCalculateButtonState);
    }

    switchCalculateButtonState() {
        if (this.state.age && this.state.height && this.state.weight) {
            this.setState({submitState: false});
        } else {
            this.setState({submitState: true});
        }
    }

    handleSubmit(event) {
        const params = {
            age: this.state.age,
            height: this.state.height,
            weight: this.state.weight,
            gender: this.state.gender,
            formula: this.state.formula,
            activity: this.state.activity
        };
        CalculatorService.calculate(params,
                                    result => this.setState({result: Number(result)}),
                                    (error, message) => {
                                        console.log(error);
                                        window.Materialize.toast(message, 5000);
                                    });
        event.preventDefault();
    }

    componentDidMount() {
        console.log("did mount");
        CalculatorService.getFormulas(formulas => {
            this.setState({formulasList: formulas, formula: formulas[0]});
        }, error => {
            console.warn(error);
        });
        CalculatorService.getGenders(genders => {
            this.setState({gendersList: genders, gender: genders[0]});
        }, error => {
            console.warn(error);
        });
        CalculatorService.getActivities(activities => {
            this.setState({activitiesList: activities, activity: activities[0]});
        }, error => {
            console.warn(error);
        });
    }

    componentWillUnmount() {
        console.log("did unmount");
    }

    render() {
        const activity = this.state.activity ? this.state.activity : '';
        const formula = this.state.formula ? this.state.formula : '';
        const gender = this.state.gender ? this.state.gender : '';
        const result = this.state.result ? this.state.result : 0;

        return <CardPanel className="light-blue lighten-5 black-text z-depth-1">
            <h3>{ this.props.text.calculator.modalHeaderCalculate }{ result <= 0 ? null : ' : ' + result }</h3>
            <br/>
            <Row>
                <Input required type="number" s={ 4 } defaultValue={ this.state.age } onChange={ this.handleAgeChange } label={ this.props.text.calculator.age }/>
                <Input required type="number" s={ 4 } defaultValue={ this.state.height } onChange={ this.handleHeightChange } label={ this.props.text.calculator.height }/>
                <Input required type="number" s={ 4 } defaultValue={ this.state.weight } onChange={ this.handleWeightChange } label={ this.props.text.calculator.weight }/>
                <Input s={ 4 } value={ gender } onChange={ this.handleGenderChange } type='select' label={ this.props.text.calculator.gender }>
                    { this.state.gendersList ? this.state.gendersList.map(value => {
                        return <option key={ value } value={ value }>{ value ? this.props.text.calculator[value] : null }</option>
                    }) : null }
                </Input>
                <Input s={ 4 } value={ activity } onChange={ this.handleActivityChange } type='select' label={ this.props.text.calculator.activity }>
                    { this.state.activitiesList ? this.state.activitiesList.map(value => {
                        return <option key={ value } value={ value }>{ value ? this.props.text.calculator[value] : null }</option>
                    }) : null }
                </Input>
                <Input s={ 4 } value={ formula } onChange={ this.handleFormulaChange } type='select' label={ this.props.text.calculator.formula }>
                    { this.state.formulasList ? this.state.formulasList.map(value => {
                        return <option key={ value } value={ value }>{ value ? this.props.text.calculator[value] : null }</option>
                    }) : null }
                </Input>
                <Button waves='light' className='green darken-4' disabled={ this.state.submitState } onClick={ this.handleSubmit }>{ this.props.text.calculator.buttonCalculate }</Button>
            </Row>
        </CardPanel>
    }
}

Calculator.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired
};
export default Calculator;
