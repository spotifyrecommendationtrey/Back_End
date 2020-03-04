const request = require("supertest");
const server = require("../api/server.js");

describe("register", () => {
    it("should return 500", function() {
        return request(server)
            .post("/api/auth/register")
            .send({ username: "kris1", password: "pass" })
            .then(res => {
            expect(res.status).toBe(500);
          });
      });

  it("should return json", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "kris", password: "pass" })
      .then(res => {
        expect(res.type).toBe("application/json");
      });
  });
});



describe("login", () => {
    it("should return 200 OK", function() {
        return request(server)
            .post("/api/auth/login")
            .send({ username: "kris", password: "pass" })
            .then(res => {
            expect(res.status).toBe(200);
          });
      });

  it("should return json", () => {
    return request(server)
      .post("/api/auth/login")
      .send({ username: "kris", password: "pass" })
      .then(res => {
        expect(res.type).toBe("application/json");
      });
  });
});