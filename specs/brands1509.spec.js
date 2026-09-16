//constantes
const supertest = require("supertest");
const request = supertest('https://www.sdetunicorns.com/api/test');

describe('Brands', () => {
    let newBrand;

    describe('Create $ fetch Brands', () => {

        describe('Validar regras e descrição do nome da brand BVA', () => {

            // este afterEach via fazer a limpeza toda vez que uma brand for criada e o teste executado ela deleta
            // isso elimita o lixo 
                afterEach (async () => {
                    if (newBrand?._id){
                        const deleteRes = await request
                            .delete(`/brands/${newBrand._id}`);                            
                        console.log('Delete Status', deleteRes.statusCode);
                        newBrand = null;
                    }
                });
            it('Schema Verification - min char length for name =29', async() => {
                const randomString  = (length) => {
                    return Array.from({length},() =>
                    Math.random().toString(36).charAt(2)).join('');
                };
                const brandName = randomString(29);

                const data = {
                    name: brandName,
                    description: "Test Brand descriprion"
                }
                const res = await request
                .post('/brands')
                .send(data)
            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(200);
            //expect(res.body.error).toEqual('Brand name is too short')
            console.log(res.body.error)            
        })
            it('Schema Verification - min char length for name =30', async() => {
                const randomString  = (length) => {
                    return Array.from({length},() =>
                    Math.random().toString(36).charAt(2)).join('');
                };
                const brandName = randomString(30);

                const data = {
                    name: brandName,
                    description: "Test Brand descriprion"
                }
                const res = await request
                .post('/brands')
                .send(data)
            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(200);
            //expect(res.body.error).toEqual('Brand name is too short')
            console.log(res.body.error)            
        })

            it('Schema Verification - min char length for name =31', async() => {
                const randomString  = (length) => {
                    return Array.from({length},() =>
                    Math.random().toString(36).charAt(2)).join('');
                };
                const brandName = randomString(31);

                const data = {
                    name: brandName,
                    description: "Test Brand descriprion"
                }
                const res = await request
                .post('/brands')
                .send(data)
            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name is too long')
            //console.log(res.body.error)            
        })

        describe('Description validation- Brand description must be a string', () => {
            it('Brand description numeric value', async() =>{

                const data = {
                      name: "Test Brands " + Math.floor(Math.random()*10000),
                    description: 123
                }
                const res = await request
                .post('/brands')
                .send(data)
            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand description must be a string')
            })            
        })

        describe('Business logic verification - put and delete with invalid brand', () => {
        
            it('put Brand invalid ID', async () =>{
                const data = {
                name: "put invalid"
                }

                const res = await request
                    .put('/brands/6aa82dcf14ed0d60b0322e333')
                    .send(data)          
 
            console.log('STATUS:', res.statusCode);
            console.log('BODY:', res.body);

            expect(res.statusCode).toBe(422)
            expect(res.body.error).toContain('Unable to update brand')          

        })

            it ('Delete', async () => {
                const res = await request.delete('/brands/6aa82dcf14ed0d60b0322e333')
            expect(res.statusCode).toBe(422)
            expect(res.body.error).toContain('Unable to delete brand')
        })

            
        })

        })        

        describe('Create brands', () => {
            it('POST BRAND', async () => {        
            const data = {
            name: "Test Brands " + Math.floor(Math.random()*10000),
            description: "Test Brand descriprion"
        }
            const res = await request
                .post('/brands')
                .send(data)
        //console.log('BODY:', res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual(data.name)
        expect(res.body).toHaveProperty('createdAt')
        console.log(res.body)

        newBrand = res.body;
        })

            it('Schema Verification - min char length for name >1', async() => {

                const data = {
                    name: 'a',
                    description: "Test Brand descriprion"
                }
                const res = await request
                .post('/brands')
                .send(data)
            console.log('BODY:', res.body);
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name is too short')
            console.log(res.body.error)            
        })


            it('Schema Verification - Name is  a mandatori field', async() => {

            const data = {
                name: '',
                description: "Test Brand descriprion"
            }
            const res = await request
                .post('/brands')
                .send(data)
        //console.log('BODY:', res.body);
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Name is required')
            console.log(res.body.error)            
        })

            it('Business Logic- Duplicate brand entries not allowed', async () => {
                const name = "Test Brands " + Math.floor(Math.random()*10000)        
                const data = {
                    name: name,
                    description: "Test Brand descriprion"
                }

                // first request
                await request
                    .post('/brands')
                    .send(data)

                // second request
                const res2 = await request
                    .post('/brands')
                    .send(data)     
                console.log('BODY:', res2.body);
                //console.log('BODY:', res.body);

                expect(res2.statusCode).toBe(422);
                expect(res2.body.error).toContain('already exists')
        })
            it ('Business Logic- GET /Brand/:INVALID_ID should throw 404', async() => {
                const res = await request.get('/brands/' + '6aa8507c14ed0d60b0322f02');
                
                console.log(res.body);
                expect(res.statusCode).toEqual(404);
                expect(res.body.error).toContain('Brand not found.')
        })
            
        })        

        it('brands Completo ', async () => {
        const res = await request.get('/brands/');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(1);
        //console.log(res.body[0]);
        // object.keys é uma do javascript
        //neste caso estou validando apenas a brand que indico pelo posição ...~[0] [1]
        expect(Object.keys(res.body[1])).toEqual(['_id', 'name']);
        //aqui ja é mais eficiente porque verifica todas as branchs seguem o mesmo padrão
        res.body.forEach(brand => {
            expect(Object.keys(brand)).toEqual(['_id', 'name']);
            })
        }) 
        
        it('GET lista de brands', async () => {      
        const res = await request.get('/brands/');
        console.log(res.body[0]);   
        })
        
        it ('GET /Brand/: ID', async() => {
            const res = await request.get('/brands/' + newBrand._id);
            //console.log(res.body);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(newBrand.name)
        })
        
        it ('put Brand ID', async () =>{
            const data = {
                name: "put" + newBrand.name
            }

            const getRes = await request
                .get('/brands/'+ newBrand._id);
            
            const beforeName = getRes.body.name;

            const res = await request
                .put('/brands/'+ newBrand._id)
                .send(data);  
 
            console.log('STATUS:', res.statusCode);
            console.log('BODY:', res.body);

            expect(res.statusCode).toBe(200)
            expect(res.body.name).toBe(data.name)
            expect(res.body.name).not.toEqual(beforeName)
            console.log('Before:', beforeName);
            console.log('After:', res.body.name);
        })

        it ('Delete', async () => {
            const res = await request.delete('/brands/'+newBrand._id)
            expect(res.statusCode).toBe(200)
            expect(res.body).toBeNull()
        })       

    })

})