var opened = chrome && chrome.devtools;


if(opened) {
  function send(sessionId, token, external) {
      var xhr = new XMLHttpRequest();
      
      var json = JSON.stringify({
        sessionId: sessionId,
        token: token,
        external: external
      });
      
      xhr.open("POST", 'http://localhost:5555/api/manage/token', true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
           if(xmlhttp.status == 200) {
            // sent
         }
        }
      };
      
      xhr.send(json);
      
      var result = xhr.responseText;
  }
  
  var urlTofetch = "https://utas.s2.fut.ea.com/ut/game/fifa17/tradepile";
  var externalUrl = "https://utas.external.s2.fut.ea.com/ut/game/fifa17/tradepile";
  var SESSION_ID_HEADER = "X-UT-SID";
  var PHISHING_TOKEN_HEADER = "X-UT-PHISHING-TOKEN";
  var lastSessionId = "NOT SPECIFIED";
  var lastToken = "NOT SPECIFIED";
  
  function findHeaderByName(headers, name) {
    for(var index in headers){
      if(headers[index].name == name){
        return headers[index].value;
      }
    }
  }
  
  chrome.devtools.network.onRequestFinished.addListener(function(request) {
      if(request.request.url == urlTofetch || request.request.url == externalUrl) {
        var external = false;
      if(request.request.url == externalUrl) {
        external = true;
      }
      var token = findHeaderByName(request.request.headers, PHISHING_TOKEN_HEADER);
      var id = findHeaderByName(request.request.headers, SESSION_ID_HEADER);
      if(token && id){
        lastSessionId = id;
        lastToken = token;
        send(id, token, external);
      }
	}
  });
}