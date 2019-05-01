var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;
//height and width of bricks
var width = canvas.width/8;
var height = canvas.height/20;
//array to hold bricks
var rectangleArray = [];
var interval = 0;
// radius for clock
var radius = canvas.width/2;
var radius2 = canvas.height/2;
var radius3 = radius/3;
// variables for time
var timekeeper=0;
var timekeep;
var hour;
var minute;
var second;
var now;
var switch1;

// functions for builing a wall
buildRectangleArray();
var stopper = setInterval(buildWall, 20);
function Rectangle( x , y){
	this.x = x;
	this.y = y;
}

function buildRectangleArray(){
	for (var y = canvas.height, i = 0; y >-20 ; y-= height, i++){
		if( i % 2 == 0){
			var x = 0;
		} else{
			var x = -width/2;
		}
		for(x ; x < (canvas.width); x += width){
			
			   rectangleArray.push(new Rectangle(x, y));;
		}}}

function drawRectangle (x,y,  color='#42f4f4'){
	ctx.beginPath();
	ctx.rect(x, y, width, height)
	ctx.strokeStyle = 'black';
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
}

function buildWall(){
	builderText(ctx, interval);
	// stops the builder function and starts the time function
	if(interval > rectangleArray.length-1){
		clearInterval(stopper);
		ctx.translate(radius, radius2);
		timekeep = setInterval(time, 1000);
	}else{
	    var posx = rectangleArray[interval].x ;
		var posy = rectangleArray[interval].y;
		drawRectangle(posx, posy);
		interval++;
		}
	}

