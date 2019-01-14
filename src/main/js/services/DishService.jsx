import axios from 'axios';
import Utils from '../utils/Utils'

export default class DishService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    createDish(product, successCallback, failCallback) {
        Utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.post('/dishes', product, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));

    }

    getDishes(loadParams, successCallback, failCallback) {
        Utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.get('/dishes', {
                 headers: {[this.header]: this.token},
                 params: {
                     page: loadParams.currentPage,
                     name: loadParams.name,
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
                 successCallback(result);
             })
             .catch(error => failCallback(error));
    }

    updateDish(product, successCallback, failCallback) {
        Utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.put('/dishes/' + product.id, product, {headers: {[this.header]: this.token}})
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));
    }

    deleteDish(product, successCallback, failCallback) {
        Utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.delete('/dishes/' + product.id, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));
    }
}