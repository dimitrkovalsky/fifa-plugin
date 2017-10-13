var opened = chrome && chrome.devtools;


if(opened) {
  function send(sessionId, token, external, packet) {
      var xhr = new XMLHttpRequest();
      
      var json = JSON.stringify({
        sessionId: sessionId,
        token: token,
        external: external,
        cookies: packet.request.cookies
      });
      
      xhr.open("POST", 'http://localhost:5555/api/manage/token', true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      
      xhr.send(json);
      
      var result = xhr.responseText;
  }


  
  var urlTofetch = "https://utas.s2.fut.ea.com/ut/game/fifa17/tradepile";
  var externalUrl = "https://utas.external.s2.fut.ea.com/ut/game/fifa17/tradepile?brokeringSku=FFA17WEB";
  var authUrl = "https://www.easports.com/iframe/fut17/p/ut/auth"
  var SESSION_ID_HEADER = "X-UT-SID";
  var PHISHING_TOKEN_HEADER = "X-UT-PHISHING-TOKEN";
  var lastSessionId = "NOT SPECIFIED";
  var lastToken = "NOT SPECIFIED";
  var transfermarketUrl = "https://utas.external.s2.fut.ea.com/ut/game/fifa17/transfermarket";
  
  function findHeaderByName(headers, name) {
    for(var index in headers){
      if(headers[index].name == name){
        return headers[index].value;
      }
    }
  }

  function sendAuth(packet) {
    var xhr = new XMLHttpRequest();
    packet.getContent(function (content){
      var content = JSON.parse(content);
      content.cookies = packet.request.cookies;
      var json = JSON.stringify(content);
      
      xhr.open("POST", 'http://localhost:5555/api/manage/auth', true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

      
      xhr.send(json);
      
      var result = xhr.responseText;

    });
      
  }
  
  chrome.devtools.network.onRequestFinished.addListener(function(packet) {
      console.log("sending message");
      chrome.runtime.sendMessage({ "newIconPath" : "newicon.png" });
 /*     if(packet.request.url.indexOf(transfermarketUrl) !== -1){
     
        sendTransferMarket(packet.request.url, packet); 
      }
*/ 
     //  if(packet.request.url == authUrl){
     //    sendAuth(packet);
     //  }
    //
     //  if(packet.request.url == urlTofetch || packet.request.url == externalUrl) {
     //    var external = false;
    //
     //  var token = findHeaderByName(packet.request.headers, PHISHING_TOKEN_HEADER);
     //  var id = findHeaderByName(packet.request.headers, SESSION_ID_HEADER);
     //  if(token && id){
     //    lastSessionId = id;
     //    lastToken = token;
     //    send(id, token, external, packet);
     //  }
    //
     //
    //
	// }
  });
}