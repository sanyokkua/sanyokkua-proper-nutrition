import axios from 'axios';

class TextService {
    constructor() {
        if (!TextService.instance) {
            TextService.instance = this;
        }
        return TextService.instance;
    }

    load(lang, successCallback, failCallback) {
        if (lang === null) {
            lang = 'eng'
        }
        if (lang || lang === '') {
            if (lang === '') {
                lang = 'eng';
            }
            axios.get('/lang/' + lang).then(response => {
                let currentLang = lang;
                let text = response.data;
                if (successCallback) {
                    successCallback(currentLang, text);
                }
            }).catch(error => {
                console.log(error);
                if (failCallback) {
                    failCallback(error, "Server problem");
                }
            });
        } else {
            if (failCallback) {
                failCallback(null, "Language is not set");
            }
        }
    }

    loadLangList(successCallback, failCallback) {
        axios.get('/lang').then(response => {
            let langList = response.data;
            if (langList && langList.length > 0) {
                if (successCallback) {
                    successCallback(langList);
                }
            } else {
                if (failCallback) {
                    failCallback(null, "Langs list is empty");
                }
            }
        }).catch(error => {
            console.log(error);
            if (failCallback) {
                failCallback(error, "Server problem");
            }
        });
    }
}

const textService = new TextService();
export default textService;