const supertest = require("supertest")
const {expect} = require("chai")

let baseUrl = "http://localhost:3000/api"

describe('Test Show User', () => {
    let limit = 1000, offset = 0
    it('should pass the test', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        console.log("Login successfully");
        // endregion Login

        let resp = await supertest(baseUrl)
            .get(`/user/${limit}/${offset}`)
            .set("Authorization", `Bearer ${token}`)
        expect(resp.statusCode).to.equal(200);
        expect(resp.body).haveOwnProperty("data");
        expect(resp.body.data).to.be.an('array');
        console.log(resp.body)
        console.log("Test passed!")
    });
});
describe('Test Detail User', () => {
    it('should pass the test', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        console.log("Login successfully");
        // endregion Login

        let userID = "68481c22142e5d546c2d198b"
        let resp = await supertest(baseUrl)
            .get(`/userDetail/${userID}`)
            .set("Authorization", `Bearer ${token}`)
        expect(resp.statusCode).to.equal(200);
        expect(resp.body).to.haveOwnProperty("data");
        expect(resp.body.data).to.haveOwnProperty("_id");
        console.log(resp.body)
        console.log("Test passed!")
    });
});
describe('Test Create User', () => {
    let payload = {
        "name": "Amar", "gender": "male", "email": "amarnurdin19@test.com", "status": "active"
    }

    it('should pass the test', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        console.log("Login successfully");
        // endregion Login

        let resp = await supertest(baseUrl)
            .post(`/user`)
            .set("Authorization", `Bearer ${token}`)
            .send(payload)
        expect(resp.statusCode).to.equal(200);
        console.log(resp.body)
        console.log("Test passed!")
    });

    it('should fail the test (unique)', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        // endregion Login

        let resp = await supertest(baseUrl)
            .post(`/user`)
            .set("Authorization", `Bearer ${token}`)
            .send(payload)
        expect(resp.statusCode).to.equal(400);
        expect(resp.body).to.haveOwnProperty("message");
        expect(resp.body.message).to.equal("Validation error");
        expect(resp.body).to.haveOwnProperty("errors");
        console.log(resp.body)
        console.log("Test passed!")
    });
    it('should fail the test (requirement)', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        // endregion Login

        delete payload.name
        let resp = await supertest(baseUrl)
            .post(`/user`)
            .set("Authorization", `Bearer ${token}`)
            .send(payload)
        expect(resp.statusCode).to.equal(400);
        expect(resp.body).to.haveOwnProperty("message");
        expect(resp.body.message).to.equal("Validation error");
        expect(resp.body).to.haveOwnProperty("errors");
        console.log(resp.body)
        console.log("Test passed!")
    });
});
describe('Test Update User', () => {
    let payload = {
        "name": "Nurdin", "gender": "male", "email": "nurdin18@test.com", "status": "active"
    }, userID = "684835a71cc664255f4724a9"
    it('should pass the test', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        console.log("Login successfully");
        // endregion Login

        let resp = await supertest(baseUrl)
            .put(`/user/${userID}`)
            .set("Authorization", `Bearer ${token}`)
            .send(payload)
        console.log(resp.body)
        expect(resp.statusCode).to.equal(200);
        console.log("Test passed!")
    });
    it('should fail the test (requirement)', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        // endregion Login

        delete payload.name
        let resp = await supertest(baseUrl)
            .post(`/user`)
            .set("Authorization", `Bearer ${token}`)
            .send(payload)
        expect(resp.statusCode).to.equal(400);
        expect(resp.body).to.haveOwnProperty("message");
        expect(resp.body.message).to.equal("Validation error");
        expect(resp.body).to.haveOwnProperty("errors");
        console.log(resp.body)
        console.log("Test passed!")
    });
});
describe('Test Delete User', () => {
    let userID = "6848e6fadb513e13d9a8924b";

    it('should pass the test', async () => {
        // region Login
        let token
        let login = await supertest(baseUrl)
            .post("/auth/login")
            .send({"username": "timInova", "password": "1Team1Semangat1Tujuan"})
        expect(login.statusCode).to.equal(200);
        token = login.body.data.token
        console.log("Login successfully");
        // endregion Login

        let resp = await supertest(baseUrl)
            .delete(`/user/${userID}`)
            .set("Authorization", `Bearer ${token}`)
        expect(resp.statusCode).to.equal(200);
        console.log(resp.body)
        console.log("Test passed!")
    });
});