const log = console.log;

// Creates button with name
function createButton(name) {
    let newButton = $(`<button class="btn btn-character" data-name="${name.toLowerCase()}">${name}</button>`);
    $('#button-corral').append(newButton);
    log(newButton);
};
// Creates and appends inout form
function createInput() {
    let form = $(`<h3>Add a New Character</h3>
            <input type="text" class="form-control" name="" id="input-form" placeholder="Spiderman, Thor, The Avengers, etc...">
            <br>
            <button type="button" name="" id="add-new-character" class="btn btn-primary btn-lg btn-block" onclick="generateNewChar()">Add New
                Characters</button>`);
    log(form);
    $('#input').append(form);
    $('#input').addClass('visible');

};

function generateNewChar() {
    let newChar = $('#input-form').val().trim();
    createButton(newChar);
    $('#input-form').val("");
};

let startingButtonsArray = ["Iron Man", "Hulk", "Thor", "Black Panther", "Doctor Strange", "Deadpool", "The Avengers", "X-Men", "Fantastic Four", "Thanos", "Venom"];

$(document).on("click", '.btn-character', function () {

    $('#gif-corral').empty();
    $('#gif-corral').append(`<div id="input" class="footer text-center"></div>`);
    createInput();
    let queryName = $(this).attr("data-name");
    let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + queryName + "+marvel&limit=10&api_key=dc6zaTOxFJmzC";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            let results = response.data;
            log(results);
            for (let i = 0; i < results.length; i++) {
                let gifFrame = $(` <div class="gif-frame"></div>`);
                let gif = results[i].images.fixed_height.url;
                let gifPause = results[i].images.fixed_height_still.url;
                let image = $(`<img class="gif" src="${gif}" data-still="${gifPause}" data-animate="${gif}" data-state="animate"></img>`);
                gifFrame.append(image);
                $('#gif-corral').append(gifFrame);
            }

        });

});

$(document).on("click", ".gif", function () {
    let state = $(this).attr("data-state");

    if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$('#start-button').on('click', function (event) {
    event.preventDefault();
    $('#button-corral').html("");
    for (let i = 0; i < startingButtonsArray.length; i++) {
        let btnText = startingButtonsArray[i];
        createButton(btnText);
    }
    createInput();






})