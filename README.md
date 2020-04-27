# TranslateSameView  
選択範囲の翻訳を同一画面に表示します  

別途必須の実装 : 翻訳API  
APIの作成はこちらを参照 : https://qiita.com/tanabee/items/c79c5c28ba0537112922  

この機能の使い方  
1 自分用の翻訳APIを作成する  
2 クローンする  
3 クローンしたフォルダをChrome拡張にインポート  
  フォルダのインポート方法はこちらを参照 : https://naokixtechnology.net/javascript/2851  
4 翻訳APIを入力  
  正常終了時にAPI情報を保存します  
  未保存の場合はステップ7で再要求されます。  
5 テキストを選択  
6 右クリック  
7 このコンテキストメニューを選択 \[ 選択範囲を翻訳する \]  
  
既知の問題  
1.URLスキームが \[chrome*://\] の場合動作しません。  
2.PDFでは動作しません、PDF\.jsをローカルまたはHTTPで使用する必要があります。  
  
# TranslateSameView  
translate of selection by chrome extention and display on same view  
  
requeired : translateAPI  
see site for original translate API creation : https://qiita.com/tanabee/items/c79c5c28ba0537112922  
  
usage  
1 make original translateAPI  
2 clone htmls  
3 cloned forder import to chome  
  see site for chrome extention import by forder : https://naokixtechnology.net/javascript/2851  
4 input api info  
  Save API information at normal end,  
  If unsaved, it will be re-requested by execution step 7.  
5 select text  
6 right click  
7 select context menu \[ Translate selection \]  
  
Known issues  
1.URL scheme \[chrome*://\] don't work.  
2.pdf don't work. need use pdf.js in local or http.  
  
