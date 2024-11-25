chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return fetch('https://us-central1-vr-sign-up-page-with-firebase.cloudfunctions.net/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: details.url })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isPhishing) {
        return { cancel: true }; // Block the request
      }
    })
    .catch(error => {
      console.error('Error checking URL:', error);
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
