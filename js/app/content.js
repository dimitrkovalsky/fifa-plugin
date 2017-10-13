function onLoad() {
    if (document.getElementsByClassName('footer')) {
        console.log("Document loaded");
        setTimeout(execute, 5000);

    } else {
        setTimeout(onLoad, 15);
    }
}

function onCheatClick() {

    console.log("On Click");
    $('.content').replaceWith('<section class="content"><div id="inserter"></div></section>');
    $('#inserter').html("<iframe style='width: 100%; height: 100%' src='http://localhost:5555'></iframe>");

}

function execute() {
    var menuElement = document.createElement('div');
    menuElement.setAttribute("class", "btnFooter btnClub");
    menuElement.setAttribute("aria-disabled", "false");
    menuElement.setAttribute("id", "cheat");
    menuElement.innerHTML = "Cheat3";
    $('#footer').append(menuElement);


    console.log("Added paragraph");
    document.getElementById('cheat').addEventListener('click', onCheatClick);
}

onLoad();

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    alert('Messagesss');
    debugger;


    if (request.action == 'PageInfo') {
        var pageInfos = [];

        $('a').each(function () {
            var pageInfo = {};

            var href = $(this).attr('href');

            if (href != null && href.indexOf("http") == 0) {
                //only add urls that start with http
                pageInfo.url = href
                pageInfos.push(pageInfo);
            }
        });

        sendResponse(pageInfos);
    }
});