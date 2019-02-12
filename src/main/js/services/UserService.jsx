import axios from 'axios';
import Utils from '../utils/Utils'

export default class UserService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    createUser(user, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.post('/users', user, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    getUser(loadParams, success, fail){
        Utils.checkDefaultCallbacks(success, fail);
    }

    emailIsInUse(email, success, fail){
        Utils.checkDefaultCallbacks(success, fail);
    }

    loginIsInUse(login, success, fail){
        Utils.checkDefaultCallbacks(success, fail);
    }

    getUsers(loadParams, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.get('/users', {
                 headers: {[this.header]: this.token},
                 params: {
                     page: loadParams.currentPage,
                     name: loadParams.search,
                     currentType: loadParams.currentType,
                     numberOfRecords: loadParams.numberOfRecords
                 }
             })
             .then(response => {
                 let current = response.data.currentPage;
                 let total = response.data.totalPages;
                 let content = response.data.content;
                 let result = {
                     currentPage: current,
                     totalPages: total,
                     content: content
                 };
                 success(result);
             })
             .catch(error => fail(error));
    }

    updateUser(user, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.put('/users/' + user.user_id, user, {headers: {[this.header]: this.token}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    deleteUser(user, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.delete('/users/' + user.user_id, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }
}