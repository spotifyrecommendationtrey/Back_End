const request = require("supertest");
const server = require("../api/server.js");

describe("favorites", () => {
    it("requires a token", function() {
        return request(server)
            .get("/api/users/dashboard/1/favorites")
            .send({ username: "kris", password: "pass" })
            .then(res => {
            expect(res.status).toBe(400);
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


