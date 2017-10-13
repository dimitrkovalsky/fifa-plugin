if (false) {
    //Creating Elements
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    document.getElementsByClassName("ui-layout-left").appendChild(btn);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        debugger;
        console.log("Fifa message...")
        var btn = document.createElement("BUTTON");
        var t = document.createTextNode("CLICK ME");
        btn.appendChild(t);
        document.getElementsByClassName("ui-layout-left").appendChild(btn);
    }
);
