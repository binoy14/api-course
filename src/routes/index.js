import Movies from "./movies";

const routes = (server) => {
  server.get("/", (req, res) => {
    res.send("Hello from restify boilterplate");
  });

  server.get("/movie", Movies.getMovies);
  server.get("/movie/:id", Movies.getMovie);
  server.post("/movie", Movies.postMovie);
  server.put("/movie/:id", Movies.putMovie);
  server.del("/movie/:id", Movies.deleteMovie);
};

export default routes;
