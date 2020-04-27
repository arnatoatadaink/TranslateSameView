// 初期値の取得
function getDefault(){
  defaultValue = window.localStorage.getItem("default");
  if( defaultValue != null ){
    defaultValue = JSON.parse(defaultValue);
  }else{
    // 自動検出して母語に翻訳
    defaultValue = {source:"",target:window.navigator.language}
  }
  return defaultValue;
}

// セッション上の最終値取得
function getInstance(){
  //console.log("get instance");
  instanceValue = window.localStorage.getItem("instance");
  if( instanceValue ){
    instanceValue = JSON.parse(instanceValue);
  }else{
    instanceValue = getDefault();
  }
  return instanceValue;
}

// 初期値の登録
function saveDefaultImple(_value){
  window.localStorage.setItem("default",JSON.stringify(_value));
}

// 途中値の登録
function saveInstanceImple(_value){
  window.localStorage.setItem("instance",JSON.stringify(_value));
}

// APIの設定を取得
function getAPI(){
  //console.log("get instance");
  APIValue = window.localStorage.getItem("API");
  if( APIValue　!= null ){
    APIValue = JSON.parse(APIValue);
  }else{
    APIValue = UserAPIrequest();
  }
  return APIValue;
}

function UserAPIrequest(){
  // 入力ダイアログを表示してAPIを設定
  api = {
	"URL"      :"",
    "source"   :"",
    "translate":"",
    "text"     :""
  };
    
  api["URL"]       = window.prompt(chrome.i18n.getMessage("requestAPI"), "");
  api["source"]    = window.prompt(chrome.i18n.getMessage("requestSourceArg"), "source");
  api["translate"] = window.prompt(chrome.i18n.getMessage("requestTranslateArg"), "translate");
  api["text"]      = window.prompt(chrome.i18n.getMessage("requestTextArg"), "text");
  //console.log("get translation request");
  var XMLReq = new XMLHttpRequest();
  url    = api["URL"];
  uri    =       "?"+ api["source"]    +"=en";
  uri    = uri + "&"+ api["translate"] +"=ja";
  uri    = uri + "&"+ api["text"]      +"=test";
  urlAll = encodeURI(url) + uri;
  XMLReq.onreadystatechange = function() {
    if(XMLReq.readyState == 4 ) {
      //console.log("get xml ready");
	  if( XMLReq.status == 200 ){
		console.log(XMLReq.responseText);
        if( XMLReq.responseText == "テスト" ){
          saveAPIValue(api);
		  alert(chrome.i18n.getMessage("saveAPI"))
        }else{
          alert(chrome.i18n.getMessage("APIerror1"))
		}
	  }else{
        alert(chrome.i18n.getMessage("APIerror2"))
	  }
	}
  }
  XMLReq.open("GET", urlAll,true);
  XMLReq.send();
  return api;
}

function saveAPIValue(_value){
  window.localStorage.setItem("API",JSON.stringify(_value));
}
