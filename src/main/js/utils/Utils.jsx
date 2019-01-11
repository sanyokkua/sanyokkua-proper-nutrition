export default class Utils {

    static checkDefaultCallbacks(successCallback, failCallback) {
        Utils.checkCallback(successCallback, "Success");
        Utils.checkCallback(failCallback, "Fail");
    }

    static checkCallback(callBack, callBackName) {
        if (!callBack) {
            throw new Error(callBackName + " callback is required");
        }
    }

    static checkRequiredProperty(property, propertyName) {
        if (property === null && property === undefined) {
            throw new Error(propertyName + " is required");
        }
    }
}