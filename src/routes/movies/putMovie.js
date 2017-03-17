import r from "rethinkdb";
import restify from "restify";

const putMovie = (req, res, next) => {
  if (!req.params.id) {
    return next(new restify.BadRequestError("Please provide an id"))
  }

  const {
    actors,
    description,
    director,
    genres,
    name,
    rating,
    releaseDate,
  } = req.body;

  if (!actors || !description || !director || !genres || !name || !rating || !releaseDate) {
    return next(new restify.BadRequestError("Please provide all required fields"));
  }

  r.table("movies")
    .get(req.params.id)
    .update({
      actors,
      description,
      director,
      genres,
      name,
      rating,
      releaseDate,
    })
    .run(req._dbConn)
    .then(response => {
      req._dbConn.close();
      if (response.replaced === 1) {
        res.json({success: true});
      } else if (response.skipped === 1) {
        res.json({success: false, message: "No update neccessary"});
      } else {
        next(new restify.InternalServerError());
      }
    })
    .catch(err => {
      next(new restify.InternalServerError(err));
    });
};

export default putMovie;
