var running=false,hacked=false;
function luckyDraw(){
   running=true;
  var number=document.querySelectorAll(".num"),animtion=setInterval(()=>{
 number.forEach((item,index)=>{
    if(item.innerHTML=="Go!"){
      item.innerHTML=0;
    }
   switch(Number(item.innerHTML)){
     case 0: item.innerHTML=1;break;
     case 1: item.innerHTML=2;break;
     case 2: item.innerHTML=3;break;
     case 3: item.innerHTML=4;break;
     case 4: item.innerHTML=5;break;
     case 5: item.innerHTML=6;break;
     case 6: item.innerHTML=7;break;
     case 7: item.innerHTML=8;break;
     case 8: item.innerHTML=9;break;
     case 9: item.innerHTML=0;break;
    }
  })
},50);

setTimeout(()=>{
  var check=[];
  running=false;
  clearInterval(animtion);
  if(!hacked){
    for(let i=0;i<number.length;i++){   number[i].innerHTML=Math.floor(Math.random()*10);
        check.push(number[i].innerHTML) 
                               
  }
  }else{
    var n=Math.floor(Math.random()*10);
    for(let i=0;i<number.length;i++){   number[i].innerHTML=n;
        check.push(number[i].innerHTML) 
                               
  }
  }
  winner(check);
},4000)
}
function winner(e){
  if(e[0]==e[1] && e[1]==e[2]){
    document.querySelector(".screen h2").innerHTML="Congrats you won!!!";
    document.querySelector(".screen h2").style.color="#8BC34A";
  }else{
    document.querySelector(".screen h2").innerHTML="Sorry you need three of the same number to win <br> try again this might be your lucky time";
    document.querySelector(".screen h2").style.color="#F44336";
  }
}
document.querySelector(".draw").onclick=()=>{
  if(!running){
    hacked=false;
    luckyDraw();
    document.querySelector(".screen h2").innerHTML="";
  }
}
document.querySelector(".hack").onclick=()=>{
  if(!running){
    hacked=true;
    luckyDraw();
    document.querySelector(".screen h2").innerHTML="";
  }
}