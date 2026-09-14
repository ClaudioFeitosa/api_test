//constantes
const supertest = require("supertest");
const request = supertest('https://www.sdetunicorns.com/api/test');

describe('Brands', () => {
    let newBrand;

    describe('Create $ fetch Brands', () => {

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

        newBrand = res.body;
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