import axios from 'axios';
import Utils from '../utils/Utils'

export default class GenderService {

    static getGenders(success, fail) {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
        Utils.checkDefaultCallbacks(success, fail);
        axios.get('/genders', {headers: {[this.header]: this.token}})
             .then(response => {
                 let content = response.data;
                 let result = {
                     content: content
                 };
                 success(result);
             })
             .catch(error => fail(error));
    }
}