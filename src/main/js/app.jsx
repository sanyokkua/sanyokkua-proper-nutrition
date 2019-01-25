import React        from 'react';
import ReactDOM     from 'react-dom';
import MainContent  from './elements/MainContent';
import TextService  from './services/TextService';
import PropTypes    from 'prop-types';
import TextPropType from './utils/TextPropType';

class Application extends React.Component {
    constructor(props) {
        super(props);
        let currentLanguage = this.props.currentLanguage;
        let currentText = this.props.text;
        this.state = {isLangLoaded: currentLanguage && currentText, lang: currentLanguage, text: currentText};
        this.onLanguageChanged = this.onLanguageChanged.bind(this);
    }

    loadLanguage(lang, success) {
        TextService.load(lang, (currentLang, text) => {
            success(currentLang, text);
        }, (error, message) => {
            console.log(message);
            this.setState({isLangLoaded: false});
        });
    }

    onLanguageChanged(lang) {
        this.loadLanguage(lang, (currentLang, text) => {
            this.setState({isLangLoaded: true, lang: currentLang, text: text});
        });
    }

    render() {
        return this.state.isLangLoaded ? <div><MainContent text={ this.state.text } onLanguageChanged={ this.onLanguageChanged } currentLanguage={ this.state.lang } langList={ this.props.langList }/></div>
                                       : <div>Problem with text loading</div>
    }
}

Application.propTypes = {
    text: TextPropType.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string).isRequired
};
TextService.loadLangList(langs => {
    TextService.load(langs[0], (currentLang, text) => {
        ReactDOM.render(
            <Application name='alex' currentLanguage={ currentLang } text={ text } langList={ langs }/>,
            document.getElementById('react')
        );
    }, () => {
        console.log("Problem with language loading");
    });
}, () => {});
