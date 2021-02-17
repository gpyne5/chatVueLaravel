document.addEventListener('DOMContentLoaded', function(){
    let xhr = new XMLHttpRequest();

    let result = document.getElementById('result');
    let myMsg = document.getElementById('mymsg');
    let otherMsg = document.getElementById('othermsg');
    let commentsLen = 0; //差分更新のためのカウンター
    let createCommentLen = 0;
    
    
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                if (data === null) {
                    result.textContent = '何も取得できませんでした';
                } else {
                    let user = data[1]; //ログインしているユーザー
                    let comments = data[0]; //コメントデータ
                    document.getElementById('user_id').value = user.id;

                    if (commentsLen === 0 || commentsLen !== comments.length){ //最初の1回目もしくはコメント数がカウンターと違ってたら
                        createCommentLen = comments.length - commentsLen; //更新すべき件数
                        commentsLen = comments.length; //差分更新のためのカウンターの更新
                        for (let i = 0, j = 1; i < createCommentLen; i ++, j ++) {
                            let li = document.createElement('li');
                            let msg = document.createTextNode(comments[commentsLen - j].msg); //Array[-1]みたいに後ろから指定できないので総数-1で一番うしろを指定
                            
                            //自分のコメントか他の人のコメントか判定
                            if (comments[commentsLen - j].user_id === user.id){ //restdataデータベースの user_id　と user.id　を比較
                                li.appendChild(msg);
                                myMsg.appendChild(li);
                            } else {
                                li.appendChild(msg);
                                otherMsg.appendChild(li);
                            }
                        }
                    }
                    result.textContent = '';
                }
            } else {
                result.textContent = "サーバーエラーが発生しました";
            }
        }else{
            result.textContent = '';
        }
    };
    document.getElementById('submit').addEventListener('click', function(){
        xhr.open('GET', '../rest/')
    })

    setInterval(function(){
        xhr.open('GET', '../rest', true);
        xhr.send(null);
    }, 5000);
    
}, false);