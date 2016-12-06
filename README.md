# ICUPICU

Source code filepath: www/index.html

Websocket server is being run off local Raspberry Pi hosted server.

Simple code for server, clients, and old version of app can be found here: https://github.com/OllieBck/TECHnicallySpeaking


# Instructions
  
  1. Clone this github repository onto your local machine. 
  2. Download phonegap desktop application and phone gap build on your phone. 
      * Phonegap getting started guide: http://phonegap.com/getstarted/
  4. Follow the instructions above to setup phonegap and upload the project that was cloned.
  5. The front page of Technically Speaking app is in www/index.html.
  6. Setup local server on a Raspberry Pi or cloud server: https://github.com/OllieBck/TECHnicallySpeaking/tree/master/SimpleWSServer and download the websocket module by typing "npm install ws" into directory -- to run on start-up on Raspberry Pi, add to rc.local script
  7. Control of the television can be done by uploading https://github.com/OllieBck/TECHnicallySpeaking/blob/master/IRCODE/IRCODE.ino to an Arduino Uno or eqivalent
  8. Upload https://github.com/OllieBck/TECHnicallySpeaking/blob/master/WebSocketClient_Huzzah/WebSocketClient_Huzzah.ino to an Adafruit HUZZAH, connecting the two boards via serial
