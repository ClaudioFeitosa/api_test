// //constantes
const supertest = require("supertest");
//const request = supertest('https://www.sdetunicorns.com/api/test');
const brandController = require("../controller/brand.controller");

describe('Brands', () => {
    let newBrand;

    beforeAll(async () => {
        const brand = {
        'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
        'description': 'Test Brand Description'
        }
        newBrand = await brandController.postBrands(brand)
    })


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
        afterEach (async () => {
            if (newBrand?._id){
                const deleteRes = await request
                    .delete(`/brands/${newBrand._id}`);                            
                console.log('Delete Status', deleteRes.statusCode);
                newBrand = null;
            }
        })

        it('POST /brands controller revisado', async () => {      
            expect(newBrand.statusCode).toBe(200);
            expect(newBrand.body.name).toEqual(newBrand.body.name)
            expect(newBrand.body).toHaveProperty('createdAt')
            console.log(newBrand.body)

           // newBrand = newBrand.body;
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
    describe('Fetch Individual Brand - controller', () => {

        it ('Business Logic- GET /Brand/:INVALID_ID should throw 404', async() => {
            const res = await request.get('/brands/' + '6aa8507c14ed0d60b0322f02');            
            console.log(res.body);
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toContain('Brand not found.')
        })     
    })

    describe('Update brands- controller', () => {

        it('PUT /brands - controller', async () => {            
        const updateName = {
            name: newBrand.body.name + ' updated'            
        }
        const res = await brandController.postBrands(updateName);

        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(updateName.name)
        console.log(res.body.name)
        });
    
        it('PUT /brands/invalid_id', async () => {
        const data = {
            'name': ' updated'
        }
        const res = await brandController.putBrands(123, data)

        expect(res.statusCode).toEqual(422)
        expect(res.body.error).toContain('Unable to update brands')
        });
    });
    describe('Delete Brands - controller', () => {
        it('DELETE /brands este aqui', async () => {
        const res = await brandController.deleteBrand(newBrand.body._id)
        expect(res.statusCode).toEqual(200)
        });

        
        it('DELETE /brands/invalid_id', async () => {
            const res = await brandController.deleteBrand(2222)
            expect(res.statusCode).toEqual(422)
            expect(res.body.error).toContain('Unable to delete brand')
        });
    });
});
