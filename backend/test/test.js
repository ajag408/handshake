var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../server.js");
let should = chai.should();
chai.use(chaiHttp);

describe ("Get applications for existing and non-existing job", function(){
   
    it ("Should get all the Applications for an existing job", (done)=>{
        var job = {id:4};
        chai.request(server)
            .post("/applications/get-applicants")
            .send(job)
            .end((err, res) => {
                res.should.have.status(200);
                // console.log("Response Body:", res.body);
                done()
            })
     })
     it ("Should get no Applications for a non-existent job", (done)=>{
        var job = {id: 1000};
        chai.request(server)
            .post("/applications/get-applicants")
            .send(job)
            .end((err, res) => {
                res.should.have.status(200);
                // console.log("Response Body:", res.body);
                done()
            })
     })
    
})




describe ("Get existing company", function(){
   
    it ("Get existing company", (done)=>{
        chai.request(server)
            .get("/companies/getCompany/3")
            .end((err, res) => {
                res.should.have.status(200);
                // console.log("Response Body:", res.body);
                done()
            })
     })
    
})



describe ("Get all upcoming events", function(){
   
    it ("Get all upcoming events", (done)=>{
        chai.request(server)
            .get("/events/get-upcoming-events")
            .end((err, res) => {
                res.should.have.status(200);
                // console.log("Response Body:", res.body);
                done()
            })
     })
    
})


describe ("Search jobs", function(){
   
    it ("Search jobs simulator", (done)=>{
        var search= {search: 'c', loc: 'Switzerland'};
        chai.request(server)
            .post("/jobs/searchJobs")
            .send(search)
            .end((err, res) => {
                res.should.have.status(200);
                // console.log("Response Body:", res.body);
                done()
            })
     })
    
})


describe ("Get all students signed up", function(){
   
    it ("Get all students signed up", (done)=>{
        chai.request(server)
            .get("/students/get-all-students")
            .end((err, res) => {
                res.should.have.status(200);
                // console.log("Response Body:", res.body);
                done()
            })
     })
    
})


