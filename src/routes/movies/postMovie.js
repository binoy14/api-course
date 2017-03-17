import r from "rethinkdb";
import restify from "restify";

const postMovie = (req, res, next) => {
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
    .insert({
      actors,
      description,
      director,
      genres,
      name,
      rating,
      releaseDate,
    })
    .run(req._dbConn)
    .then((response) => {
      req._dbConn.close();
      if (response.inserted === 1) {
        res.json({success: true});
      } else {
        return next(new restify.InternalServerError());
      }
    })
    .catch((err) => {
      return next(new restify.InternalServerError(err));
    });
};

export default postMovie;
