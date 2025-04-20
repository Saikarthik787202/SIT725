var expect = require("chai").expect;
var request = require("request");

describe("Add Two Numbers", function () {
    var url = "http://localhost:3001/addTwoNumbers/3/5";

    it("returns status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("returns statusCode key in body to check if api give right result should be 200", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });

    it("returns the result as number", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            done();
        });
    });

    it("returns the result equal to 8", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.equal(8);
            done();
        });
    });

    it("returns the result not equal to 15", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.not.equal(15);
            done();
        });
    });

    // Additional test cases

    it("returns correct sum for negative numbers", function (done) {
        var negUrl = "http://localhost:3001/addTwoNumbers/-4/-6";
        request(negUrl, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.equal(-10);
            done();
        });
    });

    it("returns correct sum when one number is zero", function (done) {
        var zeroUrl = "http://localhost:3001/addTwoNumbers/0/7";
        request(zeroUrl, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.equal(7);
            done();
        });
    });

    it("returns correct sum for large numbers", function (done) {
        var largeUrl = "http://localhost:3001/addTwoNumbers/1000000/2500000";
        request(largeUrl, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.equal(3500000);
            done();
        });
    });

    it("returns error or invalid result for non-numeric input", function (done) {
        var invalidUrl = "http://localhost:3001/addTwoNumbers/a/b";
        request(invalidUrl, function (error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.not.equal(200);
            done();
        });
    });

});
