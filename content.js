document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      console.log(`selected ${selectedText}`)
      const button = document.createElement('button');console.log(`button made`);

      // 버튼 크기 위치
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect(); 
      
      button.textContent = `transration '${selectedText}'`;
      button.style.position = 'absolute';
      button.style.top = `${rect.top + window.scrollY - (rect.height) /*event.pageY*/}px`;
      button.style.left = `${rect.left + window.scrollX - (rect.width / 2) /*event.pageX - (selectedText.length*10/2)*/}px`;
      button.style.zIndex = 1000;
      document.body.appendChild(button);

      console.log(`button`);

  
      button.addEventListener('click', () => {
        const query = selectedText;
        const url = `https://papago.naver.com/?sk=auto&tk=ko&hn=1&st=${encodeURIComponent(query)}`;
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
  