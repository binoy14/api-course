import getMovies from "../getMovies";
import request from "supertest";

let api = request("http://localhost:3030");

describe("getMovies function", () => {
  afterAll((done) => {
    done();
  })
  it("should be a function", () => {
    expect(typeof getMovies).toBe("function");
  });

  it("should respond 200 with movie data", () => {
    return api.get("/movie")
      .expect(200)
      .then((res) => {
        const expected = [{ 
          actors: [ 'a-1' ],
          description: 'A jazz pianist falls for an aspiring actress in Los Angeles.',
          director: 'Damien Chazelle',
          genres: [ 'Comedy', 'Drama', 'Musical', 'Romance' ],
          id: 'm-1',
          name: 'La La Land',
          rating: '8.5',
          releaseDate: 'Sun Dec 25 2016 00:00:00 GMT-0500 (EST)' 
        },{ 
          actors: [ 'a-1' ],
          description: 'A jazz pianist falls for an aspiring actress in Los Angeles.',
          director: 'Damien Chazelle',
          genres: [ 'Comedy', 'Drama', 'Musical', 'Romance' ],
          id: 'm-2',
          name: 'La La Land',
          rating: '8.5',
          releaseDate: 'Sun Dec 25 2016 00:00:00 GMT-0500 (EST)' 
        },{
          "name": "La La Land",
          "description": "A jazz pianist falls for an aspiring actress in Los Angeles.",
          "releaseDate": "Sun Dec 25 2016 00:00:00 GMT-0500 (EST)",
          "actors": [
            "a-1"
          ],
          "director": "Damien Chazelle",
          "genres": ["Comedy", "Drama", "Musical", "Romance"],
          "rating": "8.5",
          "id": "m-3"
        }];

        expect(expected).toMatchObject(res.body);
      });
  });
});
