import axios from "axios";
import Utils from "../utils/Utils";

export default class CalculatorService {

    static calculate(params, success, fail) {
        let token = $("meta[name='_csrf']").attr("content");
        let header = $("meta[name='_csrf_header']").attr("content");
        Utils.checkDefaultCallbacks(success, fail);
        if (params.age && params.height && params.weight && params.gender && params.formula && params.activity) {
            axios.get('/calc', {
                     headers: {[header]: token, 'Content-Type': 'application/json; charset=utf-8'},
                     params: {
                         age: params.age,
                         height: params.height,
                         weight: params.weight,
                         gender: params.gender,
                         formula: params.formula,
                         activity: params.activity
                     }
                 })
                 .then(response => success(response.data))
                 .catch(error => fail(error, "Server problem"));
        } else {
            fail(null, "Incorrect params");
        }
    }
}