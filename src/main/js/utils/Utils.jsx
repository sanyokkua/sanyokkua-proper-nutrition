export default class Utils {

    static checkDefaultCallbacks(success, fail) {
        Utils.checkCallback(success, "Success");
        Utils.checkCallback(fail, "Fail");
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

    static isValidText(text) {
        return text && text.trim().length > 0;
    }

    static isValidEmail(email) {
        return Utils.isValidText(email) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    static isValidNumber(number) {
        return number && number > 0 && number < 250;
    }

    static isValidPassword(password) {
        if (!password || password.length < 6 || password.length > 16) {
            return false;
        }
        let upperCasePattern = /[A-Z]/;
        let lowerCasePattern = /[a-z]/;
        let numberPattern = /[0-9]/;
        let specialPatter = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
        let upperSymbols = 0;
        let lowerSymbols = 0;
        let numbers = 0;
        let specialSymbols = 0;
        for (let i = 0; i < password.length; i++) {
            if (upperCasePattern.test(password[i])) {
                upperSymbols++;
            } else if (lowerCasePattern.test(password[i])) {
                lowerSymbols++;
            } else if (numberPattern.test(password[i])) {
                numbers++;
            } else if (specialPatter.test(password[i])) {
                specialSymbols++;
            }
        }
        return upperSymbols > 0 && lowerSymbols > 0 && numbers > 0 && specialSymbols > 0;
    }
}