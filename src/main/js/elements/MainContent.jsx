import React                                from 'react';
import { HashRouter, NavLink, Route }       from "react-router-dom";
import { Dropdown, Input, Navbar, NavItem } from "react-materialize";
import PropTypes                            from "prop-types";
import Dishes                               from './dishes/Dishes';
import Products                             from './products/Products';
import User                                 from './users/User';
import Utils                                from "../utils/Utils";
import UserProfilePage                      from "./users/UserProfilePage";

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onLanguageChanged, "onLanguageChanged");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.currentLanguage, "currentLanguage");
        this.state = {header: this.props.text.general.tabUser, currentTab: 'tabUser', isEditMode: false};
        this.onLangSelect = this.onLangSelect.bind(this);
        this.onNavLinkClick = this.onNavLinkClick.bind(this);
        this.onEditModeChange = this.onEditModeChange.bind(this);
    }

    onLangSelect(lang) {
        this.props.onLanguageChanged(lang);
    }

    onEditModeChange(editMode) {
        this.setState({isEditMode: editMode});
    }

    onNavLinkClick(lastTab) {
        this.setState({currentTab: lastTab, header: this.props.text.general[lastTab]});
    }

    render() {
        return <HashRouter>
            <div>
                <Navbar className='light-blue darken-2' brand={ this.state.header } right>
                    <li><Input onChange={ (event, value) => {this.onEditModeChange(value)} } name='group1' type='checkbox' value='white' label={ this.props.text.general.tabEditMode }/></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabUser') } to='/'>{ this.props.text.general.tabUser }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabUserProfile') } to='/userProfile'>{ this.props.text.general.tabUser }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabProducts') } to='/products'>{ this.props.text.general.tabProducts }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabDishes') } to='/dishes'>{ this.props.text.general.tabDishes }</NavLink></li>
                    <li>
                        <Dropdown trigger={ <a> { this.props.currentLanguage }</a> }>
                            { this.props.langList.map(lang => {
                                return <NavItem key={ lang } onClick={ () => {this.onLangSelect(lang)} }>{ lang }</NavItem>
                            }) }
                        </Dropdown>
                    </li>
                    <NavItem href='/logout'>{ this.props.text.general.tabLogout }</NavItem>
                </Navbar>

                <div className='container'>
                    <Route exact path="/" render={ () => { return <User text={ this.props.text }/>} }/>
                    <Route path="/user" render={ () => {return <User text={ this.props.text }/>} }/>
                    <Route path="/userProfile" render={ () => {
                        return <UserProfilePage text={ this.props.text } user={ {
                            age: 25,
                            weight: 82,
                            height: 182,
                            login: "alexK",
                            email: "alex@mail.com",
                            gender: "Male",
                            lastCalculatedEnergy: 1888
                        } }/>
                    } }/>
                    <Route path="/products" render={ () => {return <Products text={ this.props.text } editable={ this.state.isEditMode } numberOfRecords={ 10 }/>} }/>
                    <Route path="/dishes" render={ () => {return <Dishes text={ this.props.text } editable={ true }/>} }/>
                </div>
            </div>
        </HashRouter>
    }
}

MainContent.propTypes = {
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
    onLanguageChanged: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default MainContent;