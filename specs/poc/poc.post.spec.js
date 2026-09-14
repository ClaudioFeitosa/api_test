//constantes
const supertest = require("supertest");
const request = supertest('https://jsonplaceholder.typicode.com/')

describe('POC post request', () => {
    it('post /posts', async () => {
        const data = {
            title: "meu post usando o jest",
            body: "aprendendo automação de api com o jest",
            userId: 1,
            random: 'tetse de data randomica',
        }

        const res = await request
            .post('/posts')
            .send(data)
        
        //console.log(res.body);
        expect(res.body.title).toBe(data.title)
        console.log(res.body.random)
    })
        

 })