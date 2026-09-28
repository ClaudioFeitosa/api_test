const adminController = require("../controller/admin.controller");
const categoriesController = require("../controller/categories.controller")
const {adminCredentials } = require('../config/base.config');
const { login, newCategory } = require("../utils/helper");


describe('Categories', () => {

    let token, postRes;

    beforeAll(async () => {

        token = await login(adminCredentials.email, adminCredentials.password)

        categoryId = await newCategory("Test Category " + Math.floor(Math.random() *10000)
        );
        // const body = {"name": "Test Category " + Math.floor(Math.random() *10000)};

        // postRes = await categoriesController
        //     .postCategories(body)
        //     .set("Authorization", "Bearer " + token)          
    }) 

    it ('GET /cateories', async () =>{
        const res =await categoriesController.getCategories();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
    });

    describe.only('Create Categories', () => {
        it('POS/categories', async () => {
            // const body = {"name": "Test Category" + Math.floor(Math.random() *10000)}
            // const res = await categoriesController
            // .postCategories(body)
            // este .set é como eu devo passar a autenticação via headers
            const category = await newCategory("Test Category " + Math.floor(Math.random() *10000));

            //.set("Authorization", "Bearer " + token)
            console.log(category.body)            
            expect(category.statusCode).toEqual(200); 
            //expect(category.body.name).toEqual(body.name)
        })
    })
        
    describe('PUT CATERORIES', () => {       
        it('put categories/:id', async() => {
            const body = {
                name : postRes.body.name + ' update'
            };
            const res = await categoriesController
                .putCategories(postRes.body._id, body)        
                .set("Authorization", "Bearer " + token)  
                
            console.log(res.body.name)
   
            expect(res.statusCode).toEqual(200)
            expect(res.body.name).toEqual(body.name)
        })
    })

    describe('DELETE CATERORIES', () => {
        it('put categories/:id', async() => {

            const res = await categoriesController
                .deleteCategories(postRes.body._id)       
                .set("Authorization", "Bearer " + token) 
            expect(res.statusCode).toEqual(200)

        })
    })

})