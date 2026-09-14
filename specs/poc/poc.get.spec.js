//constantes
const supertest = require("supertest");
const request = supertest('https://jsonplaceholder.typicode.com/')

describe('POC Tests', () => {
    it('GET /posts', async () => {
        const res = await request.get('/posts');
        //console.log(res);
        console.log("STATUS:", res.statusCode);
        console.log("URL:", res.request.url);
        console.log("BODY:", res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body[0].id).toBe(1);
    })

    it('GET /commnets with query params', async() => {
        const res = await request.get('/comments?postId=1')
        expect(res.body[0].postId).toBe(1)
    })

    it.only('GET /commnets with query params n1', async() => {
        const res = await request
            .get('/comments')
            .query({postId: 1, limit: 2})
            
            console.log("BODY:", res.body);

        expect(res.body[0].postId).toBe(1)
    }) 

    it.only('GET / mwu poat', async() => {
        const res = await request.get('/comments?postId=101')
        expect(res.body[0].postId).toBe(1)
    })
 })

 