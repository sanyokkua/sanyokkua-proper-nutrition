import { Button, CardPanel, Input, Modal, Row } from 'react-materialize';
import React                                    from 'react';
import PropTypes                                from 'prop-types';
import CalculatorService                        from '../../services/CalculatorService';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        let user = null;
        let submitState = true;
        if (this.props.user) {
            user = this.props.user;
            submitState = false;
        } else {
            user = {
                age: null,
                height: null,
                weight: null,
                login: null,
                email: null,
                gender: 'male',
                lastCalculatedEnergy: 0
            }
        }
        this.state = {
            user: user,
            formula: 'benedict',
            activity: 'low',
            result: '',
            submitState: submitState
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
        let user = this.state.user;
        user.age = Number(event.target.value);
        this.update({user: user});
    }

    handleHeightChange(event) {
        let user = this.state.user;
        user.height = Number(event.target.value);
        this.update({user: user});
    }

    handleWeightChange(event) {
        let user = this.state.user;
        user.weight = Number(event.target.value);
        this.update({user: user});
    }

    handleGenderChange(event) {
        let user = this.state.user;
        user.gender = event.target.value;
        this.update({user: user});
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
        if (this.state.user.age && this.state.user.height && this.state.user.weight) {
            this.setState({submitState: false});
        } else {
            this.setState({submitState: true});
        }
    }

    handleSubmit(event) {
        CalculatorService.calculate({
                                        age: this.state.user.age,
                                        height: this.state.user.height,
                                        weight: this.state.user.weight,
                                        gender: this.state.user.gender,
                                        formula: this.state.formula,
                                        activity: this.state.activity
                                    }, result => {
            let user = this.state.user;
            user.lastCalculatedEnergy = Number(result);
            this.setState({user: user}, () => {
                if (this.state.user.lastCalculatedEnergy) {
                    if (this.props.onResultCalculated) {
                        window.Materialize.toast(this.state.result, 5000);
                        this.props.onResultCalculated(this.state.user);
                    } else {
                        $('#calcResultModal').modal('open');
                    }
                }
            });
        }, (error, message) => {
            console.log(error);
            window.Materialize.toast(message, 5000);
        });
        event.preventDefault();
    }

    componentDidMount() {
        console.log("did mount");
    }

    componentWillUnmount() {
        console.log("did unmount");
    }

    render() {
        return <div>
            <CardPanel className="blue darken-2 white-text z-depth-3">
                <h3>{ this.props.text.calculator.modalHeaderCalculate }</h3>
                <br/>
                <Row>
                    <Input required type="number" s={ 4 } defaultValue={ this.state.user.age } onChange={ this.handleAgeChange } label={ this.props.text.calculator.age }/>
                    <Input required type="number" s={ 4 } defaultValue={ this.state.user.height } onChange={ this.handleHeightChange } label={ this.props.text.calculator.height }/>
                    <Input required type="number" s={ 4 } defaultValue={ this.state.user.weight } onChange={ this.handleWeightChange } label={ this.props.text.calculator.weight }/>
                    <Input s={ 4 } value={ this.state.user.gender } onChange={ this.handleGenderChange } type='select' label="Gender">
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
                        <Button waves='light'
                                className='green darken-4'
                                disabled={ this.state.submitState }
                                modal={ this.props.isUpdating ? "close" : null }
                                onClick={ this.handleSubmit }>{ this.props.text.calculator.buttonCalculate }</Button>
                        <Modal id='calcResultModal' header={ this.props.text.calculator.modalHeaderCalculate } actions={ <div>
                            <Button flat modal="close" waves="light">{ this.props.text.calculator.modalButtonCancel }</Button>
                        </div>
                        }>
                            <p>{ this.props.text.calculator.modalResultText }{ this.state.user.lastCalculatedEnergy }</p>
                        </Modal>
                    </div>
                </Row>
            </CardPanel>
        </div>
    }
}

Calculator.propTypes = {
    isUpdating: PropTypes.bool.isRequired,
    user: PropTypes.shape({
                              age: PropTypes.number.isRequired,
                              weight: PropTypes.number.isRequired,
                              height: PropTypes.number.isRequired,
                              login: PropTypes.string.isRequired,
                              email: PropTypes.string.isRequired,
                              gender: PropTypes.string.isRequired,
                              lastCalculatedEnergy: PropTypes.number.isRequired
                          }),
    onResultCalculated: PropTypes.func,
    text: PropTypes.shape({
                              general: PropTypes.shape({
                                                           tabUser: PropTypes.string.isRequired,
                                                           tabUserProfile: PropTypes.string.isRequired,
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
                                                      }).isRequired,
                              userProfile: PropTypes.shape({
                                                               inputAge: PropTypes.string.isRequired,
                                                               inputHeight: PropTypes.string.isRequired,
                                                               inputWeight: PropTypes.string.isRequired,
                                                               inputLogin: PropTypes.string.isRequired,
                                                               inputEmail: PropTypes.string.isRequired,
                                                               inputPassword: PropTypes.string.isRequired,
                                                               inputConfirmPassword: PropTypes.string.isRequired,
                                                               selectGender: PropTypes.string.isRequired,
                                                               selectGenderMale: PropTypes.string.isRequired,
                                                               selectGenderFemale: PropTypes.string.isRequired,
                                                               buttonEdit: PropTypes.string.isRequired,
                                                               buttonCancel: PropTypes.string.isRequired,
                                                               buttonEditProfile: PropTypes.string.isRequired,
                                                               buttonUpdate: PropTypes.string.isRequired,
                                                               validationSuccessAge: PropTypes.string.isRequired,
                                                               validationSuccessHeight: PropTypes.string.isRequired,
                                                               validationSuccessWeight: PropTypes.string.isRequired,
                                                               validationSuccessLogin: PropTypes.string.isRequired,
                                                               validationSuccessEmail: PropTypes.string.isRequired,
                                                               validationSuccessPassword: PropTypes.string.isRequired,
                                                               validationSuccessPasswordConfirm: PropTypes.string.isRequired,
                                                               validationErrorAge: PropTypes.string.isRequired,
                                                               validationErrorHeight: PropTypes.string.isRequired,
                                                               validationErrorWeight: PropTypes.string.isRequired,
                                                               validationErrorLogin: PropTypes.string.isRequired,
                                                               validationErrorEmail: PropTypes.string.isRequired,
                                                               validationErrorPassword: PropTypes.string.isRequired,
                                                               validationErrorPasswordConfirm: PropTypes.string.isRequired,
                                                               validationErrorPasswordAndConfirmDiff: PropTypes.string.isRequired,
                                                               validationErrorPasswordLength: PropTypes.string.isRequired,
                                                               userInfoTitle: PropTypes.string.isRequired
                                                           })
                          }).isRequired,
};
export default Calculator;
