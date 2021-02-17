document.addEventListener('DOMContentLoaded', function(){
    let result = document.getElementById('result');
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                if (data === null) {
                    result.textContent = '何も取得できませんでした';
                } else {
                    let ul = document.createElement('ul');
                    for (let i = 0, len = data.length; i < len; i ++) {
                        let li = document.createElement('li');
                        let msg = document.createTextNode(data[i].msg);
                        li.appendChild(msg);
                        ul.appendChild(li);
                    }
                    result.replaceChild(ul, result.firstChild);
                }
            } else {
                result.textContent = "サーバーエラーが発生しました";
            }
        }else{
            result.textContent = '通信中う　...';
        }
    };
        xhr.open('GET', '../rest', true);
        xhr.send(null);

}, false);