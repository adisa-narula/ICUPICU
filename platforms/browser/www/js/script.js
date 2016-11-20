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
  $( "#call_nurse" ).show( "slow", function() {
    $("#nurse_button").attr("aria-hidden","true");
    $(this).delay(5000).fadeOut("slow", function() {
      $("#content").show();
      $("#nurse_button").attr("aria-hidden","false");
    });
 });
}

function speak(message) {
  console.log(message);
  var msg = new SpeechSynthesisUtterance(message);
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
  var voices = window.speechSynthesis.getVoices();
  // console.log(voices);
}
