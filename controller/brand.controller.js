const supertest = require("supertest");
const request = supertest('https://www.sdetunicorns.com/api/test');


class BrandController {
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

    putBrands (){
        return request
            .put('/brands/' + id)
            .send(data)
    }

    deleteBrand() {
        return request
            .delete('/brands/' + id)
    }
}

module.exports = new BrandController();

