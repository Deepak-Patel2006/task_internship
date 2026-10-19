const display = document.getElementById('display');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');
const lap = document.getElementById('lap');
const history = document.getElementById('lapList');

let hours = 0;
let minutes = 0;
let seconds = 0;
let timer ;

function time(){
    timer = setInterval(function() {
    if(seconds === 60){
        minutes++;
        seconds = 0;
    }else if(minutes === 60){
        hours++;
        minutes = 0;
    }
    display.innerText = 
       `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
       seconds ++;
    },1000);
}

start.addEventListener('click',()=>{
    if(timer != null) return;
    time();
});

pause.addEventListener('click',()=>{
    clearInterval(timer);
    timer = null;
});

reset.addEventListener('click',()=>{
    clearInterval(timer);
    timer = null;
    hours = 0;
    minutes = 0;
    seconds = 0;
    display.innerText = `00:00:00`;
    history.innerHTML = "";

});

lap.addEventListener('click',()=>{
    let list = document.createElement('li');
    list.innerText = display.innerText;
    history.appendChild(list);
});

