$(document).ready(function() {

    //aray of restaurants
  var restaurant = [
    "Chipotle", "Arby's", "Taco Bell", "McDonalds", "Burger King", "KFC"
  ];
  console.log(restaurant);

  // function to make buttons and add to page
  function populateButtons(restaurantArray, foodPlaces, restaurantButtons) {
    
    //clear before adding buttons
    $(restaurantButtons).empty();
    // Loops through the array of topics to create buttons for all topics

    for (var i = 0; i < restaurantArray.length; i++) {
      var a = $("<button>");
      a.addClass(foodPlaces);
      a.attr("data-type", restaurantArray[i]);
      a.text(restaurantArray[i]);
      $(restaurantButtons).append(a);
    }

  }

  $(document).on("click", ".restaurant-button", function() {
    $("#restaurants").empty();
    $(".restaurant-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=WanmLfg4dTuAWmLrrDrqnFPx7gM1LDbD&limit=10";
    console.log(restaurant);
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response)
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var restaurantDiv = $("<div class=\"restaurant-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var restaurantImage = $("<img>");
          restaurantImage.attr("src", still);
          restaurantImage.attr("data-still", still);
          restaurantImage.attr("data-animate", animated);
          restaurantImage.attr("data-state", "still");
          restaurantImage.addClass("restaurant-image");

          restaurantDiv.append(p);
          restaurantDiv.append(restaurantImage);

          $("#restaurant").append(restaurantDiv);
        }
      });

  
      
  });

  

  $(document).on("click", ".restaurant-image", function() {
     

    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    // Else set src to the data-still value
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-restaurant").on("click", function(event) {
    event.preventDefault();
    var newRestaurant = $("input").eq(0).val();

    if (newRestaurant.length > 2) {
      restaurant.push(newRestaurant);
      console.log(newRestaurant);
    }

    populateButtons(restaurant, "restaurant-button", "#restaurant-buttons");

  });

  populateButtons(restaurant, "restaurant-button", "#restaurant-buttons");
});

    