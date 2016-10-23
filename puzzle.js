
var point;

var squareID = new Array("one-one","one-two","one-three","one-four",
	"two-one","two-two","two-three","two-four",
	"three-one","three-two","three-three","three-four",
	"four-one","four-two","four-three","four-four");

var squareClass = new Array("oneOne","oneTwo","oneThree","oneFour",
	"twoOne","twoTwo","twoThree","twoFour",
	"threeOne","threeTwo","threeThree","threeFour",
	"fourOne","fourTwo","fourThree","fourFour","blank-square");

var white = new Array(16);

function reset() {	
	for(var i = 0; i < 16; i++) {
		white[i] = false;
		document.getElementById(squareID[i]).className = squareClass[i];
	}
}

function shuffle() {
	var ri = new Array(15);
	for (i = 0; i < 15; i++)
		ri[i] = i;
	for(var j = 0; j < 5; j++) {
		ri.sort(function() {
			return Math.random()-0.5;
		});
		for (var i = 0; i < 15; i += 3) {

            var a = document.getElementById(squareID[ri[i]]);
            var b = document.getElementById(squareID[ri[i + 1]]);
            var c = document.getElementById(squareID[ri[i + 2]]);

            var aClass = a.className;
            a.className = b.className;
            b.className = c.className;
            c.className = aClass;

            var t = white[ri[i]];
            white[ri[i]] = white[ri[i + 1]];
            white[ri[i + 1]] = white[ri[i + 2]];
            white[ri[i + 2]] = t;
		}
	}
}


function upsetOrder() {
	
	reset();

	//for(var i = 0; i < 16; i++) white[i] = false;
	point = 4;
	document.getElementById('four-four').className = "blank-square";

	//alert(point + " " + white);
	for(var i = 0; i < 16; i++) document.getElementById(squareID[i]).style.transition = "background 0s";
	shuffle();
	for(var i = 0; i < 16; i++) document.getElementById(squareID[i]).style.transition = "background 0.05s";
	


	var pre = document.getElementById('pre');
	var pic = document.getElementById('whole-pic');

	pre.style.transition = "all 0s";
	pic.style.transition = "all 0s";

	pic.style.left = "-300px";

	pre.style.left = "800px";

    
    pre.style.transition = "all 1s";
	pic.style.transition = "all 1s";

}

function judge() {
	for(var i = 0; i < 15; i++) {
		if(document.getElementById(squareID[i]).className != squareClass[i]) return false;
	}
	if(document.getElementById(squareID[15]).className != squareClass[16]) return false; 
	return true;
}

function change(num) {	

	var click = document.getElementById(squareID[num]);

	var whiteBlank;
	for(var i = 0; i < 16; i++) {
		if(document.getElementById(squareID[i]).className == "blank-square") whiteBlank = i;
	}

	var blank = document.getElementById(squareID[whiteBlank]);


	if((click.offsetTop == blank.offsetTop && Math.abs(click.offsetLeft - blank.offsetLeft) >= 85
		&& Math.abs(click.offsetLeft - blank.offsetLeft) <= 95) 
		|| (click.offsetLeft == blank.offsetLeft && Math.abs(click.offsetTop - blank.offsetTop) >= 85
			&& Math.abs(click.offsetTop - blank.offsetTop) <= 95)) {

		click.style.transition="background 0s";
		blank.style.transition="background 0s";
		var tempClass = click.className;
		click.className = blank.className;
		blank.className = tempClass;
		click.style.transition="background 0.05s";
		blank.style.transition="background 0.05s";	

		white[whiteBlank] = false;
		white[num] = true;
	}

	/*for(var i = 0; i < 16; i++) document.getElementById(squareID[i]).style.transition = "background 1s";*/

	if(judge()) {
		alert("You Win!");
	}
}


window.onload = function() {


	//alert("lala");
	
	document.getElementById('restart').onclick = function() {
		//alert("lala");
		upsetOrder();
	}

	document.getElementById('one-one').onclick = function() { change(0); }
	document.getElementById('one-two').onclick = function() { change(1); }
	document.getElementById('one-three').onclick = function() { change(2); }
	document.getElementById('one-four').onclick = function() { change(3); }
	document.getElementById('two-one').onclick = function() { change(4); }
	document.getElementById('two-two').onclick = function() { change(5); }
	document.getElementById('two-three').onclick = function() { change(6); }
	document.getElementById('two-four').onclick = function() { change(7); }
	document.getElementById('three-one').onclick = function() { change(8); }
	document.getElementById('three-two').onclick = function() { change(9); }
	document.getElementById('three-three').onclick = function() { change(10); }
	document.getElementById('three-four').onclick = function() { change(11); }
	document.getElementById('four-one').onclick = function() { change(12); }
	document.getElementById('four-two').onclick = function() { change(13); }
	document.getElementById('four-three').onclick = function() { change(14); }
	document.getElementById('four-four').onclick = function() { change(15); }    	
}
