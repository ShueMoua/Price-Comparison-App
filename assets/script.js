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
            "x-rapidapi-key": "07886803bfmsh242c167de073b87p14636bjsnce6e2e6994f5"
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

        var name = response.products[0].title

        var nameEle = $("<p>").text(name);

        $("#targetContainer").append(nameEle);

        var imageURL = response.products[0].images[0].base_url + response.products[0].images[0].primary;

        var imageEle = $("<img>").attr("src", imageURL);

        $("#targetContainer").append(imageEle);

        var price = response.products[0].price.formatted_current_price

        var priceEle = $("<p>").text("Price: " + price);

        $("#targetContainer").append(priceEle);

        var rating = response.products[0].average_rating

        var ratingEle = $("<p>").text("Product Rating: " + rating);

        $("#targetContainer").append(ratingEle);

        var title = "https://target.com" + response.products[0].url;

        var titleEle = $("<a>");

        titleEle.attr("href", title);

        titleEle.text("Shop now: " + title);

        $("#targetContainer").append(titleEle);
    });

}

function displayProduct2(userInput) {

    var queryURL = "https://api.rainforestapi.com/request?api_key=demo&type=product&asin=B000YDDF6O&amazon_domain=amazon.com" + userInput + "&sponsored=1&limit=1&offset=3"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response2) {
        console.log(response2);
        //add code to retrieve elements here
        var name2 = response2.bestsellers[0].title;

        var name2Ele = $("<p>").text(name2);

        $("#walmartContainer").append(name2Ele);

        var image2URL = response2.bestsellers[0].image;

        var image2Ele = $("<img>").attr("src", image2URL);

        $("#walmartContainer").append(image2Ele);

        var price2 = response2.bestsellers[0].price.raw

        var price2Ele = $("<p>").text("Price: " + price2);

        $("#walmartContainer").append(price2Ele);

        var title2 = response2.bestsellers[0].link;

        var title2Ele = $("<a>");

        title2Ele.attr("href", title2);

        title2Ele.text("Shop now: " + title2);

        $("#walmartContainer").append(title2Ele);
    })
};



//function for creating new buttons
function newButtons() {
    //empty the buttons view before adding buttons
    $(".dropdown-content").empty();

    for (var i = 0; i < historyArray.length; i++) {

        var newBtn = $("<button>");
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
    displayProduct2(userInput);
})

//onClick function for newBtn list
$("#dropdown1").on("click", ".btn", function() {
    var userInput = $(this).attr("data-name");
    console.log("Hello World");
    displayProduct(userInput);

})

//function for drop down 
$('.dropdown-trigger').dropdown();