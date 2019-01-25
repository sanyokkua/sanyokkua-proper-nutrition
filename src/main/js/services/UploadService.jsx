import axios from 'axios';

export default class UploadService {

    static uploadFile(csvFile, success, fail) {
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
                if (success) {
                    success();
                }
            }).catch(function (error) {
                console.log(error);
                if (fail) {
                    fail();
                }
            });
        } else {
            if (fail) {
                fail();
            }
        }
    }
}