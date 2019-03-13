import React                          from 'react';
import { HashRouter, NavLink, Route } from "react-router-dom";
import { Dropdown, Navbar, NavItem }  from "react-materialize";
import PropTypes                      from "prop-types";
import AdminUserPage                  from "../users/admin/AdminUserPage";
import UserProfileMainPage            from "../users/profile/UserProfileMainPage";
import Products                       from "../products/Products";
import Dishes                         from "../dishes/Dishes";
import TextPropType                   from "../../utils/TextPropType";

class AdminContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: this.props.text.general.tabAdmin,
            currentTab: 'tabAdmin',
            currentUser: this.props.user
        };
        this.onLangSelect = this.onLangSelect.bind(this);
        this.onNavLinkClick = this.onNavLinkClick.bind(this);
    }

    onLangSelect(lang) {
        this.props.onLanguageChanged(lang);
    }

    onNavLinkClick(lastTab) {
        this.setState({currentTab: lastTab, header: this.props.text.general[lastTab]});
    }

    render() {
        const languages = this.props.langList.map(lang => {return <NavItem key={ lang } onClick={ () => {this.onLangSelect(lang)} }>{ lang }</NavItem>});
        return <HashRouter>
            <div>
                <Navbar className='light-blue darken-2' brand={ this.state.header } right>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabAdmin') } to='/users'>{ this.props.text.general.tabAdmin }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabProducts') } to='/products'>{ this.props.text.general.tabProducts }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabDishes') } to='/dishes'>{ this.props.text.general.tabDishes }</NavLink></li>
                    <li><NavLink onClick={ () => this.onNavLinkClick('tabUserProfile') } to='/profile'>{ this.props.text.general.tabUserProfile }</NavLink></li>
                    <li><Dropdown trigger={ <a> { this.props.currentLanguage }</a> }>{ languages }</Dropdown></li>
                    <NavItem href='/logout'>{ this.props.text.general.tabLogout }</NavItem>
                </Navbar>
                <div className='container'>
                    <Route exact path="/users" render={ () => { return <AdminUserPage text={ this.props.text }/>} }/>
                    <Route path="/products" render={ () => {return <Products text={ this.props.text } editable={ true } numberOfRecords={ 10 }/>} }/>
                    <Route path="/dishes" render={ () => {return <Dishes text={ this.props.text } editable={ true }/>} }/>
                    <Route path="/profile" render={ () => { return <UserProfileMainPage text={ this.props.text } user={ this.state.currentUser }/>} }/>
                </div>
            </div>
        </HashRouter>
    }
}

AdminContent.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    onLanguageChanged: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.object.isRequired
};
export default AdminContent;