// Clock Functions
function drawFace() {	
  var grad;// variable for the gradient clock face
  ctx.beginPath()
  ctx.arc(0, 0, radius3, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  // second circle drawn, the "3d" line around
  grad = ctx.createRadialGradient(0,0,radius3*0.95, 0,0,radius3*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius3*0.1;
  ctx.stroke();
  // now draw the center circle
  ctx.beginPath();
  ctx.arc(0, 0, radius3*0.05, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}
// function for drawing the numbers on the clock

function drawNumbers(){
	var angle;
	var num;
	ctx.font = radius3*.25 + "px arial";

	ctx.textBaseline = "middle";
	ctx.textAlign ="center";

	for( num = 1; num<13; num ++){
		// angle is in radians 2 PI is the complete circle
		// the circle is divided in 12 parts then is multiplied
		// by the number so that it will rotate that many parts
		angle = num * ((2*Math.PI)/12);
		// this rotates the x and y axis
		ctx.rotate(angle);
		//now you only want to move your origin in the y axis which was a line straight up
		//but has now been rotated
		ctx.translate(0, -radius3* .83);
		//rotate back so your numbers are written vertically
		//remember rotate rotates the axes
		ctx.rotate(-angle);
		//ctx.fillStyle = "#222";
		ctx.fillText(num.toString(),0,0);
		//ctx.strokeStyle = "#444";
		//ctx.strokeText(num.toString(), 0,0);
		//now you must reset your location to the origin
		ctx.rotate(angle);
		ctx.translate(0, radius3*.83);
		ctx.rotate(-angle);
	}
}
//get current time
function findTime(radius3){
	
	now = new Date();
	hour = now.getHours();
	minute = now.getMinutes();
	second = now.getSeconds();

	hourAngle = hour * 2*Math.PI/12 + minute*2*Math.PI/(12*60) + second *2*Math.PI/(12*60*60);
	drawTime(hourAngle,radius3*.5, radius3*.05);
	minuteAngle = minute *2*Math.PI/60 + second*2*Math.PI/(60*60);
	drawTime(minuteAngle, radius3*.65, radius3*.025);
	secondAngle = second *2*Math.PI/60;
	drawTime(secondAngle, radius3*.75, radius3*.01);
}
// function that draws the time 
function drawTime(angle, length, width){
	ctx.beginPath();
	ctx.lineCap= "round";
	ctx.lineWidth = width;
	ctx.moveTo(0,0);
	ctx.rotate(angle);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-angle);
}
// this function calls the functions for the clock and 
// after allowed time sets the fastTime function
function time(){
	if(timekeeper < 5){
	drawFace();
	drawNumbers();
	findTime(radius3);
	timekeeper ++;
}else{
	clearInterval(timekeep);
	switch1 = setInterval(fastTime, 27);
}
}
// this functionreduces the radius of the clock
// and when finishes calls the next scence which is the ocean setting
// created in clouds function
var count =0
function fastTime(){
	if ( radius3 < 5){
		clearInterval(switch1);
		ctx.translate(-innerWidth/2, -innerHeight/2)
		switch2 = setInterval(clouds, 100);
	}
	if (count>30){
   		radius3 *= .96;}
	drawFace();
	drawNumbers();
	drawFastTime();
	count +=1;	
}
var fastsecond = 1;
var fastminute =1;
var fasthour= .01;
function drawFastTime(){
	
	now = new Date();
	hour = now.getHours();
	minute = now.getMinutes();
	second = now.getSeconds();
    hourAngle=((hour+fasthour) * 2*Math.PI/12 );
   console.log(hour);
    drawTime(hourAngle, radius3*0.5, radius3*0.05);
  
    minuteAngle=((fastminute+minute)*2*Math.PI/60);
    drawTime(minuteAngle, radius3*0.65, radius3*0.025);
   
    secondAngle=((fastsecond +second)*2*Math.PI/60);
    drawTime(secondAngle, radius3*0.75, radius3*0.01);
    fastminute +=1;
    fastsecond +=3;
    fasthour +=.03;
}
function builderText(ctx, interval){
  	
 	if(interval >160){
  	ctx.beginPath();
  	ctx.font = window.innerWidth/7 + "px Kaushan Script";
  	ctx.fillStyle = "black";
  	ctx.fillText("BUILDER", innerWidth/6, innerHeight/5);
  	}
  }
  ////////////////////////////////////////////////////////
  // starts next scence
  var x1 = 0;
var x2 = 0; 
var x3 = 0;
var y2 = 0;
var y3 = 0;
var y = 60;
var z = -60;
var dy = 10;
var dz = -10;
var alpha = 0.0
var color = 0
var multiple = 1000
// functions to create clouds
function skycolor(){
	var colors = ["#5E8096","#5E8096","#569DCA","#3AA6EA","#059BFA"];

	index = Math.floor(color);
	if (index < colors.length-1){
		return colors[index];
	}
	else{
		return colors[colors.length - 1];
	}
	
}
function cloudcolor(){
	var colors = [ "#456666","#899DA7","#A5C0C6","#CADBDF", "#E9F1F6", "#F8FBFC","#F3F7F8","#FCFDFE","#18B8E7"
	 ];

	index = Math.floor(color);
	if (index < colors.length-1){
		return colors[index];
	}
	else{
		return colors[colors.length - 1];
	}
}
function sunshine(){
		alpha =[.45,.55,.65,.7,.75,.8,.85,.9,.93,.97,1]
		index = Math.round(color);
		if(index < alpha.length-1){
			return alpha[index];
		}
		else{
			return alpha[alpha.length-1]
		}
}
// clouds
function drawClouds(ctx){
	//sky
	color += .05
	ctx.globalAlpha = 1;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(innerWidth,0);
	ctx.lineTo(innerWidth, innerHeight);
	ctx.lineTo(0,innerHeight);
	ctx.lineTo(0,0);
	ctx.fillStyle = skycolor();
	ctx.fill();
	//sun
	ctx.beginPath();
	ctx.translate(innerWidth/2, innerHeight/5);
	ctx.arc(0,0,90, 0, 2*Math.PI);
	ctx.globalAlpha = sunshine()
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.translate(-innerWidth/2, -innerHeight/5);
	// cloud
	ctx.beginPath();
	ctx.translate(innerWidth/4,innerHeight/5);
	ctx.globalAlpha = 1;
	ctx.moveTo(170 +x1, 80);
    ctx.bezierCurveTo(130+x1, 100, 130+x1, 150, 230+x1, 150);
    ctx.bezierCurveTo(250+x1, 180, 320+x1, 180, 340+x1, 150);
    ctx.bezierCurveTo(420+x1, 150, 420+x1, 120, 390+x1, 100);
    ctx.bezierCurveTo(430+x1, 40, 370+x1, 30, 340+x1, 50);
    ctx.bezierCurveTo(320+x1, 5, 250+x1, 20, 250+x1, 50);
    ctx.bezierCurveTo(200+x1, 5, 150+x1, 20, 170+x1, 80);
    ctx.translate(-innerWidth/4,-innerHeight/5);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
	ctx.fillStyle= cloudcolor();
	ctx.fill();
    ctx.stroke();
    //cloud
   	ctx.beginPath();
	ctx.translate(innerWidth/3,innerHeight/10);
	ctx.moveTo(170+ x2, 80 + y2);
    ctx.bezierCurveTo(130+x2, 100 + y2, 130+x2, 150 + y2, 230+x2, 150 + y2);
    ctx.bezierCurveTo(250+x2, 180 + y2, 320+x2, 180 + y2, 340+x2, 150 + y2);
    ctx.bezierCurveTo(420+x2, 150 + y2, 420+x2, 120 + y2, 390+x2, 100 + y2);
    ctx.bezierCurveTo(430+x2, 40 + y2, 370+x2, 30 + y2, 340+x2, 50 + y2);
    ctx.bezierCurveTo(320+x2, 5 + y2, 250+x2, 20 + y2, 250+x2, 50 + y2);
    ctx.bezierCurveTo(200+x2, 5 + y2, 150+x2, 20 + y2, 170+x2, 80 + y2);
    ctx.translate(-innerWidth/3,-innerHeight/10);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle= cloudcolor();
	ctx.fill();
    ctx.stroke();
    //cloud
    ctx.beginPath()
    ctx.translate(innerWidth/2.5,innerHeight/5);
	ctx.moveTo(170 +x3, 80 + y3);
    ctx.bezierCurveTo(130+x3, 100 +y3, 130+x3, 150 +y3, 230+x3, 150 +y3);
    ctx.bezierCurveTo(250+x3, 180 +y3, 320+x3, 180 +y3, 340+x3, 150 +y3);
    ctx.bezierCurveTo(420+x3, 150 +y3, 420+x3, 120 +y3, 390+x3, 100 +y3);
    ctx.bezierCurveTo(430+x3, 40 +y3, 370+x3, 30 +y3, 340+x3, 50 +y3);
    ctx.bezierCurveTo(320+x3, 5 +y3, 250+x3, 20 +y3, 250+x3, 50 +y3);
    ctx.bezierCurveTo(200+x3, 5 +y3, 150+x3, 20 +y3, 170+x3, 80 +y3);
    ctx.translate(-innerWidth/2.5,-innerHeight/5);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle= cloudcolor();
    ctx.fill();
    ctx.stroke();
    // lighting
    if( color % .15 == 0 || color % .20 == 0 || color % .35== 0){
    ctx.beginPath();
    ctx.translate(innerWidth/3, innerHeight/10);
    ctx.moveTo(170 +x2+ 60, 80 +y2+15);
    ctx.lineTo(190 +x2+ 60, 80 +y2+15);
    ctx.lineTo(174 +x2+ 60, 120+y2+15);
    ctx.lineTo(190 +x2+ 60, 120+y2+15);
    ctx.lineTo(165 +x2+ 60, 160+y2+15);
    ctx.lineTo(180 +x2+ 60, 160+y2+15);
    ctx.lineTo(150 +x2+ 60, 200+y2+15);
    ctx.lineTo(158 +x2+ 60, 165+y2+15);
    ctx.lineTo(152 +x2+ 60, 165+y2+15);
    ctx.lineTo(167 +x2+ 60, 125+y2+15);
    ctx.lineTo(155 +x2+ 60, 125+y2+15);
    ctx.closePath();
    ctx.translate(-innerWidth/3, -innerHeight/10);
      
    ctx.lineWidth =3;
    ctx.strokeStyle= "black"
    ctx.fillStyle = "yellow"
    ctx.fill();
    ctx.stroke();
  }}
  // Dreamer Text
    function text(ctx){	
  	if (color > 2){
  		if(multiple > 100){
  			multiple -= 30;
  		}
  		
  		else if (multiple > 50){
  			multiple -=5;
  		}
  		else {
  			multiple -=3;
  		}
  	}
  	var size = (1/color) *multiple;
  	if( size <= 6){
  		size = 6;
  	}
  	ctx.beginPath();
  	ctx.globalAlpha = alpha;
  	ctx.font = innerWidth/size + "px Kaushan Script";
  	ctx.fillStyle = "#665d8c";
  	ctx.fillText("Dreamer", innerWidth/2, innerHeight/4+30);
}
// water function
 function drawWater(ctx){
  	ctx.globalAlpha = 1;
  	ctx.translate(0, 3*innerHeight/4)
  	ctx.moveTo(0,0);
  	ctx.quadraticCurveTo(innerWidth/6,  y, innerWidth/3, 0);
  	ctx.quadraticCurveTo(innerWidth/2,  z, 2*innerWidth/3, 0);
  	ctx.quadraticCurveTo(5*innerWidth/6, y, innerWidth, 0);
  	ctx.quadraticCurveTo(innerWidth+50, innerHeight,innerWidth, innerHeight);
  	ctx.quadraticCurveTo(innerWidth/2, innerHeight +50,0,innerHeight);
  	ctx.quadraticCurveTo(-100, 5*innerHeight/4 ,0,0);
  	ctx.fillStyle = "#4c0cd6";
  	ctx.fill();
  	ctx.lineWidth = 10;
  	ctx.strokeStyle = 'black';
  	ctx.stroke();
  	ctx.translate(0, -3*innerHeight/4);
 } 	
 // function is called after fasttime  when time is up
 // it calls the next scene
  function clouds() {
  	if ( x1 < -500){
		clearInterval(switch2);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		switch3 = setInterval(drawbackground,100);	
	}
  	ctx.clearRect(0, 0, canvas.width, canvas.height);
  	drawClouds(ctx);
  	text(ctx);
  	drawWater(ctx);
  	x1 -=3.5;
  	x2 -=5.5;
  	x3 +=2;
  	y2 -= 2;
  	y3 -=.7;
  	if( y>70 || y < -70)
  	{	dy = -dy}
  	y += dy;
  	if (z < -70 || z > 70)
  		{ dz = - dz;}
  	z += dz;
  	 alpha += .0005;
	}



////////////////////////////////////////////////////////////////////////
// next scence
  var change = true;
  function drawbackground(){
  	
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(innerWidth,0);
	ctx.lineTo(innerWidth, innerHeight);
	ctx.lineTo(0,innerHeight);
	ctx.lineTo(0,0);
	if(change){
		ctx.fillStyle = "#000000";
	}
	else{
		ctx.fillStyle = "#2327D8"
	}
	ctx.fill();
	if(change){
		clearInterval(switch3);
		switch4 = setInterval(code,1);
	}
	else{
	ctx.beginPath();
  	ctx.globalAlpha = alpha;
  	ctx.font = window.innerWidth/10 + "px Kaushan Script";
  	ctx.fillStyle = "black";
  	ctx.fillText("<CODER>", innerWidth/2, innerHeight/4);
	}
	
}

	var count1 = 0;

	function code(){
		
		codeText(ctx,count1);

	}



	text1= "010";
	var text_x = 1;
	var text_y = window.innerWidth/50;
	var row_count =0;
	function codeText(ctx, count){
		row_count +=1;
		if(text_x >= window.innerWidth){
	  		text_x = 0;
	  		text_y += window.innerWidth/50 ;
	  	}else{
	  		text_x += window.innerWidth/50 + window.innerWidth/100;
	  	}
	  	if((count1 + row_count)%3 == 0){
	  		text1 = "100";
	  	}
	  	if((count1 + row_count) % 5== 0){
	  		text1 = "101";
	  	}
	  	if(text_y > window.innerHeight){
	  		clearInterval(switch4);
	  		change = false;
	  		setInterval(drawbackground, 100)
	  	}
	  	
	  	count1 +=1;

		ctx.beginPath();
	  	
	  	ctx.font = window.innerWidth/50 + "px Kaushan Script";
	  	ctx.fillStyle = "white";
	  
	  			
	  	ctx.fillText(text1, text_x, text_y);
	  	}
