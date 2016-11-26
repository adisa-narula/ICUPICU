/*
Websocket (WS) server built with Express to utilize the MKR1000 and ArduinoHttpClient Library

Built from the example code offered at https://www.npmjs.com/package/ws

Modified by OllieBck Nov. 20, 2016
*/

var host = "192.168.1.7";
var ws = new WebSocket('ws://' + host + ':9111');
var light_state = null;
var tv_state = null;
var blinds_state = null;

function toggleLight(){
  // true == light is on  false == light is off
  if (light_state == true){
    var command = "light off";
    control('Light Off');
    light_state = false;
  }

  else {
    var command = "light on";
    control('Light On');
    light_state = true;
  }

  ws.send(command);
}

function toggleBlinds(){
  // true == blinds up  false == blinds down
  if (blinds_state == true){
    var command = "blinds down";
    control('Blinds Up');
    blinds_state = false;
  }

  else {
    var command = "blinds up";
    control('Blinds Up');
    blinds_state = true;
  }

  ws.send(command);
  console.log(blinds_state);
}


function toggleTV(){
  // true == tv is on  false == tv is off
  if (tv_state == true){
    var command = "tv off";
    tv_state = false;
    control('TV Off');
  }
  else {
    var command = "tv on";
    tv_state = true;
    control('TV On');
  }

  ws.send(command);
}

function volUp(){
  var command = "vol up";
  ws.send(command);
  control('Volume Up');
}

function volDown(){
  var command = "vol down";
  ws.send(command);
  control('Volume Down');
}

function tvForward(){
  var command = "forward";
  ws.send(command);
  control('Channel Up');
}

function tvBack(){
  var command = "back";
  ws.send(command);
  control('Channel Down');
}

function init(){
  ws.addEventListener('message', function(event){
    if (event.data == "connected"){
      document.getElementById('Connect').style.backgroundColor="green";
      //alert(event.data); // for debugging, might be good to attach to a page element to alert to connection
    }
    else{
      document.getElementById('Connect').style.backGroundColor="red";
    }

  });

  document.getElementById('light').addEventListener('click', function(){
    toggleLight()
  });

  document.getElementById('blinds').addEventListener('click', function(){
    toggleBlinds();
  });

  document.getElementById('bed').addEventListener('click', function(){
    moveBed();
  });

  document.getElementById('TV').addEventListener('click', function(){
    toggleTV();
  });

  document.getElementById('TVforward').addEventListener('click', function(){
    tvForward();
  });

  document.getElementById('TVback').addEventListener('click', function(){
    tvBack();
  });

  document.getElementById('TVvolUp').addEventListener('click', function(){
    volUp();
  });

  document.getElementById('TVvolDwn').addEventListener('click', function(){
    volDown();
  });




  /*
  // this piece of code presented in the examples wasn't working for me.
  ws.onmessage == function(event){
    console.log(event);
    document.getElementById('status').innerHTML = event.data;
  };
  */
}


window.addEventListener('load', init);
