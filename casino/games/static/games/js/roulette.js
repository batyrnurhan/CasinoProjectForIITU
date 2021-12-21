const btn = document.querySelector('.spin_button'),
      canvasBlock = document.querySelector('#canvas');  



let theWheel = new Winwheel({
    'canvasId' : 'canvas',
    'numSegments' : 12,
    'lineWidth'   : 3,
    'textAlignment' : 'center',
    'textOrientation' : 'horizontal',
    'innerRadius'  :  35,
    'outerRadius' : 165,
    'textFontSize' : 20,
    'textFontWeight' : 700,
    'rotationAngle' : -10,
    'segments'    : 
    [
        {'fillStyle' : '#eae56f', 'text' : '2x'},
        {'fillStyle' : '#89f26e', 'text' : '0'},
        {'fillStyle' : '#7de6ef', 'text' : '10x'},
        {'fillStyle' : '#e7706f', 'text' : '500x'},
        {'fillStyle' : '#eae56f', 'text' : '1x'},
        {'fillStyle' : '#89f26e', 'text' : '15x'},
        {'fillStyle' : '#7de6ef', 'text' : '500x'},
        {'fillStyle' : '#e7706f', 'text' : '10x'},
        {'fillStyle' : '#eae56f', 'text' : '0'},
        {'fillStyle' : '#89f26e', 'text' : '100x'},
        {'fillStyle' : '#7de6ef', 'text' : '5x'},
        {'fillStyle' : '#e7706f', 'text' : '1x'}
    ],
    'pointerGuide' :        // Turn pointer guide on.
        {
            'display'     : true,
            'strokeStyle' : '#800000',
            'lineWidth'   : 3
        },
    'animation' : {
            'type'     : 'spinToStop',
            'easing'   : 'expo.out', 
            'duration' : 10,    // Duration in seconds.
            'spins'    : 3,     // Default number of complete spins.
            'callbackFinished' : alertPrize, 
    }
});

let wheelSpinning = false;
let balance = 1000;//баланс юзера 
let gameBalance = 0;

function bet(value){
    gameBalance = parseInt(prompt(`Сколько хотите поставить?, у вас ${value} `, [1000]));
  
    while(!(Number.isInteger(gameBalance) && gameBalance<value)){
      gameBalance = parseInt(prompt(`Сколько хотите поставить?, у вас ${value} `, [1000]));
    }

    balance = balance - gameBalance;  
}


btn.addEventListener("click", ()=>{
    reset();
    startAnimation();
    bet(balance);
    wheelSpinning = true;  
    setTimeout(scaleWheel, 8000, wheelSpinning);
});

function startAnimation() {
    theWheel.startAnimation();  
}

function reset (){
    theWheel.stopAnimation(false);
    theWheel.draw();


    canvasBlock.height = 350;
    theWheel.centerY = 175;
    theWheel.outerRadius = 165;
    theWheel.innerRadius = 35;
    theWheel.rotationAngle = 0;
    wheelSpinning = false;
}

function alertPrize(indicatedSegment){
    alert("You have won " + indicatedSegment.text);
    balance += parseInt(indicatedSegment.text)*gameBalance;
}


function scaleWheel(isSpinning){
    if (isSpinning) {
        theWheel.centerY = 215;
        theWheel.outerRadius = 200;
        theWheel.innerRadius = 40;
        canvasBlock.height = 230;
    }
}