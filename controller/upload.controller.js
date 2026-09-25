const supertest = require("supertest");
const {baseUrl} =  require('../config/base.config')
const request = supertest(baseUrl);

// notas Ctl + Shift + L altera todos de uma

class UploadoController {

    postUploadoSingle(filePath){
       return request
            .post('/upload/single')
            .attach('single', filePath)      
    }

    postUploadoMultiple(files){
        const req = request
            .post('/upload/multiple')
        
            files.forEach(file => {
                req
                    .attach('multiple', file)                
            });
        return req             
    }
}
module.exports = new UploadoController();

