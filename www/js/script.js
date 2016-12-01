var body_part;
localStorage.setItem('key', "trnsl.1.1.20161201T024454Z.d49429b803c4216c.0539036a46d4482ed3c42c589e52375ed3a07b1a");

$(document).ready(function() {
  langMenu();
  langPain();
  ajaxSpeech("Speak", "speech_submit", "value");
  ajaxSpeech("Type your speech", "speech_submit", "value");

});

function langPain() {
  ajaxCall("Pain", "pain_header");
  ajaxCall("Chest", "chest");
  ajaxCall("Back", "back");
  ajaxCall("Head", "head");
  ajaxCall("Neck", "neck");
  ajaxCall("Stomach", "stomach");
  ajaxCall("Arm", "arm");
  ajaxCall("Leg", "leg");
  ajaxCall("Shoulder", "shoulder");
  ajaxCall("Hip", "hip");
}

function langMenu() {
  ajaxCall("Welcome", "welcome");
  ajaxCall("Call Nurse", "nurse_button");
  ajaxCall("Pain", "pain_button");
  ajaxCall("I Need", "need_button");
  ajaxCall("I Feel", "feel_button");
  ajaxCall("Social", "social_button");
  ajaxCall("Room Control", "room_button");
  ajaxCall("Yes", "yes");
  ajaxCall("No", "no");
  ajaxCall("I don't know", "dont");
  ajaxCall("Maybe", "maybe");
  ajaxCall("Thank you", "thanks");
}

function ajaxSpeech(text, target, prop) {
  var element = document.getElementById(target);
  if(!element) {
    return;
  }

  var lang = localStorage.getItem('language');
  var key = localStorage.getItem('key');
  var translate = "en-" + lang;
  $.ajax({
    url:"https://translate.yandex.net/api/v1.5/tr.json/translate?key="+ key + "&lang=" + translate + "&text=" + text,
    dataType:"json",
    success: function(data) {
      var t = "#"+target;
      $(t).empty();
      $(t).prop(prop, data.text);
      if (element.offsetHeight < element.scrollHeight ||
          element.offsetWidth < element.scrollWidth) {
            var width = $(t).height();
            $(t).css("font-size", width*.50+ "px");
      }
    },
    error: function(err) {
      console.log("error", err);
    }
  });
}

function ajaxCall(text, target) {
  var lang = localStorage.getItem('language');
  var key = localStorage.getItem('key');
  var translate = "en-" + lang;
  $.ajax({
    url:"https://translate.yandex.net/api/v1.5/tr.json/translate?key="+ key + "&lang=" + translate + "&text=" + text,
    dataType:"json",
    success: function(data) {
      var t = "#"+target;
      $(t).empty();
      $(t).append(data.text);
      var element = document.getElementById(target);
      if(!element) {
        return;
      }
      if (element.offsetHeight < element.scrollHeight ||
          element.offsetWidth < element.scrollWidth) {
            var width = $(t).height();
            $(t).css("font-size", width*.50+ "px");
      }
    },
    error: function(err) {
      console.log("error", err);
    }
  });
}

$('.speech-form').on('submit', function () {
    var speech = $('#speech_text').val();
    speak(speech);
    return false;
});

function callNurse() {
  speak("Calling nurse");
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
  $("#pain_scale").fadeOut("fast", function() {
    $("#pain_panel").fadeOut("fast", function() {
      $("#content").fadeIn();
    });
  });
}

function pain(part) {
  body_part = part;
  $( "#content" ).fadeOut("fast", function() {
    $("#pain_panel").fadeOut("fast", function() {
        $("#pain_scale").show(1000);
    });
  });
}

function painScale(number) {
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

function need(action) {
  var message = "I need " + action;
  $( "#content" ).fadeOut("fast", function() {
    var need = "<h1> "+ message + " </h1>";
    var img = "<br><br><br><img src='../img/callnurse.png'>"
    $("#need_photo").empty();
    $("#need_photo").append(img);
    $("#need_headers").empty();
    $("#need_headers").append(need);
    $("#need_panel").show("slow", function() {
        speak(message);
        $(this).delay(4000).fadeOut("slow", function() {
          $("#content").fadeIn();
        });
    });
  });
}

function feeling(emotion) {
  var message = "I feel " + emotion;
  var picture = emotion + ".png";
  $("#content").fadeOut("fast", function() {
    var feeling = "<h1> "+ message + " </h1>";
    var img = "<br><br><br><img style='width:150px;height:150px' src='../img/" + picture + "'>";
    $("#feeling_photo").empty();
    $("#feeling_photo").append(img);
    $("#feeling_headers").empty();
    $("#feeling_headers").append(feeling);
    $("#feeling_panel").show("slow", function(){
      speak(message);
      $(this).delay(4000).fadeOut("slow", function() {
        $("#content").fadeIn();
      });
    });
  });
}

function control(object) {
  var picture = object.replace(" ", "_")+".png";
  $("#content").fadeOut("fast", function() {
    var action = "<h1> "+ object + " </h1>";
    var img = "<br><br><br><img style='width:150px;height:150px' src='../img/" + picture + "'>";
    $("#control_photo").empty();
    $("#control_photo").append(img);
    $("#control_headers").empty();
    $("#control_headers").append(action);
    $("#control_panel").show("slow", function() {
      console.log("SHOWING");
      $(this).delay(4000).fadeOut("slow", function() {
        $("#content").fadeIn();
      });
    });
  });
}

function setLanguage(lang, button) {
  $(".square_button").css("box-shadow", "");
  $(button).css('box-shadow', '5px 5px 5px #5499C7');
  localStorage.setItem('language', lang);
}

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message);
  msg.lang = "en-US";
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
}

function test() {
  var voices = window.speechSynthesis.getVoices();
  console.log(voices);
}
