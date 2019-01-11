import axios from 'axios';

class TextService {
    constructor() {
        if (!TextService.instance) {
            TextService.instance = this;
        }
        this.currentLang = 'eng';
        this.text = {
            mainPageTitle: '',
            tabUserName: '',
            tabProductsName: '',
            tabDishesName: '',
            tabLogoutName: '',
            tabLoginName: '',
            productButtonCreate: '',
            productButtonCsv: '',
            productButtonEdit: '',
            productButtonDelete: '',
            productButtonTypes: '',
            productTableHeadName: '',
            productTableHeadEnergy: '',
            productTableHeadType: '',
            productTableHeadActions: '',
            productTipComboType: '',
            productTipInputNumberRecord: '',
            modalProductInputName: '',
            modalProductInputEnergy: '',
            modalProductInputProdType: '',
            modalProductHeaderCreate: '',
            modalProductHeaderEdit: '',
            modalProductCancel: '',
            modalProdTypeHeader: '',
            modalProdTypeInputName: '',
            modalProdTypeBtnCreate: '',
            modalProdTypeBtnSave: '',
            modalProdTypeBtnDelete: '',
            modalProdTypeTableName: '',
            modalProdTypeTableEdit: '',
            modalProdTypeTableDelete: '',
            modalProdTypeCancel: '',
            calcHeader: '',
            calcInputAgeTip: '',
            calcInputHeightTip: '',
            calcInputWeightTip: '',
            calcComboGenderTip: '',
            calcComboActivityTip: '',
            calcComboFormulaTip: '',
            calcGenderMale: '',
            calcGenderFemale: '',
            calcActivityLow: '',
            calcActivityMedium: '',
            calcActivityHigh: '',
            calcActivityVeryHigh: '',
            calcButtonCalc: '',
            calcFormulaBenedict: '',
            calcFormulaMifflin: '',
            calcResult: '',
            calcModalHeaderResult: '',
            mainEditMode: ''
        };
        this.load(this.currentLang);
        return TextService.instance;
    }

    load(lang, successCallback, failCallback) {
        if (lang || lang === '') {
            if (lang === '') {
                lang = 'eng';
            }
            axios.get('/lang/' + lang).then(response => {
                this.currentLang = lang;
                this.text = response.data;
                if (successCallback) {
                    successCallback();
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
}

const textService = new TextService();
export default textService;