$(document).ready(function () {
    
  let topics= ['blue', 'yellow', 'green']

  function gifButtons(){

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
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
    var queryURL= 'https://api.giphy.com/v1/gifs/search?q=' + gifs + '&api_key=pt60h37z2e8OWaFPknx60JqEPkdjokFx'

    $.ajax({

      url: queryURL,
      method: 'GET'

    }).then(function(response) {

      console.log(response)
      let results= response.data;

    })

  })

})