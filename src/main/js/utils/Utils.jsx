export default class Utils {

    checkDefaultCallbacks(successCallback, failCallback) {
        this.checkCallback(successCallback, "Success");
        this.checkCallback(failCallback, "Fail");
    }

    checkCallback(callBack, callBackName) {
        if (!callBack) {
            throw new Error(callBackName + " callback is required");
        }
    }

    checkRequiredProperty(property, propertyName){
        if (!property){
            throw new Error(propertyName + " is required");
        }
    }
}