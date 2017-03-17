import deleteMovie from "../deleteMovie";
import request from "supertest";

const api = request("http://localhost:3030");

describe("deleteMovie functions", () => {
  it("should be a function", () => {
    expect(typeof deleteMovie).toBe("function");
  });

  it("should responsd with 400 if no id provided", () => {
    return api.delete("/movie/")
      .expect(400)
      .then(res => {
        expect(res.body.message).toBe("Please provide the id");
      });
  });

  it("should respond with 200 and success true", () => {
    return api.delete("/movie/m-2")
      .expect(200)
      .then(res => {
        expect(res.body.success).toBe(true);
      });
  });
});
