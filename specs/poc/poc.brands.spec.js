//constantes
const supertest = require("supertest");
const request = supertest('https://www.sdetunicorns.com/api/test');

describe('Brands', () => {

    describe ('tech brands', () => {
        it.skip('GET brands', async () => {      
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
        });         
    })

    it.skip('GET lista de brands', async () => {      
        const res = await request.get('/brands/');
        console.log(res.body[0]);   
    })


    })  

    describe ('Create Brands', () => {
        it('POST BRAND', async () => {        
            const data = {
            name: "Brands 005xz",
        }
            const res = await request
                .post('/brands')
                .send(data)

        console.log('STATUS:', res.statusCode);
        console.log('BODY:', res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual(data.name)
        expect(res.body).toHaveProperty('createdAt')
        })

    })

    describe('update / delete Brand', () => {
        it ('put Brand ID', async () =>{
            const data = {
                name: "Brands 005-put7",
            }

            const getRes = await request
                .get('/brands/6aa5e09714ed0d60b0322e3d');
            
            const beforeTitle = getRes.body.name;

            const res = await request
                .put('/brands/6aa5e09714ed0d60b0322e3d')
                .send(data);  
 
            console.log('STATUS:', res.statusCode);
            console.log('BODY:', res.body);

            expect(res.statusCode).toBe(200)
            expect(res.body.name).toBe(data.name)
            expect(res.body.name).not.toEqual(beforeTitle)
            console.log('Before:', beforeTitle);
            console.log('After:', res.body.name);

        })

        it.only ('delete put', async() =>{
            const res = await request.delete('/brands/6aa5e62514ed0d60b0322e65')
            expect(res.statusCode).toBe(200)
            expect(res.body).toBeNull()

        })
        
    })
    


 })