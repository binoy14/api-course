import r from "rethinkdb";
import restify from "restify";

const getMovies = (req, res, next) => {
  r.table("movies")
    .run(req._dbConn)
    .then((cursor) => {
      return cursor.toArray();
    })
    .then((movies) => {
      req._dbConn.close();
      res.json(movies);
    })
    .catch((e) => {
      return next(new restify.InternalServerError());
    });
};

export default getMovies;
