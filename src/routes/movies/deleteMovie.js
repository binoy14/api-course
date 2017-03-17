import r from "rethinkdb";
import restify from "restify";

const deleteMovie = (req, res, next) => {
  if (!req.params.id) {
    return next(new restify.BadRequestError("Please provide the id"));
  }

  r.table("movies")
    .get(req.params.id)
    .delete()
    .run(req._dbConn)
    .then(response => {
      req._dbConn.close();
      if (response.deleted === 1) {
        res.json({success: true});
      } else {
        return next(new restify.InternalServerError());
      }
    })
    .catch(err => {
      return next(new restify.InternalServerError());
    });
};

export default deleteMovie;
