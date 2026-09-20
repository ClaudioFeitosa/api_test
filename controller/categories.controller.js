const supertest = require("supertest");
const {baseUrl} =  require('../config/base.config')
const request = supertest(baseUrl);

// notas Ctl + Shift + L altera todos de uma

class CategoriesController {


    getCategories (){
      return  request.get('/categories/');
    }

    getCategoriesbyID(id) {
       return request.get('/categories/' + id);
    }

    postCategories(data){
       return request
            .post('/categories/')
            .send(data)        
    }

    putCategories (id, data){
        return request
            .put('/categories/' + id)
            .send(data)
    }

    deleteCategories(id) {
        return request
            .delete('/categories/' + id)
    }
}
module.exports = new CategoriesController();

