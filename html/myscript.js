document.addEventListener('DOMContentLoaded', function(){

    console.log('DomContentLoaded');

    document.getElementById('btn').addEventListener('click', function(){

        console.log('btnLoaded');

        document.getElementById('result').textContent = "ボタンが押されたよ";
        
    }, false);
}, false);