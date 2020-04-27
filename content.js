
var mouseEvent = undefined;
document.addEventListener('contextmenu',function(e){mouseEvent = e;},true);
document.addEventListener('click',function(e){mouseEvent = e;},true);

chrome.runtime.onMessage.addListener(function(response) {
  //console.log("content on Message");
  // 選択言語が同一
  if( response.source == response.target ){
    //console.log("unuse translate");
    return true;
  }
  // 対象のテキストを確認
  var selected     = window.getSelection();
  var selectedText = selected.toString();
  // テキストを選択していない
  if( selectedText == "" ){
    //console.log("un select");
    return true;
  }
  if( [...selectedText.matchAll(/[^\r\n 　]+/g)].length == 0 ){
      //console.log("not prints");
      return true;
  }
  value = {
    source:response.source,
    target:response.target,
    text  :selectedText
  }
  callTranslation(value,mouseEvent);
  
  return true;
});

function callTranslation(_value,_mouseEvent){
  //console.log("call Translation");
  var port = chrome.runtime.connect();
  setMethod　=　setProp(chrome.i18n.getMessage("waitLabel"),_value,_mouseEvent);
  port.onMessage.addListener(function(response) {
    //console.log("get translation response");
    setMethod(response.translated);
  });
  port.postMessage(_value);
}

// 翻訳結果を表示する為の窓を生成
function setProp(_waitingMessage,_value,_mouseEvent){
  //console.log("set prop");
  var divFrame    = document.createElement("div");
  var pFrame      = document.createElement("p");
  var textValue   = document.createTextNode(_waitingMessage);
  var closeSpan   = document.createElement("span");
  var closeButton = document.createElement("input");
  var linkSpan    = document.createElement("span");
  var linkDiv     = document.createElement("div");
  var linkValue   = document.createElement("a");
  var linkText    = document.createTextNode(chrome.i18n.getMessage("linkOpen"));
  
  closeSpan.appendChild(closeButton);
  divFrame.appendChild(closeSpan);
  linkValue.appendChild(linkText);
  linkDiv.appendChild(linkValue);
  linkSpan.appendChild(linkDiv);
  divFrame.appendChild(linkSpan);
  pFrame.appendChild(textValue);
  divFrame.appendChild(pFrame);

  if( _value.source == "" ){
    sourceLanguage = "auto";
  }else{
    sourceLanguage = _value.source;
  }
  linkURL  = "https://translate.google.co.jp/?hl=";
  linkURL += window.navigator.language;
  linkURL += "#view=home&op=translate&sl=";
  linkURL += sourceLanguage;
  linkURL += "&tl=";
  linkURL += _value.target;
  linkURL += "&text=";
  linkURL += encodeURIComponent(_value.text);
  linkValue.setAttribute("href",linkURL);
  linkValue.setAttribute("target","_blank");
  linkValue.setAttribute("rel","noopener noreferrer");
  linkDiv.setAttribute("style","margin-top:-37px;margin-left:39px;margin-right:10px;box-sizing:border-box;");
  linkSpan.setAttribute("style","all: initial;display:inline;box-sizing:border-box;")
  
  closeButton.addEventListener("click",function(e){document.body.removeChild(divFrame);});
  closeButton.setAttribute("type", "button");
  closeAttr  = "all: initial;";
  closeAttr += "-webkit-appearance: push-button;";
  closeAttr += "user-select: none;";
  closeAttr += "white-space: pre;";
  closeAttr += "align-items: flex-start;";
  closeAttr += "text-align: center;";
  closeAttr += "cursor: default;";
  closeAttr += "color: buttontext;";
  closeAttr += "background-color: buttonface;";
  closeAttr += "box-sizing: border-box;";
  closeAttr += "padding: 1px 6px;";
  closeAttr += "border-width: 2px;";
  closeAttr += "border-style: outset;";
  closeAttr += "border-color: buttonface;";
  closeAttr += "border-image: initial;";
  
  closeAttr += "box-sizing: border-box;";
  closeAttr += "width:25px;height:25px;";
  closeAttr += "background-image:url("+chrome.runtime.getURL("images/close.png")+");";
  closeAttr += "background-repeat: no-repeat;";
  closeAttr += "background-position: center;";
  closeAttr += "margin:4px;padding;0";
  
  closeButton.setAttribute("style", closeAttr);
  closeSpan.setAttribute("style", "display:inline;box-sizing:border-box;");
  
  divAttr  = "all: initial;";
  divAttr += "box-sizing: border-box;";
  divAttr += "position:absolute;";
  divAttr += "top:" +(_mouseEvent.pageY+10)+"px;";
  divAttr += "left:"+(_mouseEvent.pageX+10)+"px;";
  divAttr += "background-color:white;";
  divAttr += "border: 2px solid #000000;";
  divAttr += "border-radius: 4px;";
  divAttr += "z-index:9999;";
  
  divFrame.setAttribute("style", divAttr);
  pFrame.setAttribute("style", "margin:10px;");
  document.body.appendChild(divFrame);
  
  // 翻訳結果設定関数を返す
  function switch_func(_text){
    var switchTextValue = document.createTextNode(_text);
	pFrame.appendChild(switchTextValue);
    pFrame.removeChild(textValue);
//    textValue.innerText = _text;
  }
  return switch_func;
}
