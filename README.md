구글 확장 프로그램을 작성하기 위해서는 `manifest.json`, `content.js`, `background.js`와 같은 파일들이 필요합니다. 이 예제에서는 `manifest.json`과 `content.js` 파일을 만듭니다.

1. `manifest.json` 파일:
```json
{
  "manifest_version": 3,
  "name": "Text Selection to URL",
  "version": "1.0",
  "permissions": ["contextMenus"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    }
  }
}
```

2. `background.js` 파일:
```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchText",
    title: "Search '%s'",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchText" && info.selectionText) {
    const query = info.selectionText;
    const url = `https://www.example.com/search?q=${encodeURIComponent(query)}`;
    chrome.tabs.create({ url: url });
  }
});
```

3. `content.js` 파일:
```javascript
document.addEventListener('mouseup', (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    const button = document.createElement('button');
    button.textContent = 'Search';
    button.style.position = 'absolute';
    button.style.top = `${event.pageY}px`;
    button.style.left = `${event.pageX}px`;
    button.style.zIndex = 1000;
    document.body.appendChild(button);

    button.addEventListener('click', () => {
      const query = selectedText;
      const url = `https://www.example.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
      document.body.removeChild(button);
    });

    document.addEventListener('click', () => {
      if (document.body.contains(button)) {
        document.body.removeChild(button);
      }
    }, { once: true });
  }
});
```

4. `popup.html` 파일:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Text Selection to URL</title>
</head>
<body>
  <h1>Extension is active</h1>
</body>
</html>
```

위 예제는 사용자가 텍스트를 선택했을 때, 해당 텍스트를 이용하여 `https://www.example.com/search?q=선택한텍스트` 형식의 URL로 이동하는 확장 프로그램을 만듭니다. `background.js`는 컨텍스트 메뉴 항목을 만들고, `content.js`는 선택된 텍스트에 대해 버튼을 생성하여 URL로 이동합니다. 

파일을 적절한 디렉토리에 저장하고, 확장 프로그램을 크롬 브라우저에 로드하여 사용해 보세요.