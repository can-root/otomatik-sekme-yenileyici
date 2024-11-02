let intervalId;

document.getElementById('toggle').addEventListener('change', function() {
    const interval = parseInt(document.getElementById('interval').value);
    if (this.checked) {
        if (isNaN(interval) || interval <= 0) {
            this.checked = false;
            return;
        }

        chrome.runtime.sendMessage({action: 'start', interval: interval}, (response) => {
            console.log(response.status);
        });
    } else {
        chrome.runtime.sendMessage({action: 'stop'}, (response) => {
            console.log(response.status);
        });
    }
});
