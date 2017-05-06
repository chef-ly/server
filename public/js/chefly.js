$(function() {
  $('#send').on('click', function() {
    var email = $('#eml').val();

    if (validateEmail(email)) {
      $.ajax({
        url: '/signup/' + email,
      })
      .success(function(data) {
        $('#error').hide();
        $('#success').text("Awesome! You'll hear from us soon!").show();
      })
      .fail(function(err){
        $('#error').text('Oops, there was a problem saving your email address!').show();
      });
    } else {
      $('#error').text('Invalid email address').show();
    }
  });
});

function validateEmail(eml) {
  var s = eml.split('@');
  if (s.length == 2 && s[0].length > 0 && s[1].length > 0) {
    return true;
  } else {
    return false;
  }
}