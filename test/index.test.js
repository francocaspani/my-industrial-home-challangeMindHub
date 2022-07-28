const {assert} = require("chai")
const request = require("supertest")
const app = require("../server")


describe("Modify Product", function() {

    it("Retorna el mismo id del objeto modificado", function (done) {
        request(app)
        .put("/api/products/62e1b76e6b63e64fe9fa4ad0")
        .expect(200)
        .then(response =>{
            assert.equal(response.body.response.productdb._id,"62e1b76e6b63e64fe9fa4ad0")
            return done()
        }).catch(err => {
            return done(err)
        })
    })

    it("Solo se puede pasar numeros al stock", function (done) {
        request(app)
        .put("/api/products/62e1b76e6b63e64fe9fa4ad0")
        .send({stock:"hola"})
        .expect(404)
        .then(response =>{
            return done()
        }).catch(err => {
            return done(err)
        })
    })

    it("Se ingresa correctamente en hashtags como un array", function (done) {
        request(app)
        .put("/api/products/62e1b76e6b63e64fe9fa4ad0")
        .send({hashtags:["hola"]})
        .expect(200)
        .then(response =>{
            assert.isArray(response.body.response.productdb.hashtags)
            return done()
        }).catch(err => {
            return done(err)
        })
    })

    it("Si el producto a modificar no se encuentra,da error", function (done) {
        request(app)
        .put("/api/products/62e1b76e6b63e64a4ad0")
        .expect(404)
        .then(response =>{
            return done()
        }).catch(err => {
            return done(err)
        })
    })
    
})
