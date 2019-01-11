import axios from 'axios';

export default class UploadService {

    static uploadFile(csvFile, successCallback, failCallback) {
        if (csvFile) {
            let formData = new FormData();
            formData.append("csv", csvFile);
            let token = $("meta[name='_csrf']").attr("content");
            let header = $("meta[name='_csrf_header']").attr("content");

            axios.post('/csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    [header]: token
                }
            }).then(response => {
                console.log(response);
                if (successCallback) {
                    successCallback();
                }
            }).catch(function (error) {
                console.log(error);
                if (failCallback) {
                    failCallback();
                }
            });
        } else {
            if (failCallback) {
                failCallback();
            }
        }
    }
}