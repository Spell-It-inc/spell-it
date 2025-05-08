import request from "supertest";
import app from "../src/app";

describe("App", () => {
  it("should return welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to the API" });
  });
});
