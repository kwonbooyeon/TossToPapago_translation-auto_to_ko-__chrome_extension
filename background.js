chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "searchText",
      title: "translation '%s'",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchText" && info.selectionText) {
      const query = info.selectionText;
      const url = `https://papago.naver.com/?sk=auto&tk=ko&hn=1&st=${encodeURIComponent(query)}`;
      chrome.windows.create({ url: url });
    }
  });
  