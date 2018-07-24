var _getTransform = function($element) {

    var matrix = $element.css('transform'),
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0;

    if (matrix !== 'none') {

        // do some magic
        var values = matrix.split('(')[1].split(')')[0].split(','),
            pi = Math.PI,
            sinB = parseFloat(values[8]),
            b = Math.round(Math.asin(sinB) * 180 / pi),
            cosB = Math.cos(b * pi / 180),
            matrixVal10 = parseFloat(values[9]),
            a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi),
            matrixVal1 = parseFloat(values[0]),
            c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);

        rotateX = a;
        rotateY = b;
        rotateZ = c;

    }

    return {
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: rotateZ
    };

}

var makeSlotMachine = function(arrayData,name){
console.log("length is " + arrayData.length)
const SLOTS_PER_REEL = arrayData.length;
let panelWidth = 9
const REEL_RADIUS =  Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
var dom = $('#'+name)

var allDegrees = []

function createSlots (ring) {

	var slotAngle = 900 / SLOTS_PER_REEL;
	var seed = getSeed();
	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');
		slot.className = 'slot';
		// compute and assign the transform for this slot
        let thisAngle =  (slotAngle * i)
		var transform = 'rotateX(' + thisAngle + 'deg) translateZ(' + REEL_RADIUS + 'px)';
		slot.style.transform = transform;
        allDegrees.push(thisAngle)
		var content = $(slot).append('<p>'+ arrayData[i] +'</p>');

		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin() {
	//var txt = 'seeds: ';
		// var oldSeed = -1;
		// /*
		// checking that the old seed from the previous iteration is not the same as the current iteration;
		// if this happens then the reel will not spin at all
		// */
		// var oldClass = $('#ring'+i).attr('class');
		// if(oldClass.length > 4) {
		// 	oldSeed = parseInt(oldClass.slice(10));
		// 	console.log(oldSeed);
		// }
		var seed = getSeed();
		dom.css('animation','back-spin 2s, spiny 999s forwards');
	}

function getNameBasedOnFinalDegree(deg){
    var initAngleOfMiddle = 720
    var indexAt0 = _.findIndex(allDegrees, function(x){return x >= initAngleOfMiddle})
    // console.log(arrayData[indexAt0])
    let partitioning = 360 / arrayData.count
    // let howMan
}

function pause(){
    console.log("stop")
    let t = _getTransform(dom)
    console.log(t)
    let final = t.rotateX-50
    getNameBasedOnFinalDegree(final)
    var anim = CSSAnimations.create('lol', {
    '0%': { 'transform': 'rotateX('+t.rotateX+'deg)' },
    '100%': { 'transform': 'rotateX('+final+'deg)' }
    });
    setTimeout(function(){fworks.oneRoundPlease()},2000)
    // $('#'+name).css("-webkit-animation-play-state", "paused");
    dom.css('animation','back-spin 2s, lol 2s forwards');
}

	console.log('=====');

    $(document).ready(function() {
        console.log("made!")
    	createSlots($('#'+name), arrayData);
        let t = _getTransform(dom)
        console.log("init")
        console.log(t)
     });

     var isSpinning = false

     $(window).keydown(function(evt) {
         console.log(evt.which)
         //49 is 1, 50 is 2...
         switch (evt.which) {
             case 49:
             if(isSpinning){
                pause();
            }else{
                spin()
            }
            isSpinning = ! isSpinning
                 break;
             default:

         }
     })
     return spin
}
