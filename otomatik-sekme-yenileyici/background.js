let intervalId;

function startReloading(interval) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    }, interval * 1000);
}

function stopReloading() {
    clearInterval(intervalId);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
        startReloading(request.interval);
        sendResponse({status: 'started'});
    } else if (request.action === 'stop') {
        stopReloading();
        sendResponse({status: 'stopped'});
    }
});
