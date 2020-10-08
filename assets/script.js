var historyArray = JSON.parse(localStorage.getItem("local")) || [];

//ajax function to pull info and display
function displayProduct(userInput) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/product/search?store_id=3991&keyword=" + userInput + "&sponsored=1&limit=1&offset=3",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "target-com-store-product-reviews-locations-data.p.rapidapi.com",
            "x-rapidapi-key": "f99e0469cemsh0ae16a198b31ac0p16360bjsn746b7a844c6a"
        }
    };

    $.ajax(settings).then(function(response) {
        console.log(response);
        //add code here to pull information
        if (historyArray.indexOf(userInput) === -1) {
            historyArray.push(userInput);
            localStorage.setItem("local", JSON.stringify(historyArray));
            newButtons(userInput);
        }

        var title = "target.com" + response.products[0].url

        var titleEle = ("<p>").text(title);

        $("#targetContainer").appened(titleEle);
    });
}

//function for creating new buttons
function newButtons() {
    //empty the buttons view before adding buttons
    $(".dropdown-content").empty();

    for (var i = 0; i < historyArray.length; i++) {

        var newBtn = $("<li>");
        newBtn.addClass("btn");
        newBtn.attr("data-name", historyArray[i]);
        newBtn.text(historyArray[i]);
        $(".dropdown-content").prepend(newBtn);
    }
}

//onclick submit search function
$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var userInput = $("#searchInput").val().trim();

    displayProduct(userInput);
})

//onClick function for newBtn list
$(".dropdown-content").on("click", "btn", function() {
    var userInput = $(this).attr("data-name");
    displayProduct(userInput);
})

//function for drop down 
$('.dropdown-trigger').dropdown();