/* global moment */

// When the page loads, grab and display all of our orders
$.get("/api/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("order");

      row.append("<p>" + data[i].author + " ordered.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
      row.append("<button>" + "ORDER OUT" + "</button>");

      $("#order-area").prepend(row);

    }

  }

});

// When user orders (clicks addBtn)
$("#order-submit").on("click", function(event) {
  event.preventDefault();

  // Make a neworder object
  var neworder = {
    author: $("#author").val().trim(),
    body: $("#order-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(neworder);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", neworder)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("order");

      row.append("<p>" + neworder.author + " ordered: </p>");
      row.append("<p>" + neworder.body + "</p>");
      row.append("<p>At " + moment(neworder.created_at).format("h:mma on dddd") + "</p>");

      $("#order-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#order-box").val("");
});
