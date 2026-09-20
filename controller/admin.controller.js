const supertest = require("supertest");
const {baseUrl} =  require('../config/base.config')
const request = supertest(baseUrl);

// notas Ctl + Shift + L altera todos de uma

class AdminController {

    postAdminLogin (data){
        return request
            .post('/admin/login')
            .send(data)
    }


}
module.exports = new AdminController();

