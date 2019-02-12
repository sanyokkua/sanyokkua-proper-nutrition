import axios from 'axios';
import Utils from '../utils/Utils'

export default class ProductsService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    createProduct(product, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.post('/products', product, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));

    }

    getProducts(loadParams, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
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
                 success(result);
             })
             .catch(error => fail(error));
    }

    updateProduct(product, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.put('/products/' + product.productId, product, {headers: {[this.header]: this.token}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    deleteProduct(product, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.delete('/products/' + product.productId, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }
}