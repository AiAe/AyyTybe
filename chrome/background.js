function run(){
    websocket = new WebSocket("ws://localhost:6969");
    websocket.onopen = function (evt) {onOpen(evt)};
    websocket.onclose = function (evt) {onClose(evt)};
    websocket.onerror = function (evt) {onError(evt)};
}

function readTabs(){
    chrome.tabs.query({},function(tabs){
        tabs.forEach(function(tab){
            if(tab.url.startsWith("https://youtube.com/") || tab.url.startsWith("https://www.youtube.com/")){
                if(tab.audible)
                    websocket.send(tab.title.slice(0, -10).trim());
            }
        });
    });
}

function updateTabs(){
    chrome.tabs.onUpdated.addListener(function() {
        readTabs();
    });
}

function onOpen(){
    websocket.send('');
    readTabs();
    updateTabs();
}

function onClose(){onOpen();}
function onError(){websocket.close();}

window.addEventListener("load", run, false);