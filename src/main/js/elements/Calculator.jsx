import { Button, CardPanel, Input, Modal, Row } from 'react-materialize';
import axios                                    from 'axios';

const React = require('react');
const ReactDOM = require('react-dom');

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
        this.setState({age: event.target.value});
        this.switchSubmitButtonState();
    }

    handleHeightChange(event) {
        this.setState({height: event.target.value});
        this.switchSubmitButtonState();
    }

    handleWeightChange(event) {
        this.setState({weight: event.target.value});
        this.switchSubmitButtonState();
    }

    handleGenderChange(event) {
        this.setState({gender: event.target.value});
        this.switchSubmitButtonState();
    }

    handleFormulaChange(event) {
        this.setState({formula: event.target.value});
        this.switchSubmitButtonState();
    }

    handleActivityChange(event) {
        this.setState({activity: event.target.value});
        this.switchSubmitButtonState();
    }

    switchSubmitButtonState() {
        if (this.state.age && this.state.height && this.state.weight) {
            this.setState({submitState: false});
        } else {
            this.setState({submitState: true});
        }
    }

    handleSubmit(event) {
        if (this.state.age && this.state.height && this.state.weight && this.state.gender && this.state.formula && this.state.activity) {
            axios.get('/calc', {
                     params: {
                         age: this.state.age,
                         height: this.state.height,
                         weight: this.state.weight,
                         gender: this.state.gender,
                         formula: this.state.formula,
                         activity: this.state.activity
                     }
                 })
                 .then(response => {
                     console.log(response);
                     this.setState({result: response.data});
                     if (this.state.result) {
                         $('#calcResultModal').modal('open');
                     }
                 })
                 .catch(function (error) {
                     console.log(error);
                 });
        }
        event.preventDefault();
    }

    render() {
        return <div>
            <CardPanel className="blue darken-2 white-text z-depth-3">
                <h3>Calculate your energy for a day</h3>
                <br/>
                <Row>
                    <Input required type="number" s={ 4 } value={ this.state.age } onChange={ this.handleAgeChange } label="Age"/>
                    <Input required type="number" s={ 4 } value={ this.state.height } onChange={ this.handleHeightChange } label="Height"/>
                    <Input required type="number" s={ 4 } value={ this.state.weight } onChange={ this.handleWeightChange } label="Weight"/>
                    <Input s={ 4 } value={ this.state.gender } onChange={ this.handleGenderChange } type='select' label="Gender">
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </Input>
                    <Input s={ 4 } value={ this.state.activity } onChange={ this.handleActivityChange } type='select' label="Activity">
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                        <option value='very_high'>Very High</option>
                    </Input>
                    <Input s={ 4 } value={ this.state.formula } onChange={ this.handleFormulaChange } type='select' label="Formula">
                        <option value='benedict'>Benedict</option>
                        <option value='mifflin'>Mifflin</option>
                    </Input>
                    <div>
                        <Button waves='light' disabled={ this.state.submitState } className='red darken-1' onClick={ this.handleSubmit }>Calculate</Button>
                        <Modal id='calcResultModal' header='Calculated result'>
                            <p>The result is: { this.state.result }</p>
                        </Modal>
                    </div>
                </Row>
            </CardPanel>
        </div>
    }
}

export default Calculator;
