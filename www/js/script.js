var body_part;
var scale;

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
  speak("Calling nurse");
  // location.href = '../index.html'
  $( "#content" ).fadeOut( "fast");
  $( "#call_nurse" ).show(1000, function() {
    $("#nurse_button").attr("aria-hidden","true");
    $(this).delay(5000).fadeOut("slow", function() {
      $("#content").fadeIn();
      $("#nurse_button").attr("aria-hidden","false");
    });
 });
}

function pain(part) {
  body_part = part;
  speak("My " + body_part + " hurts");
  $( "#content" ).fadeOut("fast");
  $("#pain_scale").show(1000);
}

function painScale(number) {
  scale = number;
  speak(scale);
  console.log(body_part);
  console.log(number);
}

function speak(message) {
  console.log(message);
  var msg = new SpeechSynthesisUtterance(message);
  msg.rate = 0.8;
  window.speechSynthesis.speak(msg);
  var voices = window.speechSynthesis.getVoices();
  // console.log(voices);
}
