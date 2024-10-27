const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

beforeAll(async () => {
  const mongoUri = "mongodb://127.0.0.1:27017/db_arlinggacr_betest";
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("User CRUD - Positive Cases", () => {
  let userId;

  const testUserData = {
    userName: "John Doe",
    accountNumber: "123456789",
    emailAddress: "johndoe@gmail.com",
    identityNumber: "ID12345",
  };

  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send(testUserData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("userName", testUserData.userName);
    userId = res.body._id;
  });

  it("should get a user by account number", async () => {
    const res = await request(app).get(
      `/api/users/account/${testUserData.accountNumber}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "accountNumber",
      testUserData.accountNumber
    );
  });

  it("should get a user by identity number", async () => {
    const res = await request(app).get(
      `/api/users/identity/${testUserData.identityNumber}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "identityNumber",
      testUserData.identityNumber
    );
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(
      res.body.some((user) => user.userName === testUserData.userName)
    ).toBeTruthy();
  });

  it("should update a user", async () => {
    const res = await request(app).put(`/api/users/${userId}`).send({
      userName: "Updated User",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("userName", "Updated User");
  });

  it("should delete a user", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg", "User deleted successfully");
  });
});

describe("User CRUD - Negative Cases", () => {
  it("should return 404 for a non-existent user by account number", async () => {
    const res = await request(app).get("/api/users/account/999999999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("msg", "User not found");
  });

  it("should return 404 for a non-existent user by identity number", async () => {
    const res = await request(app).get("/api/users/identity/ID00000");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("msg", "User not found");
  });

  it("should not create a user with a duplicate account number", async () => {
    const duplicateUserData = {
      userName: "Jane Smith",
      accountNumber: "123456789",
      emailAddress: "janesmith@gmail.com",
      identityNumber: "ID54321",
    };
    const res = await request(app).post("/api/users").send(duplicateUserData);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });

  it("should not create a user with a duplicate identity number", async () => {
    const duplicateIdentityData = {
      userName: "Alice Johnson",
      accountNumber: "987654321",
      emailAddress: "alicejohnson@gmail.com",
      identityNumber: "ID12345",
    };
    const res = await request(app)
      .post("/api/users")
      .send(duplicateIdentityData);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });
});
