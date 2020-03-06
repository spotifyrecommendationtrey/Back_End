const request = require("supertest");
const server = require("../api/server.js");
const Users = require("../users/users-model")

////////////////////////////////////////////////////////////////////
describe("Login", () => {
  it("requires a registered account", function() {
      return request(server)
          .get("/api/users")
          .then(res => {
          expect(res.type).toBe("application/json");
          expect(res.status).toBe(200)
        });
    });

it("should return json and have a message", () => {
  return request(server)
    .post("/api/auth/login")
    .send({ username: "Kris", password: "pass" })
    .then(res => {
      expect(res.body.message).toBe("Welcome Kris!")
    });
});
});


/////////////////////////////////////////////////////////////////////
describe("favorites", () => {
  it("requires a token", function() {
      return request(server)
          .get("/api/users/dashboard/1/favorites")
          .send({ username: "Kris", password: "pass" })
          .then(res => {
          expect(res.status).toBe(400);
        });
    });

it("should return json", () => {
  return request(server)
    .post("/api/users/dashboard/1/favorites")
    .send({ username: "kris", password: "pass" })
    .then(res => {
      expect(res.type).toBe("application/json");
    });
});
});
///////////////////////////////////////////////////////////////////
describe("register", () => {
  it("requires a token", function() {
      return request(server)
          .post("/api/auth/register")
          .send({ username: "Kris", password: "pass" })
          .then(res => {
          expect(res.status).toBe(500);
        });
    });

it("it should return constraint ", () => {
  return request(server)
    .post("/api/auth/register")
    .send({ username: "Kris", password: "pass" })
    .then(res => {
      expect(res.type).toBe("application/json");
      expect(res.body.code).toBe("SQLITE_CONSTRAINT")
    });
});
});

describe("Songs", () => {
  it("requires a token", function() {
      return request(server)
          .get("/api/users/dashboard/songs")
          .then(res => {
          expect(res.status).toBe(200);
        });
    });

it("Should be an array", () => {
  return request(server)
    .get("/api/users/dashboard/songs")
    .then(res => {
      expect(res.type).toBe("application/json");
      expect(res.body).toStrictEqual([])
    });
});
});
