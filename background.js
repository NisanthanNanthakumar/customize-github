chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('github.com')) {
      chrome.tabs.sendMessage(tabId, { action: "checkForPullRequests" });
    }
  });