import axios from 'axios';

class TextService {
    constructor() {
        if (!TextService.instance) {
            TextService.instance = this;
        }
        return TextService.instance;
    }

    load(lang, success, fail) {
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
                if (success) {
                    success(currentLang, text);
                }
            }).catch(error => {
                console.log(error);
                if (fail) {
                    fail(error, "Server problem");
                }
            });
        } else {
            if (fail) {
                fail(null, "Language is not set");
            }
        }
    }

    loadLangList(success, fail) {
        axios.get('/lang').then(response => {
            let langList = response.data;
            if (langList && langList.length > 0) {
                if (success) {
                    success(langList);
                }
            } else {
                if (fail) {
                    fail(null, "Langs list is empty");
                }
            }
        }).catch(error => {
            console.log(error);
            if (fail) {
                fail(error, "Server problem");
            }
        });
    }
}

const textService = new TextService();
export default textService;