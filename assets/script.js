// button functions:
// onclick search function (Clear previous results)
// generate product from Target and Walmart API and display on the main divs (display product picture, pricing, and rating)
// display 3-5 related products based on rating and pricing of what the user selects

// drop down:
// use localstorage to prepend previous search histories 
// search history buttons in drop down should do the same as the search onclick button

var historyArray = []
var targetProducts = $(this).attr("products-name");
var targetQueryURL = "https://target-com-store-product-reviews-locations-data.p.rapidapi.com/location/search?q=" + products + "07886803bfmsh242c167de073b87p14636bjsnce6e2e6994f5WP";
var amazonProducts = $(this).attr("products-name");
var amazonQueryURL = "https://api.zilerate.com/data/2.5/zilerate?q=" + products + "KMS3dUxPgy1wtcIpmUGBl3UpIJ8iTz0950pFPAWP";


function displayHistory() {
    $("#buttons-view").empty();

    for (var i = 0; i < historyArray.length; i++) {
        //Creating a button for each search history
        var history = $("<button>");
        //Adding a class to each button
        history.addClass("historyBtn");
        //Adding a data-attribute
        history.attr("data-name", historyArray[i]);
        //Providing text to each button
        history.text(historyArray[i]);
        $("HistoryDropDownDiv").prepend(history);
    }
}

$("search-button").on("click", function(event) {
            event.preventDefault();

            var historyArray = $("search-bar").val().trim();

            history.push(historyArray)
        }