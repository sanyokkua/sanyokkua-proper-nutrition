import axios from 'axios';
import Utils from '../utils/Utils'

export default class ProductsService {
    constructor() {
        this.utils = new Utils();
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    createProduct(product, successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.post('/products', product, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));

    }

    getProducts(loadParams, successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.get('/products', {
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
                 successCallback(result);
             })
             .catch(error => failCallback(error));
    }

    updateProduct(product, successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.put('/products/' + product.id, product, {headers: {[this.header]: this.token}})
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));
    }

    deleteProduct(product, successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.delete('/products/' + product.id, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));
    }
}