const adminController = require("../controller/admin.controller");
const categoriesController = require("../controller/categories.controller")
const {adminCredentials } = require('../config/base.config');
const { login, newCategory } = require("../utils/helper");


describe('Categories', () => {

    let token;

    beforeAll(async () => {

        token = await login(adminCredentials.email, adminCredentials.password)
        category = await newCategory();  
    }) 

    it ('GET /cateories', async () =>{
        const res =await categoriesController.getCategories();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
    });

    describe('Create Categories', () => {
        it('POS/categories', async () => {
            category002 = await newCategory();
            
            console.log(category002.body)            
            expect(category002.statusCode).toEqual(200); 
            expect(category002.body.name).toBeDefined();
            
        })
    })
        
    describe('PUT CATERORIES', () => {       
        it('put categories/:id', async() => {
            const body = {
                name : category.body.name + ' update'
            };
            const res = await categoriesController
                .putCategories(category.body._id, body)        
                .set("Authorization", "Bearer " + token)  
                
            console.log(res.body.name)
   
            expect(res.statusCode).toEqual(200)
            expect(res.body.name).toEqual(body.name)
        })
    })

    describe('DELETE CATERORIES', () => {
        it('delete/:id', async() => {
            const res = await categoriesController
                .deleteCategories(category.body._id)       
                .set("Authorization", "Bearer " + token) 
            expect(res.statusCode).toEqual(200)
        })
    })
})