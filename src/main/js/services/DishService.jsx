import axios from 'axios';
import Utils from '../utils/Utils'

export default class DishService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    static calculateTotalEnergy(productsList) {
        let totalValue = 0;
        productsList.filter(product => product.amount > 0).forEach(product => {
            totalValue += product.energy * (product.amount / 100);
        });
        return totalValue;
    }

    createDish(product, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.post('/dishes', product, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));

    }

    getDishes(loadParams, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.get('/dishes', {
                 headers: {[this.header]: this.token},
                 params: {
                     searchString: loadParams.name,
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

    updateDish(dish, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.put('/dishes/' + dish.dishId, dish, {headers: {[this.header]: this.token}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    deleteDish(dish, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.delete('/dishes/' + dish.dishId, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }
}