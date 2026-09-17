const supertest = require("supertest");
const baseUrl =  require('../config/base.config')
const request = supertest(baseUrl);

class CategoriesController {
    getBrands (){
      return  request.get('/brands/');
    }

    getBrandbyID(id) {
       return request.get('/brands/' + id);
    }

    postBrands(data){
       return request
            .post('/brands')
            .send(data)        
    }

    putBrands (id, data){
        return request
            .put('/brands/' + id)
            .send(data)
    }

    deleteBrand(id) {
        return request
            .delete('/brands/' + id)
    }
}
module.exports = new CategoriesController();

