import axios from 'axios';
import Utils from "../utils/Utils";

export default class LoginService {
    static login(loginParams, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
        axios.post('/login', loginParams, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(response => { //TODO:
                 let user = response.data;
                 success(user);
             })
             .catch(error => {
                        console.warn(error);
                        fail(error.response + '');
                    }
             );
    }
}