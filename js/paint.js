
// Global Variables
var selectedColor = 0;
var shape = "circleShape";
var circleSize = 0;
var squareSize = 0;
var triangleSize = 0;
var mouseIsDown = 0;

// Header
var head = document.createElement("div");
head.classList.add("head");
head.textContent = "Choose a colour on the palette below and start painting!";
document.body.appendChild(head);

// Palette
var palette = document.createElement("div");
palette.classList.add("palette", "shadow");
document.body.appendChild(palette);

// BrushSize
var brushSizeText = document.createElement("div");
brushSizeText.classList.add("text");
brushSizeText.textContent = "Choose your brush size:";
palette.appendChild(brushSizeText);

var brushSize = document.createElement("INPUT");
brushSize.setAttribute("type", "range");
brushSize.classList.add("brushSize");
brushSize.id = "brush";
brushSize.min = 6;
brushSize.max = 40;
palette.appendChild(brushSize);
brushSize.addEventListener("click", updateSize);

// BrushShape
var brushShapeText = document.createElement("div");
brushShapeText.classList.add("text", "shapeText");
brushShapeText.textContent = "Choose your brush shape:";
palette.appendChild(brushShapeText);

var circle = document.createElement("button");
circle.classList.add("shapes", "circle");
palette.appendChild(circle);
circle.addEventListener("click", circleBrush);

var square = document.createElement("button");
square.classList.add("shapes", "square");
palette.appendChild(square);
square.addEventListener("click", squareBrush);

var diamond = document.createElement("button");
diamond.classList.add("shapes", "diamond");
palette.appendChild(diamond);
diamond.addEventListener("click", diamondBrush);

// Canvas
var canvas = document.createElement("div");
canvas.classList.add("canvas", "shadow");
canvas.id = "canvasID";
document.body.appendChild(canvas);
canvas.addEventListener("mousedown", isClicked);
canvas.addEventListener("mouseup", notClicked);
canvas.addEventListener("mousemove", paintCanvas);

var colorOptions = ["black", "darkslategrey", "brown", "chocolate", "cyan",  "lime", "crimson", "deeppink", "lightsalmon", "yellowgreen", "maroon", "blue", "purple", "pink", "red", "orange", "yellow", "green", "white"];

// Colours for palette
for (var i = 1; i < colorOptions.length; i++){
	var paletteColor = document.createElement("div");
	paletteColor.classList.add("paletteColor");
	paletteColor.setAttribute("id", i);
	paletteColor.style.backgroundColor = colorOptions[i-1];
	palette.appendChild(paletteColor);
	paletteColor.addEventListener("click", selectColor);
}
document.getElementById("1").style.marginTop = "20px";

// Eraser
var eraser = document.createElement("IMG");
eraser.src = "./images/eraser.png"
eraser.id = colorOptions.length;
eraser.classList.add("eraser");
eraser.classList.add("paletteColor");
palette.appendChild(eraser);
eraser.addEventListener("click", selectColor);

// Clear All
var clearElement = document.createElement("div");
clearElement.textContent = "CLEAR ALL!";
clearElement.classList.add("clearElement");
palette.appendChild(clearElement);
clearElement.addEventListener("click", clearAll);


function selectColor(e){
	selectedColor = e.target.id;
	var otherColors = document.getElementsByClassName("border")[0];
	if(otherColors){
		otherColors.classList.remove("border");
	}
	document.getElementById(selectedColor).classList.add("border");
}

function isClicked(){
	mouseIsDown = 1;
}

function notClicked(){
	mouseIsDown = 0;
}

function updateSize(){
	console.log(brushSize.value);
}

function circleBrush(){
	if (square.style.backgroundColor == "black"){
		square.style.backgroundColor = "";
	}
	else if (diamond.style.backgroundColor == "black"){
		diamond.style.backgroundColor = "";

	}
	circle.style.backgroundColor = "black";
	return shape = "circleShape";
}

function squareBrush(){
	if (circle.style.backgroundColor == "black"){
		circle.style.backgroundColor = "";
	}
	else if (diamond.style.backgroundColor == "black"){
		diamond.style.backgroundColor = "";
	}
	square.style.backgroundColor = "black";
	return shape = "squareShape";
}

function diamondBrush(){
	if (square.style.backgroundColor == "black"){
		square.style.backgroundColor = "";
	}
	else if (circle.style.backgroundColor == "black"){
		circle.style.backgroundColor = "";
	}
	diamond.style.backgroundColor = "black";
	return shape = "diamondShape";
}

function paintCanvas(e){
	if (mouseIsDown == 1){
		var canvas = e.target;
		if (selectedColor == 0){
        	alert("please choose a colour first!");
     	   return;
    	}
		console.log(selectedColor);
		var paint = document.createElement("div");
	   	paint.classList.add("paint");
	   	paint.style.backgroundColor = colorOptions[selectedColor-1];
   	
	   	paint.style.height = brushSize.value + "px";
	   	paint.style.width = brushSize.value + "px";

	   	if (shape == "circleShape"){
	   		paint.style.borderRadius = "50%";
	   	}
	   	else if (shape == "squareShape"){
	   		paint.style.borderRadius = "0";
	   	}
	   	else if (shape == "diamondShape"){
	   		paint.style.borderRadius = "0";
	   		paint.style.transform = "rotate(50deg)";
	   	}

	   	canvas.appendChild(paint);   
	   	var x = e.pageX;
	    var y = e.pageY;
		console.log(x,y)
	    x -= canvas.offsetLeft - 10;
	    y -= canvas.offsetTop - 10;
	    paint.style.left = x +'px';
	    paint.style.top = y +'px';
	}
} 

function clearAll() {
    document.getElementById("canvasID").innerHTML = "";
}




