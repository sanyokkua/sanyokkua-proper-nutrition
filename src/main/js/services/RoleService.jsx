import axios from 'axios';
import Utils from '../utils/Utils'

export default class RoleService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    getRoles(success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.get('/roles', {headers: {[this.header]: this.token}})
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