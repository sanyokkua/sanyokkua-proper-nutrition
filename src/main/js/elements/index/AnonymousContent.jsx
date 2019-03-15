import React                          from 'react';
import { HashRouter, NavLink, Route } from "react-router-dom";
import { Dropdown, Navbar, NavItem }  from "react-materialize";
import PropTypes                      from "prop-types";
import Products                       from "../products/Products";
import Dishes                         from "../dishes/Dishes";
import TextPropType                   from "../../utils/TextPropType";
import CalculatorTab                  from "../calculator/CalculatorTab";
import Login                          from "../users/Login";
import Registration                   from "../users/Registration";

class AnonymousContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: this.props.text.general.tabProducts,
            currentTab: 'tabProducts'
        };
        this.onLangSelect = this.onLangSelect.bind(this);
        this.onNavLinkClick = this.onNavLinkClick.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
    }

    onLangSelect(lang) {
        this.props.onLanguageChanged(lang);
    }

    onNavLinkClick(lastTab) {
        this.setState({currentTab: lastTab, header: this.props.text.general[lastTab]});
    }

    onLoginSuccess(userId) {
        console.log("AnonymousContent.onLoginSuccess: " + userId ? JSON.stringify(userId) : null);
        if (userId) {
            this.props.onUserLoggedIn(userId);
        }
    }

    render() {
        const languages = this.props.langList.map(lang => {return <NavItem key={ lang } onClick={ () => {this.onLangSelect(lang)} }>{ lang }</NavItem>});
        const loginRegister = [
            <Login key={ "login" } text={ this.props.text } loginButtonTrigger={ <a className='light-blue darken-2'> { this.props.text.admin.headerLogin }</a> } onLoginSuccess={ this.onLoginSuccess }/>,
            <Registration key={ "registration" } text={ this.props.text } loginButtonTrigger={ <a className='light-blue darken-2'> { this.props.text.admin.headerRegistration }</a> } onLoginSuccess={ this.onLoginSuccess }/>,
        ];
        return <HashRouter>
            <div>
                <Navbar className='light-blue darken-2' brand={ this.state.header } right>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabProducts') } to='/products'>{ this.props.text.general.tabProducts }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabDishes') } to='/dishes'>{ this.props.text.general.tabDishes }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabCalculator') } to='/calculator'>{ this.props.text.general.tabCalculator }</NavLink></li>
                    <li><Dropdown trigger={ <a> { this.props.currentLanguage }</a> }>{ languages }</Dropdown></li>
                    <li><Dropdown trigger={ <a> { this.props.text.admin.headerLogin } </a> }>{ loginRegister }</Dropdown></li>
                </Navbar>
                <div className='container'>
                    <Route exact path="/products" render={ () => {return <Products text={ this.props.text } editable={ false } numberOfRecords={ 10 }/>} }/>
                    <Route path="/dishes" render={ () => {return <Dishes text={ this.props.text } editable={ false }/>} }/>
                    <Route path="/calculator" render={ () => {return <CalculatorTab text={ this.props.text }/>} }/>
                </div>
            </div>
        </HashRouter>
    }
}

AnonymousContent.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    onLanguageChanged: PropTypes.func.isRequired,
    onUserLoggedIn: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default AnonymousContent;