import r from "rethinkdb";
import restify from "restify";

const getMovie = (req, res, next) => {
  if (!req.params.id) {
    return next(new restify.BadRequestError("Movie id is required"));
  }
  r.table("movies")
    .get(req.params.id)
    .run(req._dbConn)
    .then((movie) => {
      req._dbConn.close();
      res.json(movie);
    })
    .catch((e) => {
      return next(new restify.InternalServerError());
    });
};

export default getMovie;
