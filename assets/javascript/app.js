
// array with button names for initial gif buttons
var summerButtons = ["Summer", "Vacation", "Sun", "suzy"];

// Function for displaying new gif buttons
function renderButtons() {

  $("#buttonsHere").empty();

  // Looping through the array of gif titles
  for (var i = 0; i < summerButtons.length; i++) {

    // dynamicaly generating buttons for each item in the array
    var a = $("<button>");
    a.attr("class", "btn btn-success btn-lg gifTitle");
    a.attr("data-name", summerButtons[i]);
    a.text(summerButtons[i]);
    $("#buttonsHere").append(a);
  }
}

// This function will create button from user input
$("#add-gif").on("click", function(event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  // This line grabs the input from the textbox
  var buttons = $("#gif-input").val().trim();

  // Adding the gif title from the textbox to our array
  summerButtons.push(buttons);

  // empty input box on form element to allow for new text
    $('input:text').focus(
      function(){
      $(this).val('');
    });
  // Calling renderButtons which generates the buttons from the summerButtons array
  renderButtons();

});



$("button").on("click", function() {

  var summerThing = $(this).attr("data-text");
  console.log(summerThing);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    summerThing + "&api_key=dc6zaTOxFJmzC&";


$.ajax({
  url: queryURL,
  method: 'GET'

}).done(function(response) {
  var results = response.data;
  console.log(response);


  for(var i = 0; i < 10; i++) {
    var newDiv = $("<div class = imageDiv>");

    var rating = results[i].rating;
    var p = $("<div>").text("Rating: " + rating);
    var image = $("<img>");

    image.attr("src", results[i].images.fixed_height_small_still.url);
    image.attr("data-still", results[i].images.fixed_height_small_still.url);
    image.attr("data-animate", results[i].images.fixed_height_small.url);
    image.attr("data-state", "still");
    image.attr("class", "gif");


    newDiv.prepend(summerThing);
    newDiv.prepend(p);
    newDiv.prepend(image);

    $("#images").prepend(newDiv);


    $(".gif").on("click", function() {

      var state = $(this).attr("data-state");

      if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

          }

        });
  }

  });

});


    renderButtons();
