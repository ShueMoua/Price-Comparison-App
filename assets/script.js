// button functions:
// onclick search function (Clear previous results)
// generate product from Target and Walmart API and display on the main divs (display product picture, pricing, and rating)
// display 3-5 related products based on rating and pricing of what the user selects

// drop down:
// use localstorage to prepend previous search histories 
// search history buttons in drop down should do the same as the search onclick button

//Storing userInput into array and putting into localStorage
var historyArray = JSON.parse(localStorage.getItem("local")) || [];

//Adding userInput into the dropdown view
function submitButton() {
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

submitButton();


$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    //value gets store in a variable
    var userInput = $("#search").val().trim();

    // history.push(historyArray);

    displayProductDetails(userInput);
})


//ajax call to retrieve product information
function displayProductDetails(userInput) {
    var queryURL = ""

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        if (historyArray.indexOf(userInput) === -1) {
            historyArray.push(userInput);
            localStorage.setItem("local", JSON.stringify(historyArray));
            submitButton();
        }
        //Add product retreiving code here
    })
}

//Allows user to click on drop down and retrieve information from previous 
$("#buttons-view").on("click", function() {
    var userInput = $(this).attr("data-name");
    displayProductDetails(userInput);
})


//Hello world