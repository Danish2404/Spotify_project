const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user.model");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  test("Register with valid data", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        fullname: "Danish",
        email: "danish@test.com",
        password: "123456",
      });

    expect(res.status).toBe(201);
  });

  test("Register with existing email", async () => {
    await request(app).post("/api/auth/register").send({
      fullname: "Danish",
      email: "danish@test.com",
      password: "123456",
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        fullname: "Danish",
        email: "danish@test.com",
        password: "123456",
      });

    expect(res.status).toBe(400);
  });

  test("Register with missing fields", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "x@test.com",
      });

    expect(res.status).toBe(400);
  });

  test("Login with correct credentials", async () => {
    await request(app).post("/api/auth/register").send({
      fullname: "Danish",
      email: "danish@test.com",
      password: "123456",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "danish@test.com",
        password: "123456",
      });

    expect(res.status).toBe(200);
  });

  test("Login with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      fullname: "Danish",
      email: "danish@test.com",
      password: "123456",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "danish@test.com",
        password: "wrongpass",
      });

    expect(res.status).toBe(401);
  });
});