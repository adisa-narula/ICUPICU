var body_part;

$.getJSON("data/information.json", function(data)
{
    $("#welcome").append("Welcome " + data.first_name + " " + data.last_name);
});

$('.speech-form').on('submit', function () {
    var speech = $('#speech_text').val();
    speak(speech);
    return false;
});

function callNurse() {

  console.log("calling nurse");

  speak("Calling nurse");
  // location.href = '../index.html'
  $("#content").fadeOut( "fast");
  $("#pain_scale").fadeOut("fast");
  $("#pain_panel").fadeOut("fast");
  $( "#call_nurse" ).show(1000, function() {
    $("#nurse_button").attr("aria-hidden","true");
    $(this).delay(5000).fadeOut("slow", function() {
      $("#content").fadeIn();
      $("#nurse_button").attr("aria-hidden","false");
    });
 });
}

function cancelPain(cancel) {
  console.log("Canceling " + cancel);
  $("#pain_scale").fadeOut("fast", function() {
    $("#pain_panel").fadeOut("fast", function() {
      $("#content").fadeIn();
    });
  });
}

function pain(part) {
  console.log("pain: " + part);
  body_part = part;
  $( "#content" ).fadeOut("fast", function() {
    $("#pain_panel").fadeOut("fast", function() {
        $("#pain_scale").show(1000);
    });
  });
}

function painScale(number) {
  console.log("pain scale");
  var scaleID = "#pain"+number;
  $("#pain_scale").fadeOut("fast", function() {
    var pain = "<br><br><h1> "+ body_part + " Pain </h1>";
    var scale = "<br><h1> Scale: " + "</h1><br><br>";
    $("#pain_headers").empty();
    $("#pain_headers").append(pain);
    $("#pain_headers").append(scale);
    $(scaleID).show("fast");
    $("#pain_panel").show(1000, function(){
      speak("My " + body_part + " hurts and the pain scale is " + number);
      $(this).delay(4000).fadeOut("slow", function() {
        $(scaleID).hide();
        $("#content").fadeIn();
      });
    });
  });
}

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message);
  msg.rate = 0.8;
  window.speechSynthesis.speak(msg);
  var voices = window.speechSynthesis.getVoices();
  // console.log(voices);
}
