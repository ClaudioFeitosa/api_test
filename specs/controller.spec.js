// //constantes
const supertest = require("supertest");
const request = supertest('https://www.sdetunicorns.com/api/test');
const brandController = require("../controller/brand.controller");

describe('Brands', () => {
    let newBrand;

    describe('Fetch brands', () => {        
        it('GET /brands', async () => {
            const res = await brandController.getBrands();
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(1);
            // object.keys é uma do javascript
            //neste caso estou validando apenas a brand que indico pelo posição ...~[0] [1]
            expect(Object.keys(res.body[1])).toEqual(['_id', 'name']);
            //aqui ja é mais eficiente porque verifica todas as branchs seguem o mesmo padrão
            res.body.forEach(brand => {
                expect(Object.keys(brand)).toEqual(['_id', 'name']);
            })
        }) 
    })
    describe('Create brands - revisado com o controller funcionando', () => {
        let data;
        let postBrand;

        beforeAll(async () => {
            data = {
                'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
                'description': 'Test Brand Description'
            }
            postBrand = await brandController.postBrands(data)

        })
        
        afterEach (async () => {
            if (newBrand?._id){
                const deleteRes = await request
                    .delete(`/brands/${newBrand._id}`);                            
                console.log('Delete Status', deleteRes.statusCode);
                newBrand = null;
            }
        })

        it('POST /brands controller revisado', async () => {      
            expect(postBrand.statusCode).toBe(200);
            expect(postBrand.body.name).toEqual(data.name)
            expect(postBrand.body).toHaveProperty('createdAt')
            console.log(postBrand.body)

            newBrand = postBrand.body;
        })

        it('Schema Verification - Name is  a mandatori field - controller', async() => {
        const nameEmpty = {
            name: '',
            description: "Test Brand descriprion"
        }
        const res = await brandController.postBrands(nameEmpty);

        expect(res.statusCode).toBe(422);
        expect(res.body.error).toEqual('Name is required')
            console.log(res.body.error)            
        })

        it('Schema Verification - min char length for name 1 - controller', async() => {
            const nameShort = {
                name: 'a',
                description: "Test Brand descriprion"
            }

            const res = await brandController.postBrands(nameShort);

            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name is too short')
            console.log(res.body.error)            
        })
        it('Schema Verification - min char length for name =29 - controller', async() => {
            const randomString  = (length) => {
                return Array.from({length},() =>
                Math.random().toString(36).charAt(2)).join('');
            };
            const brandName = randomString(29);

            const nameChar29 = {
                name: brandName,
                description: "Test Brand descriprion"
            }
            const res = await brandController.postBrands(nameChar29)
            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(200);
            //expect(res.body.error).toEqual('Brand name is too short')
            console.log(res.body.error)            
        })

        it('Schema Verification - min char length for name =30 - controller', async() => {
            const randomString  = (length) => {
            return Array.from({length},() =>
            Math.random().toString(36).charAt(2)).join('');
            };
            const brandName = randomString(30);

            const nameChar30 = {
                name: brandName,
                description: "Test Brand descriprion"
            }
            const res = await brandController.postBrands(nameChar30)

            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(200);
            //expect(res.body.error).toEqual('Brand name is too short')
            console.log(res.body.error)            
        })

        it('Schema Verification - min char length for name =31 - controller', async() => {
            const randomString  = (length) => {
            return Array.from({length},() =>
            Math.random().toString(36).charAt(2)).join('');
            };
            const brandName = randomString(31);

            const nameToLong = {
                name: brandName,
                description: "Test Brand descriprion"
            }
            const res = await brandController.postBrands(nameToLong)
            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name is too long')
            //console.log(res.body.error)            
        })

        it('Schema Verification - Description must be a string - controller', async() =>{
            const descriptionString = {
                    name: "Test Brands " + Math.floor(Math.random()*10000),
                description: 123
            }
        const res = await brandController.postBrands(descriptionString)
        console.log('BODY:', res.body);
        expect(res.statusCode).toBe(422);
        expect(res.body.error).toEqual('Brand description must be a string')
        })

        it('Business Logic- Duplicate brand entries not allowed - controller', async () => {
            const name = "Test Brands " + Math.floor(Math.random()*10000) 

            const duplicateName = {
                name: name,
                description: "Test Brand descriprion"
            }    
            const res = await brandController.postBrands(duplicateName)
            const res2 = await brandController.postBrands(duplicateName)          
            console.log('BODY:', res2.body);
            expect(res2.statusCode).toBe(422);
            expect(res2.body.error).toContain('already exists')
        })
    })
    describe('Fetch Individual Brand', () => {
        let postBrand;
        beforeAll(async () => {
            const data = {
            'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
            'description': 'Test Brand Description'
            }
            postBrand = await request
            .post('/brands')
            .send(data)
        })
        it ('Business Logic- GET /Brand/:INVALID_ID should throw 404', async() => {
            const res = await request.get('/brands/' + '6aa8507c14ed0d60b0322f02');
            
            console.log(res.body);
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toContain('Brand not found.')
        })

        it ('GET /Brand/: ID', async() => {
            const res = await request.get('/brands/' + postBrand.body._id);
            //console.log(res.body);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(postBrand.body.name)
        })        
        it('GET lista de brands', async () => {      
            const res = await request.get('/brands/');
            console.log(res.body[0]);   
        })        
    })

    describe('Update brands', () => {
        let postBrand;
            beforeAll(async () => {
            const data = {
            'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
            'description': 'Test Brand Description'
            }
            postBrand = await request
            .post('/brands')
            .send(data)
            })
        it('PUT /brands', async () => {            
        const data = {
            name: postBrand.body.name + ' updated'            
        }
        const res = await request
            .put('/brands/' + postBrand.body._id)
            .send(data)

        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(data.name)
        console.log(res.body.name)
        });
    
        it('PUT /brands/invalid_id', async () => {
        const data = {
            'name': ' updated'
        }
        const res = await request
            .put('/brands/' + 123)
            .send(data)

        expect(res.statusCode).toEqual(422)
        expect(res.body.error).toContain('Unable to update brands')
        });
    });
    describe('Delete Brands', () => {
        let deleteBrand;
        beforeAll(async () => {
        const data = {
        'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
        'description': 'Test Brand Description'
        }
        deleteBrand = await request
        .post('/brands')
        .send(data)
        })
        it('DELETE /brands', async () => {
        const res = await request
            .delete('/brands/' + deleteBrand.body._id)
        expect(res.statusCode).toEqual(200)
        });
        it('DELETE /brands/invalid_id', async () => {
        const res = await request
            .delete('/brands/' + 123)
        expect(res.statusCode).toEqual(422)
        expect(res.body.error).toContain('Unable to delete brand')
        });
    });
});
