$(document).ready(function () {
    
  let topics= ['Pikachu', 'Lucario', 'Eevee', 'Mew', 'Charizard', 'Blastoise', 'Snorlax', 'Psyduck',
  'Meowth', 'Haunter']

  function gifButtons(){

    // Deleting the buttons prior to adding new Pokemon buttons
    $('#buttonBois').empty();

    // This for loop will create a button for the chosen topics above for the user to click on before they add their own
    for (i = 0; i < topics.length; i++) {

      // The buttons will be given a type of 'button', have the content of the index of topics,
      // be given a class of .btn(for future use), and be assigned a value of the topic it 
      // corresponds to with the attribute 'data
      button= $('<button type=' + 'button' + '>' + topics[i] + '</button>').addClass('btn').attr('data', topics[i]);
      $('#buttonBois').append(button);

    };

  }

  // Putting this here will make sure that the topics buttons will show up on the page first
  gifButtons();

  $('#submitboi').on('click', function(event){

    // This will prevent the default behavior of the form since the button is inside of a form
    event.preventDefault();
  
    // Returns the value of the value in the topic input id
    newGif= $('#gif-input').val();
    // These two lines will add the new gif to the buttons area
    topics.push(newGif);
    gifButtons();

  });
  
  // This next part is the ajax call to load the gifs onto the page, and the event listener will be the buttons
  $('#buttonBois').on('click', '.btn', function() {

    // This pulls the value of the button clicked by the user
    let gifs= $(this).attr('data')
    var queryURL= 'https://api.giphy.com/v1/gifs/search?q=' + gifs + '&api_key=pt60h37z2e8OWaFPknx60JqEPkdjokFx&limit=10'

    $.ajax({

      url: queryURL,
      method: 'GET'

    }).then(function(response) {

      console.log(response)
      let results= response.data;

      for (i = 0; i < results.length; i++) {

        // This will create a new div for the gifs to sit inside
        let Gifs= $('<div>');

        // This creates a p tag for the title and rating text to go into
        var myText= $('<h4>');
        var myTitle= $('<h4>');
        // This puts the rating onto the page
        $(myTitle).text('Title: ' + results[i].title);
        $(myText).text('Rating: ' + results[i].rating);
        // This creates an img tag for the gifs to be loaded onto, and below is where all the data types are being added to it
        var loadedGifs= $('<img>')
        // This source makes it so that the gifs will be in the still state when first
        // loaded onto the page
        loadedGifs.attr('src', results[i].images.fixed_height_still.url);
        loadedGifs.attr('data-still', results[i].images.fixed_height_still.url);
        loadedGifs.attr('data-animate', results[i].images.fixed_height.url);
        loadedGifs.attr('data-state', 'still');
        loadedGifs.addClass('gif');

        // This adds the gifs to the gif section of my page
        Gifs.append(loadedGifs);
        Gifs.prepend(myText);
        Gifs.prepend(myTitle);
        $('#gifBois').prepend(Gifs);
        

      }

    })

  })

  $('#gifBois').on('click', '.gif', function(event) {

    event.preventDefault();
    // This will get the current state of the gif that the user clicks on
    let state= $(this).attr('data-state');
    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    if (state === 'still') {

      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');

    } else {

      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');

    }

  })

})
