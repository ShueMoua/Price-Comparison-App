var historyArray = JSON.parse(localStorage.getItem("local")) || [];



//ajax function to pull info and display
function displayTargetProduct(userInput) {
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

        titleEle.text("Shop Now: " + title);

        $("#targetContainer").append(titleEle);
    });

}

function displayAmazonProduct(userInput) {
    var queryURL = ""
    switch (userInput) {
        case "lawn mower":
            queryURL = "https://api.rainforestapi.com/request?api_key=0660E882F0ED4700BD8EA3A7EF7512FB&type=product&amazon_domain=amazon.com&asin=B0881K29P6";
            break;
        case "freezer":
            queryURL = "https://api.rainforestapi.com/request?api_key=0660E882F0ED4700BD8EA3A7EF7512FB&type=product&amazon_domain=amazon.com&asin=B01N6X34NV";
            break;
        case "bissel":
            queryURL = "https://api.rainforestapi.com/request?api_key=0660E882F0ED4700BD8EA3A7EF7512FB&type=product&amazon_domain=amazon.com&asin=B07L69RL4B";
            break;
        case "bicycle":
            queryURL = "https://api.rainforestapi.com/request?api_key=0660E882F0ED4700BD8EA3A7EF7512FB&type=product&amazon_domain=amazon.com&asin=B08225C7QH";
            break;
        default:
            alert("No available products for Amazon");
            return 0;
    }


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response2) {
        console.log(response2);
        //add code to retrieve elements here
        var name2 = response2.product.title;

        var name2Ele = $("<p>").text(name2);

        $("#amazonContainer").append(name2Ele);

        var image2URL = response2.product.images[0].link;

        var image2Ele = $("<img>").attr("src", image2URL);

        image2Ele.css({ width: "400px" })

        $("#amazonContainer").append(image2Ele);

        // var price2 = response2.bestsellers[0].price.raw

        // var price2Ele = $("<p>").text("Price: " + price2);

        // $("#amazonContainer").append(price2Ele);

        var rating2 = response2.product.bestsellers_rank[1].rank;

        var rating2Ele = $("<p>").text(rating2);

        rating2Ele.text("Product Rating: " + rating2 + " Bestseller");

        $("#amazonContainer").append(rating2Ele);

        var shopURL = response2.product.link;

        var shopURLele = $("<a>");

        shopURLele.attr("href", shopURL)

        shopURLele.text("Shop Now: " + shopURL);

        $("#amazonContainer").append(shopURLele)
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

    displayTargetProduct(userInput);
    displayAmazonProduct(userInput);
})

//onClick function for newBtn list
$("#dropdown1").on("click", ".btn", function() {
    var userInput = $(this).attr("data-name");
    console.log("Hello World");
    displayTargetProduct(userInput);
    displayAmazonProduct(userInput);
})

//function for drop down 
$('.dropdown-trigger').dropdown();