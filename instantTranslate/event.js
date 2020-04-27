// ブラウザ起動時に同時に実行される処理
chrome.runtime.onInstalled.addListener(function(){

  api = getAPI();

  // 右クリックメニューを生成
  chrome.contextMenus.create({
    type: "normal",
    id: "parent",
  contexts : ["selection"],
    title: chrome.i18n.getMessage("contextMenuLabel")
  });
  
});

// コンテキストメニュークリック時に起動する処理
chrome.contextMenus.onClicked.addListener(function(_e) {
  //console.log("click context menu");
  // BrowserActionからの処理と統一するため
  // 右クリックからの処理はTextを取らずkickだけ実施
  value = getInstance();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //console.log("click context menu on tab");
    chrome.tabs.sendMessage(tabs[0].id, value);
  });
    
});

chrome.runtime.onConnect.addListener(function(port){
  //console.log("on connect add listener");
  port.onMessage.addListener(function(request){
    //console.log("get translation request");
    api = getAPI();
    var XMLReq = new XMLHttpRequest();
	encodeText = encodeURIComponent(request.text);
    url        = encodeURI(api["URL"]);
    uri        =       "?"+ api["source"]    + "=" + request.source;
    uri        = uri + "&"+ api["translate"] + "=" + request.target;
    uri        = uri + "&"+ api["text"]      + "=" + encodeText;
    urlAll     = url + uri;
    XMLReq.onreadystatechange = function() {
      if(XMLReq.readyState == 4 && XMLReq.status == 200) {
        //console.log("get xml ready");
		port.postMessage({translated: XMLReq.responseText});
      }
    }
    XMLReq.open("GET", urlAll,true);
    XMLReq.send();
  });
});
