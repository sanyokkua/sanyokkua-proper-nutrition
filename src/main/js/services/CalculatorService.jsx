import axios from "axios";
import Utils from "../utils/Utils";

export default class CalculatorService {

    static calculate(params, successCallback, failCallback) {
        Utils.checkDefaultCallbacks(successCallback, failCallback);
        if (params.age && params.height && params.weight && params.gender && params.formula && params.activity) {
            axios.get('/calc', {
                     params: {
                         age: params.age,
                         height: params.height,
                         weight: params.weight,
                         gender: params.gender,
                         formula: params.formula,
                         activity: params.activity
                     }
                 })
                 .then(response => successCallback(response.data))
                 .catch(error => failCallback(error, "Server problem"));
        } else {
            failCallback(null, "Incorrect params");
        }
    }
}