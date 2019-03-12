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
        this.state = {
            isUserLoggedIn: true,
            userPermissions: Permissions.ANONYMOUS
        };
        this.onLangSelect = this.onLangSelect.bind(this);
    }

    onLangSelect(lang) {
        this.props.onLanguageChanged(lang);
    }

    render() {
        if (this.state.isUserLoggedIn) {
            let permissions = this.state.userPermissions;
            switch (permissions) {
                case Permissions.ANONYMOUS:
                    return <AnonymousContent text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
                case Permissions.ADMIN:
                    return <AdminContent text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
                case Permissions.MANAGER:
                    return <ManagerContent text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
                case Permissions.USER:
                    return <UserContentPage text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
                default:
                    return <AnonymousContent text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
            }
        } else {
            return <AnonymousContent text={ this.props.text } onLanguageChanged={ this.props.onLanguageChanged } currentLanguage={ this.props.currentLanguage } langList={ this.props.langList }/>;
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