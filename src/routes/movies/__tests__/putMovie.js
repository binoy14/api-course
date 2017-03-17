import putMovie from "../putMovie";
import request from "supertest";

const api = request("http://localhost:3030");

describe("putMovie functions", () => {
  it("should be a function", () => {
    expect(typeof putMovie).toBe("function");
  });

  it("should return 400 if no id is provided", () => {
    return api.put("/movie/")
      .expect(400)
      .then(res => {
        expect(res.body.message).toBe("Please provide an id");
      });
  });

  it("should return 500 if params are provided", () => {
    return api.put("/movie/m-3")
      .expect(500)
      .then(res => {
        expect(res.body.code).toBe("InternalError");
      })
  });

  it("should return 400 if params are empty", () => {
    return api.put("/movie/m-3")
      .send({})
      .expect(400)
      .then(res => {
        expect(res.body.message).toBe("Please provide all required fields");
      });
  });

  it("should return 200 with correct paramters", () => {
    return api.put("/movie/m-3")
      .send({
        actors: [ 'a-2' ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum dicta deleniti fuga eos iste. Voluptate modi at sit sint, corporis, expedita iusto eaque impedit hic amet earum eligendi animi libero.',
        director: 'Lorem ipsum',
        genres: [ 'Comedy'],
        name: 'Dolor Sit Amet',
        rating: '8.5',
        releaseDate: 'Sun Dec 25 2016 00:00:00 GMT-0500 (EST)' 
      })
      .expect(200)
      .then(res => {
        expect(res.body.success).toBe(true);
      });
  });
});
