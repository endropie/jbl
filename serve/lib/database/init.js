var pg = require("pg");
var assert = require("assert");

var DATABASE_URL = "postgresql://jbl:password@localhost:5432/jbldb";

// console.log('DATABASE_URL', DATABASE_URL)

function create_tables(callback) {
  var pool = new pg.Pool({ connectionString: DATABASE_URL });
  pool.connect(function (err, client) {
    assert(!err); // ==> if db connection fails then EXPLODE!!

    var file = require("path").resolve(__dirname + "/dump.sql");
    var query = require("fs").readFileSync(file, "utf8").toString();

    client.query(query, function (err, result) {
      if (err) return console.error("error running query", err);

      client.end();
      return callback(err, result);
    });
  });
}

create_tables((err) => {
  if (err) console.error(err);
  else console.log("\nDatabase init done!");
});
