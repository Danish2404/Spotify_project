const request = require("supertest");
const app = require("../src/app");

describe("Backend API Test", () => {
  test("GET unknown route should return 404", async () => {
    const res = await request(app).get("/unknown");

    expect(res.statusCode).toBe(404);
  });
});