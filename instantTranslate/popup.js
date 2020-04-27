function switchLanguage(){
  source     = document.getElementById("source");
  target     = document.getElementById("target");
  if( source.selectedIndex == 0 ){
    return
  }
  swapIndex = source.selectedIndex;
  source.selectedIndex = target.selectedIndex + 1;
  target.selectedIndex = swapIndex - 1;
  saveInstance();
}

function getLanguage(){
  source         = document.getElementById("source");
  target         = document.getElementById("target");
  sourceIndex    = source.selectedIndex;
  targetIndex    = target.selectedIndex;
  sourceValue    = source.options[sourceIndex].value;
  targetValue    = target.options[targetIndex].value;
  translateValue = {source:sourceValue,target:targetValue};
  return translateValue;
}

// 初期値の登録
function saveDefault(){
  saveDefaultImple(getLanguage());
}

// 途中値の登録
function saveInstance(){
  saveInstanceImple(getLanguage());
}

// 翻訳の実行
function kickTranslation(){
  //console.log("kick translation");
  value = getLanguage();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //console.log("kick translation on tab");
    chrome.tabs.sendMessage(tabs[0].id, value);
  });
}

// 右クリックから呼び出された場合の翻訳実行
chrome.runtime.onMessage.addListener(function(response) {
  kickTranslation();
});

function setSelected(_selected){
  source               = document.getElementById("source");
  target               = document.getElementById("target");
  source.selectedIndex = sourceKeys.indexOf(_selected["source"],0);
  target.selectedIndex = targetKeys.indexOf(_selected["target"],0);
}

// ローカルストレージから初期値の読み込み
function loadDefault(){
  setSelected(getDefault());
  saveInstance();
}

// セッションストレージとローカルストレージから初期値の読み込み
function loadInstance(){
  setSelected(getInstance());
}

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {

  source               = document.getElementById("source");
  sourceKeys           = new Array(source.options.length);
  for(let i = 0; i < source.options.length; i++) {
    sourceKeys[i] = source.options[i].value;
	source.options[i].innerHTML = chrome.i18n.getMessage("lang_"+source.options[i].value.replace("-",""));
  }
  target               = document.getElementById("target");
  targetKeys           = new Array(target.options.length);
  for(let i = 0; i < target.options.length; i++) {
    targetKeys[i] = target.options[i].value;
	target.options[i].innerHTML = chrome.i18n.getMessage("lang_"+target.options[i].value.replace("-",""));
  }
  document.getElementById("sourceLabel").innerHTML = chrome.i18n.getMessage("sourceLanguageLabel");
  document.getElementById("targetLabel").innerHTML = chrome.i18n.getMessage("targetLanguageLabel");
  document.getElementById("translate"  ).innerHTML = chrome.i18n.getMessage("browserActionLabel" );
  
  document.getElementById('source'   ).addEventListener('change',saveInstance);
  document.getElementById('target'   ).addEventListener('change',saveInstance);
  document.getElementById('translate').addEventListener('click' ,kickTranslation);
  document.getElementById('switch'   ).addEventListener('click' ,switchLanguage);
  document.getElementById('save'     ).addEventListener('click' ,saveDefault);
  document.getElementById('reload'   ).addEventListener('click' ,loadDefault);
  loadInstance();
});
