function addClickHandler(selector, callback) {
    document.querySelector(selector).addEventListener('click', (e) => {
        e.preventDefault();
        callback();
    });
}

function sendRequest(url, requestMethod = 'GET', dataToSend = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const response = xhr.responseText;
                resolve(response);
            }
        };

        xhr.open(requestMethod, url, true);
        xhr.send();
    });
}

addClickHandler('#mailTracking', async () => {
    const response = await sendRequest(`/mailTracking`);
    document.querySelector('#mailTrackingResponse').innerHTML = `<pre>${response}</pre>`;
});

addClickHandler('#getTrackingLink', async () => {
    const link = document.querySelector('#redirectLink').value;
    if (!link) {
        alert('URL is required');
        return;
    }
    const response = await sendRequest(`/linkClickTracking?link=${link}`);
    document.querySelector('#redirectLinkResponse').innerHTML = `<pre>${response}</pre>`;
});

addClickHandler('#getTrackingStats', async () => {
    const link = document.querySelector('#trackingLink').value;
    if (!link) {
        alert('URL is required');
        return;
    }
    const response = await sendRequest(`/track/stats?link=${link}`);
    document.querySelector('#trackingLinkResponse').innerHTML = `<pre>${response}</pre>`;
});