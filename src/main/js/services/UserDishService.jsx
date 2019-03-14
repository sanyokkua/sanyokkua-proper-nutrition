import axios from 'axios';
import Utils from '../utils/Utils'

export default class UserDishService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    addDishToUser(dishAddParam, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.post('/user/dishes', dishAddParam, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    getDishesForUser(loadParams, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.get('/user/dishes', {
                 headers: {[this.header]: this.token},
                 params: {
                     searchString: loadParams.search,
                     page: loadParams.currentPage,
                     recordsPerPage: loadParams.numberOfRecords,
                     userId: loadParams.userId
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

    deleteDishFromUser(dishAddParam, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.delete('/user/dishes', {
                 headers: {[this.header]: this.token},
                 data: dishAddParam
             })
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }
}