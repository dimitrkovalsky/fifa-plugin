var text = document.getElementById('futHeaderTitle');
text.innerHTML = "Advanced search 3";

var items = document.getElementsByClassName("listFUTItem");

console.log("Found " + items.length + " player cards");

function createDiv(node) {
    var newDiv = document.createElement('div');
    newDiv.appendChild(node);
    newDiv.setAttribute("class", "auctionValue");
    return newDiv;
}

function getPlayerId(imagePath) {
    var fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
    var id = fileName.substring(0, fileName.indexOf("."));
    return id;
}

function getPlayersInfo(set) {
    var xhr = new XMLHttpRequest();
    var json = JSON.stringify(Array.from(ids.values()));
    console.log("Sending payload " + json);
    xhr.open("POST", 'http://localhost:5555/api/player/buy/get', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');


    xhr.send(json);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var message = JSON.parse(xhr.responseText);
            onPlayerUpdate(message);
        }
    };
}

function getIdFromItem(item) {
    try {
        if (item) {
            var img = item.getElementsByClassName("photo")[0];
            return getPlayerId(img.getAttribute('src'));
        }
    }
    catch (e) {
        return null;
    }
}

function makeAvailableBet(item) {
    item.style.backgroundColor = "#00d9d5";
}

function makeAvailableBuyNow(item) {
    item.style.backgroundColor = "#02f100";
}

function badItem(item) {
    item.style.backgroundColor = "#ff3900";
}

function calculateProfit(canBeBought, shouldSell) {
    var diff = shouldSell - canBeBought;
    return Math.floor(diff - shouldSell * 0.05);
}

function calculateNextBet(currentBet) {
    if (currentBet < 1000) {
        return currentBet + 50;
    } else if (currentBet <= 3000) {
        return currentBet + 200;
    } else if (currentBet <= 5000) {
        return currentBet + 500;
    } else if (currentBet < 10000) {
        return currentBet + 1000;
    } else if (currentBet < 50000) {
        return currentBet + 1500;
    } else if (currentBet < 100000) {
        return currentBet + 2500;
    } else {
        return currentBet + 5000;
    }
}

function showProfit(currentValue, desiredBuyNow, item) {
    var diff = desiredBuyNow - currentValue;
    item
}


function createSpan(text, color) {
    var newSpan = document.createElement('span');
    newSpan.style.fontSize = "24px";
    newSpan.style.fontWeight = "bolder";
    newSpan.style.fontFamily = "cursive";
    if (color === 'red') {
        newSpan.style.color = '#fe0000';
        newSpan.style['-webkit-text-stroke-width'] = "2px";
        newSpan.style['-webkit-text-stroke-color'] = "#000000";
    } else {
        newSpan.style.color = '#035117';
        newSpan.style['-webkit-text-stroke-width'] = "1px";
        newSpan.style['-webkit-text-stroke-color'] = "#a4ccad";
    }

    newSpan.innerHTML = text;
    return newSpan;
}


function addIndication(auctionElement, desiredBuyNow, betValue, buyNowValue) {
    var betProfit = desiredBuyNow - betValue;
    var buyProfit = desiredBuyNow - buyNowValue;

    var betSpan;
    if (betProfit < 0) {
        betSpan = createSpan(betProfit, 'red');
    } else {
        var text = betProfit == 0 ? "0" : "+" + betProfit;
        betSpan = createSpan(text, 'green');
    }

    var buySpan;
    if (buyProfit < 0) {
        buySpan = createSpan(buyProfit, 'red');
    } else {
        var text = buyProfit == 0 ? "0" : "+" + buyProfit;
        buySpan = createSpan(text, 'green');
    }

    var newDiv = createDiv(betSpan);
    var newDiv2 = createDiv(buySpan);
    auctionElement.appendChild(newDiv);
    auctionElement.appendChild(newDiv2);
}

function onPlayerUpdate(players) {
    for (var i in items) {
        var item = items[i];
        var playerId = getIdFromItem(item);
        if (!playerId)
            continue;
        var auction = item.getElementsByClassName('auction')[0];
        if (!players[playerId])
            continue;
        var desiredBuyNow = players[playerId].buyNow;
        var auctionValues = auction.getElementsByClassName('auctionValue');
        var betValue = parseInt(auctionValues[0].getElementsByClassName("coins value")[0].innerHTML.replace(/,/g, ""));
        var buyNowValue = parseInt(auctionValues[1].getElementsByClassName("coins value")[0].innerHTML.replace(/,/g, ""));
        if (buyNowValue <= desiredBuyNow) {
            makeAvailableBuyNow(item);
            showProfit(buyNowValue, desiredBuyNow, item);
        } else if (betValue <= desiredBuyNow) {
            makeAvailableBet(item);
            showProfit(buyNowValue, desiredBuyNow, item)
        } else {
            badItem(item);
        }
        addIndication(auction, desiredBuyNow, betValue, buyNowValue);
    }
}

function grabPLayersFromPage() {
    var ids = new Set();
    for (var i in items) {
        if (!items[i].getElementsByClassName)
            continue;
        var img = items[i].getElementsByClassName("photo")[0];
        var playerId = getPlayerId(img.getAttribute('src'));
        //   var auction = items[i].getElementsByClassName('auction')[0];
        // auction.appendChild(createDiv("RECO"));
        // auction.appendChild(createDiv("RECO 1"));
        // auction.appendChild(createDiv("RECO 2"));
        // auction.appendChild(createDiv(playerId));
        ids.add(playerId);
    }
    return ids;
}


var ids = grabPLayersFromPage();
console.log("Trying to fetch infos about players");
getPlayersInfo(ids);
