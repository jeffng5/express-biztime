process.env.NODE_ENV = "test";

const request = require("supertest")

const app = require('../app')
const db = require("../db")


let testCompany;

beforeEach( async() => {
      const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ('Microsoft', 'Edge Laptop' , 'Windows' ) RETURNING code, name, description`);
testCompany = result.rows[0]})
      
afterEach(async()=>{
    await db.query(`DELETE FROM companies`)
})
afterAll(async ()=> {
    await db.end()
})

describe("Get list of companies", ()=> {
test("Get list of companies", async function() {
    const resp = await request(app).get(`/companies`)
    expect(resp.statusCode).toBe(200)
    expect(resp).toEqual([testCompany]
    )

})

})

describe("Get company by id/code", ()=> {
    test("Get company by id/code", async function() {
        const resp = await request(app).get(`/companies/${testCompany.code}`);
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual([testCompany.code]
        )   
    })
    })