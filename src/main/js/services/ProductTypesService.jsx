import axios from 'axios';
import Utils from '../utils/Utils'

export default class ProductTypesService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    createProductType(productType, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.post('/types', productType, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    getProductTypes(success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.get('/types')
             .then(response => {
                 let types = [{prodTypeId: 0, name: ''}];//
                 success(types.concat(response.data.content));
             })
             .catch(error => fail(error));
    }

    updateProductType(productType, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.put('/types/' + productType.prodTypeId, productType, {headers: {[this.header]: this.token}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    deleteProductType(productType, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.delete('/types/' + productType.prodTypeId, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }
}