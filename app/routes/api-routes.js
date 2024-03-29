// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all burgers
  app.get("/api/all", function(req, res) {
    var dbQuery = "SELECT * FROM orders";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // Add a order
  app.post("/api/new", function(req, res) {
    console.log("Burger Data:");
    console.log(req.body);

    var dbQuery = "INSERT INTO orders (author, body, created_at) VALUES (?,?,?)";

    connection.query(dbQuery, [req.body.author, req.body.body, req.body.created_at], function(err, result) {
      if (err) throw err;
      console.log("Burger Successfully Saved!");
      res.end();
    });
  });
};
