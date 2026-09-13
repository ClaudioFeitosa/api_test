//constantes
const supertest = require("supertest");
const request = supertest('https://jsonplaceholder.typicode.com/')

describe('POC delete request', () => {
    it('delete /posts{ID}', async () => {      
        const res = await request.delete('/posts/1');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({})
    })
        

 })