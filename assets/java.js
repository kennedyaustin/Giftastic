$(document).ready(function () {
    
  let topics= ['blue', 'yellow', 'green']

  function gifButtons(){

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $('#buttonBois').empty();

    // This for loop will create a button for the chosen topics above for the user to click on before they add their own
    for (i = 0; i < topics.length; i++) {

      button = $('<button type=' + 'button' + '>' + topics[i] + '</button>').addClass('btn btn-warning').attr('data',topics[i]);
      $("#buttonBois").append(button);

    };

  }

}