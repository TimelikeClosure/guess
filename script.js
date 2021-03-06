

//  Declare and initialize target number
var the_number = null;

//  Declare and define initial lower and upper limits for guessing game
var lower_limit, upper_limit;

//  Begin pick_number() function definition
function pick_number() {

    //  If limit fields are set, set new limits
    var limits = [parseInt($('#set_lower_input').val()), parseInt($('#set_upper_input').val())];
    //console.log("limits : ", limits)
    if (!(isNaN(limits[0]))) {
        lower_limit = limits[0];
    }
    if (!(isNaN(limits[1]))) {
        upper_limit = limits[1];
    }
    $('#instructions').text('The current range is from ' + lower_limit + ' to ' + upper_limit);

    //  Reset the results
    $('#settings_div').text("Game reset!");
    $('#response_div').html('<ul><h4>Enter a number to guess above and click the "Guess!" button to start.</h4></ul>');

    //  Disable reset button, enable submit button
    $('#submit_button').prop("disabled", false);
    $('#reset_button').prop("disabled", true);

    //  Generate a random integer from lower_limit to upper_limit
    var random_number = Math.floor((upper_limit - lower_limit + 1)*Math.random() + lower_limit,1);
    //console.log("random_number : " + random_number);
    return random_number;
}
//  Close pick_number() function definition

//  Begin make_guess() function definition
function make_guess() {

    //  Parse a float number out of the guessed input
    var the_guess = parseFloat($('#guess_input').val());
    //console.log('the_guess (parsed) : ',the_guess);

    //  Enable reset button
    $('#reset_button').prop("disabled", false);
    $('#settings_div').text("");

    //  Save the response div selector and clear the text
    var response = $('#response_div');

    //  Create a guess hint object to be added to response
    var guess_hint = $('<ul>', {text: 'Your guess was : '});
    guess_hint.text(guess_hint.text() + $('#guess_input').val());
    guess_hint.html('<h4>' + guess_hint.text() + '</h4>');

    //  Clear the guess input
    $('#guess_input').val('');

    //  Begin the_guess to the_number comparisons
    if (isNaN(the_guess)) {  //  Test for non-numbers
        guess_hint.append($('<li>', {text: "What the? This is not a number? I can't even...? "}));
    } else {

        //  Save the difference between the_guess and the_number
        var difference = the_guess - the_number;

        if (difference == 0) {  //  Check to see if the guess is correct

            guess_hint.append($('<li>', {text: "You guessed right! Congratulations!"}));
            $('#submit_button').prop("disabled", true);  //  Disable the submit button

        } else {  //  If the guess is wrong...
            if (the_guess % 1 != 0) {  //  Check if the guess is actually an integer

                guess_hint.append($('<li>', {text: "Integer. Pick an integer. You do know what that is, don't you?"}));
            }
            if (the_guess < lower_limit || the_guess > upper_limit) {  //  Check if the guess is in range

                guess_hint.append($('<li>', {text: "In case you forgot how numbers work, " + the_guess + " is not between " + lower_limit + " and " + upper_limit + ". I think it goes without saying..."}));
            }
            if (difference < 0) {  //  Check if the guess was too low

                guess_hint.append($('<li>', {text: "You guessed too low.  Try again!"}));
            } else if (difference > 0) {  //  Check if the guess was too high
                guess_hint.append($('<li>', {text: "You guessed too high.  Try again!"}));
            } else {  //  Catch-all in case I did this wrong
                response.text(response.text() + "Well I don't know what happened...maybe the fish fell off the treadmill again?");
            }

        }
    }
    //  Close the_guess to the_number comparisons

    response.prepend(guess_hint);
}
//  Close make_guess() function definition

//  Begin jQuery event handlers on document ready
$(document).ready(function(){

    //  Call make_guess() on submit
    $('#submit_button').click(function(){
        make_guess();
    });
    //  Call pick_number() on submit
    $('#reset_button').click(function(){
        the_number = pick_number();
    });
    //  Enable reset button on changes
    $('#set_lower_input,#set_upper_input').change(function(){
        if ($('#set_upper_input').val() - $('#set_lower_input').val() >= 1) {
            $('#reset_button').prop("disabled", false);
            $('#settings_div').text("Press reset to apply changes.");
        } else {
            $('#reset_button').prop("disabled",true);
            $('#settings_div').text("Please set upper limit to at least one greater than lower limit!");
        }
    });
});
//  Close jQuery event handlers on document ready
