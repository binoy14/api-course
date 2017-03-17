import r from "rethinkdb";
import restify from "restify";

let dbName = "movie_db";

if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "TEST") {
  dbName = "movie_test"
}

const connectToDb = (req, res, next) => {
  r.connect({
    db: dbName,
  }, (err, conn) => {
    if(err) next(new restify.InternalServerError("Unable to connect to database"));

    req._dbConn = conn;
    next();
  });
};

export default connectToDb;
