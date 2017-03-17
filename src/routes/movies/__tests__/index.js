import Movies from "../index";

describe("Movies", () => {
  it("should have have getMovies function", () => {
    expect(Movies.getMovies).toBeDefined();
  });

  it("should have getMovie function", () => {
    expect(Movies.getMovie).toBeDefined();
  });

  it("should have postMovie function", () => {
    expect(Movies.postMovie).toBeDefined();
  });

  it("should have putMovie function", () => {
    expect(Movies.putMovie).toBeDefined();
  });

  it("should have deleteMovie function", () => {
    expect(Movies.deleteMovie).toBeDefined();
  });
});
