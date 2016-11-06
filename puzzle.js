//point说明抠去的方块，1说明抠去左上，2抠去右上，3抠去左下，4抠去右下
var point;
//各个方块ID的名字one-one是第一行第一列方块的ID，以此类推
var squareID = new Array("one-one","one-two","one-three","one-four",
	"two-one","two-two","two-three","two-four",
	"three-one","three-two","three-three","three-four",
	"four-one","four-two","four-three","four-four");
//刚开始时，各个方块class的名字oneOne是第一行第一列方块的class，以此类推
var squareClass = new Array("oneOne","oneTwo","oneThree","oneFour",
	"twoOne","twoTwo","twoThree","twoFour",
	"threeOne","threeTwo","threeThree","threeFour",
	"fourOne","fourTwo","fourThree","fourFour","blank-square");
//一个所有值为bool值得数组，true代表这个位置上为被抠去的空白，false反之
var white = new Array(16);
//在每次游戏结束之后又reset()把各个方块的class恢复为原来的class，位后面的打乱做准备
function reset() {	
	for(var i = 0; i < 16; i++) {
		white[i] = false;
		document.getElementById(squareID[i]).className = squareClass[i];
	}
}
//shuffle()函数是借鉴网上的三轮交换法（打乱结果有解），用来打乱各个方块的class
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
//upsetOrder()函数用来重置各个方块class和打乱他们
function upsetOrder() {
	
	reset();
	point = 4;
	document.getElementById('four-four').className = "blank-square";
	for(var i = 0; i < 16; i++) document.getElementById(squareID[i]).style.transition = "background 0s";
	shuffle();
	for(var i = 0; i < 16; i++) document.getElementById(squareID[i]).style.transition = "background 0.05s";

	var pre = document.getElementById('pre');
	var pic = document.getElementById('whole-pic');

	pre.style.transition = "all 0s";
	pic.style.transition = "all 0s";
	pic.style.left = "-200px";
	pre.style.left = "900px";
    pre.style.transition = "all 1s";
	pic.style.transition = "all 1s";

}
//judge()函数判断拼图是否已经被拼好，如果拼好alert("You Win!")
function judge() {
	for(var i = 0; i < 15; i++) {
		if(document.getElementById(squareID[i]).className != squareClass[i]) return false;
	}
	if(document.getElementById(squareID[15]).className != squareClass[16]) return false; 
	return true;
}
//change(num)函数负责每次点击方块后判断是否要交换class，如果需要则执行交换
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

	if(judge()) {
		alert("You Win!");
	}
}


window.onload = function() {	
	//网页加载结束之后点击按钮则执行upsetOrder()函数把方块的class打乱
	document.getElementById('restart').onclick = function() { upsetOrder(); }
    //点击各个方块则执行change()函数来进行判断和交换class
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
