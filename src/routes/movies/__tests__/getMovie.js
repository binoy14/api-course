import getMovie from "../getMovie";
import request from "supertest";

let api = request("http://localhost:3030");

describe("getMovie function", () => {
  it("should be a function", () => {
    expect(typeof getMovie).toBe("function");
  });

  it("should respond 200 with movie data", () => {
    return api.get("/movie/m-1")
      .expect(200)
      .then((res) => {
        const expected = { 
          actors: [ 'a-1' ],
          description: 'A jazz pianist falls for an aspiring actress in Los Angeles.',
          director: 'Damien Chazelle',
          genres: [ 'Comedy', 'Drama', 'Musical', 'Romance' ],
          id: 'm-1',
          name: 'La La Land',
          rating: '8.5',
          releaseDate: 'Sun Dec 25 2016 00:00:00 GMT-0500 (EST)' 
        };

        expect(res.body).toEqual(expected);
      });
  });

  it("should respond with 400 if no id", () => {
    return api.get("/movie/")
      .expect(400)
      .then(err => {
        expect(err.body.message).toBe("Movie id is required");
      });
  });
});
