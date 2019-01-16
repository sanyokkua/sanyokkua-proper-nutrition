const React = require('react');
import { HashRouter, NavLink, Route }       from "react-router-dom";
import { Dropdown, Input, Navbar, NavItem } from "react-materialize";
import Dishes                               from './dishes/Dishes';
import Products                             from './products/Products';
import User                                 from './users/User';
import TextService                          from '../services/TextService';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            currentTab: 'tabUserName',
            lang: '',
            isLangLoaded: false,
            isEditMode: false,
            text: TextService.text
        };
        this.loadLanguage(this.state.lang);
        this.onLangSelect = this.onLangSelect.bind(this);
        this.onNavLinkClick = this.onNavLinkClick.bind(this);
        this.onEditModeChange = this.onEditModeChange.bind(this);
    }

    loadLanguage(lang) {
        TextService.load(lang, () => {
            this.setState({
                              isLangLoaded: true,
                              lang: TextService.currentLang,
                              text: TextService.text,
                              header: TextService.text[this.state.currentTab]
                          });
        }, (error, message) => {
            console.log(message);
            this.setState({isLangLoaded: false});
        });
    }

    onLangSelect(lang) {
        this.loadLanguage(lang);
    }

    onEditModeChange(editMode) {
        this.setState({isEditMode: editMode});
    }

    onNavLinkClick(lastTab) {
        this.setState({currentTab: lastTab, header: TextService.text[lastTab]});
    }

    render() {
        return this.state.isLangLoaded ? (<HashRouter>
            <div>
                <Navbar className='light-blue darken-2' brand={ this.state.header } right>
                    <li><Input onChange={ (event, value) => {this.onEditModeChange(value)} } name='group1' type='checkbox' value='white' label={ this.state.text.mainEditMode }/></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabUserName') } to='/'>{ this.state.text.tabUserName }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabProductsName') } to='/products'>{ this.state.text.tabProductsName }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabDishesName') } to='/dishes'>{ this.state.text.tabDishesName }</NavLink></li>
                    <li>
                        <Dropdown trigger={ <a> { this.state.lang }</a> }>
                            <NavItem onClick={ () => {this.onLangSelect("eng")} }>eng</NavItem>
                            <NavItem onClick={ () => {this.onLangSelect("ru")} }>ru</NavItem>
                        </Dropdown>
                    </li>
                    <NavItem href='/logout'>{ this.state.text.tabLogoutName }</NavItem>
                </Navbar>

                <div className='container'>
                    <Route exact path="/" render={ () => { return <User text={ this.state.text }/>} }/>
                    <Route path="/user" render={ () => {return <User text={ this.state.text }/>} }/>
                    <Route path="/products" render={ () => {return <Products text={ this.state.text } editable={ this.state.isEditMode }/>} }/>
                    <Route path="/dishes" render={ () => {return <Dishes text={ this.state.text } editable={ true }/>} }/>
                </div>
            </div>
        </HashRouter>) : null
    }
}

export default MainContent;