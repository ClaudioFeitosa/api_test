//constantes
const supertest = require("supertest");
const request = supertest('https://jsonplaceholder.typicode.com/')

describe('POC put request', () => {
    it('PUT /posts{ID}', async () => {
        const data = {
            title: "MEU UPDATE002",
            body: "SUPERTEST UPDATE",
            userId: 1,
            //random: 'tetse de data randomica',
        }

        // aqui estou guardado o titulo antes da mudança para poder comparar
        
        const getRes = await request.get('/posts/1');
        const beforeTitle = getRes.body.title;
        console.log (beforeTitle);

        const res = await request
            .put('/posts/1')
            .send(data)
        
        //console.log(res.body);
        expect(res.body.title).not.toBe(beforeTitle)
        expect(res.body.title).toBe(data.title)
        console.log(res.body.title)

        // para implementações em preojetos reais
        // seria importante fazer um get para confirmar o update
        // nesta api os updates não sao efetivados 
    })
        

 })