import postMovie from "../postMovie";
import request from "supertest";

let api = request("http://localhost:3030");

describe("postMovie functions", () => {
  it("should be a function", () => {
    expect(typeof postMovie).toBe("function");
  });

  it("should return with 400 if not all fields are sent", () => {
    return api.post("/movie")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Please provide all required fields");
      });
  });

  it("should return with 500 if nothing is send", () => {
    return api.post("/movie")
      .expect(500)
      .then((res) => {
        expect(res.body.code).toBe("InternalError");
      });
  });

  it("should return 200 with success true with correct fields", () => {
    return api.post("/movie")
      .send({
        actors: [ 'a-1' ],
        description: 'A jazz pianist falls for an aspiring actress in Los Angeles.',
        director: 'Damien Chazelle',
        genres: [ 'Comedy', 'Drama', 'Musical', 'Romance' ],
        name: 'La La Land',
        rating: '8.5',
        releaseDate: 'Sun Dec 25 2016 00:00:00 GMT-0500 (EST)' 
      })
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBe(true);
      });
  });
});
