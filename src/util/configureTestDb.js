import r from "rethinkdb";
import restify from "restify";
import chalk from "chalk";
import testData from "./testData";

function addingToDb(conn, tableName, data) {
  r.db("movie_test")
    .table(tableName)
    .insert(data)
    .run(conn)
    .then(response => {
      if(response.inserted === 1) {
        console.log(chalk.green(`Sample Data Inserted in ${chalk.blue(tableName)} table`));
      } else {
        console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
      } 
    })
    .catch(err => {
      console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
    });
}

function addTestData(conn, tableName) {
  let insertData = testData[tableName];
  if(tableName === "movies") {
    addingToDb(conn, tableName, insertData[0]);
    addingToDb(conn, tableName, insertData[1]);
    addingToDb(conn, tableName, insertData[2]);
  } else {
    addingToDb(conn, tableName, insertData);
  }
}

function createTable(conn, tableName) {
  r.db("movie_test")
    .tableCreate(tableName)
    .run(conn)
    .then(response => {
      if(response.tables_created === 1) {
        console.log(chalk.green(`${chalk.blue(tableName)} table created`));
        addTestData(conn, tableName);
      } else {
        console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
      }
    })
    .catch(err => {
      console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
    });
}

function createDatabase(conn) {
  r.dbCreate("movie_test")
    .run(conn)
    .then(response => {
      if(response.dbs_created === 1) {
        console.log(chalk.green("Test database created"));
        // Create the tables
        createTable(conn, "movies");
        createTable(conn, "actors");
      } else {
        console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
      }
    })
    .catch(err => {
      console.log(chalk.green(err)); 
      console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
    });
}

function dropDatabase(conn) {
  r.dbDrop("movie_test")
    .run(conn)
    .then(response => {
      if(response.dbs_dropped === 1) {
        console.log(chalk.green("Database Cleared"));
        createDatabase(conn);
      } else {
        console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
      }
    })
    .catch(err => {
      if(err.msg === "Database `movie_test` does not exist.") {
        console.log(chalk.green("Database Cleared"));
        createDatabase(conn);
      } else {
        console.log(chalk.red("Something unexpected happened, Please review the RethinDb Administration Console"));
      }
    });
}

export default function configureTestDb() {
  console.log(chalk.green("Configuring Testing Database"))
  // Connect to rethink
  r.connect()
    .then((conn) => {
      dropDatabase(conn);
    })
    .catch(err => new restify.InternalServerError("Cannot Connect to Database"));
}
