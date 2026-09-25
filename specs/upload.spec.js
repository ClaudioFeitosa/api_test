const UploadoController = require('../controller/upload.controller')
const {adminCredentials } = require('../config/base.config');

describe('upload file', () => {
    it ('POST / upload/single file' , async() => {

        const res = await UploadoController.postUploadoSingle('data/apendice.pdf')
        console.log(res.body)
        expect(res.body.filename).toEqual('apendice.pdf')
    })

    it ('POST / upload/multiple files' , async() => {
        const files = [
            'data/apendice.pdf',
            'data/2.pdf',
            'data/3.pdf'
        ]
        const res = await UploadoController.postUploadoMultiple(files)
        console.log(res.body)
        expect(res.body.length).toBe(3)
        expect(res.body[0].filename).toEqual('apendice.pdf')
        expect(res.body[1].filename).toEqual('2.pdf')
        expect(res.body[2].filename).toEqual('3.pdf')
    })
})