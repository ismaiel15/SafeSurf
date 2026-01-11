chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const url = tab.url;

    if (!url) return;

    const dangerousPatterns = [
      "login",
      "secure",
      "verify",
      "update",
      "free",
      "bonus"
    ];

    const suspiciousDomains = [".xyz", ".tk", ".ru"];

    let isDangerous = false;

    dangerousPatterns.forEach(word => {
      if (url.toLowerCase().includes(word)) {
        isDangerous = true;
      }
    });

    suspiciousDomains.forEach(domain => {
      if (url.toLowerCase().endsWith(domain)) {
        isDangerous = true;
      }
    });

    if (isDangerous) {
      chrome.tabs.sendMessage(tabId, {
        action: "showWarning",
        url: url
      });
    }
  }
});