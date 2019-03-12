import axios from 'axios';

export default class LoginService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    login(loginParams, success, fail) {
        axios.post('/login2', loginParams, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(response => {
                 let userId = response.data.userId;
                 success(userId);
             })
             .catch(error => fail(error));
    }
}