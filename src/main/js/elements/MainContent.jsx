import React            from 'react';
import PropTypes        from "prop-types";
import Utils            from "../utils/Utils";
import TextPropType     from "../utils/TextPropType";
import AdminContent     from "./index/AdminContent";
import Permissions      from "../utils/Permissions";
import AnonymousContent from "./index/AnonymousContent";
import ManagerContent   from "./index/ManagerContent";
import UserContentPage  from "./index/UserContentPage";

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onLanguageChanged, "onLanguageChanged");
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.currentLanguage, "currentLanguage");
        Utils.checkRequiredProperty(this.props.langList, "langList");
        this.state = {userPermissions: Permissions.ANONYMOUS, currentUser: null};
        this.onLangSelect = this.onLangSelect.bind(this);
        this.onUserLoggedIn = this.onUserLoggedIn.bind(this);
    }

    onLangSelect(lang) {
        this.props.onLanguageChanged(lang);
    }

    onUserLoggedIn(user) {
        console.log("MainContent.onLoginSuccess: " + user ? JSON.stringify(user) : null);
        if (user) {
            this.setState({currentUser: user, userPermissions: Permissions.getPermission(user.permissionsId)});
        } else {
            console.warn("Problem with userID");
        }
    }

    render() {
        let permissions = this.state.userPermissions;
        switch (permissions) {
            case Permissions.ADMIN:
                return <AdminContent user={ this.state.currentUser } text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
            case Permissions.MANAGER:
                return <ManagerContent user={ this.state.currentUser } text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
            case Permissions.USER:
                return <UserContentPage user={ this.state.currentUser } text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
            default:
                return <AnonymousContent text={ this.props.text } onUserLoggedIn={ this.onUserLoggedIn } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
        }
    }
}

MainContent.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    onLanguageChanged: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default MainContent;