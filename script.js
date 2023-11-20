
var FPS = 50;
var INTERVAL_SEC = 1000 / FPS >> 0; 

function Particle(x, y, vx, vy, s){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.s = s;
}


var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var canvasW = canvas.width;
var canvasH = canvas.height;
var pixels = context.getImageData(0, 0, canvasW, canvasH);
var particles = [];
var gravity = 100 / 1000;

var forceMap = document.getElementById("dummyCanvas").getContext("2d");
var forcePixels;
forceMap.font = "64px 'Arial'";
var str = "DEATH";
var tm = forceMap.measureText(str);
forceMap.fillStyle = "White";
forceMap.fillText(str, (canvasW - tm.width) / 2, 180);
forcePixels = forceMap.getImageData(0, 0, canvasW, canvasH);


setInterval(intervalHandler, INTERVAL_SEC);


function intervalHandler(){
  forceMap.getImage
  
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    
    p.vy += gravity * p.s;
    p.vx *= 0.99; 
    p.vy *= 0.99;
    d = 1 - (getPixel(p.x, p.y).r / 0xff) * 0.6; 
    p.vx *= d; 
    p.vy *= d;
    p.x += p.vx; 
    p.y += p.vy;
    
    setPixel(p.x, p.y, 255, 0, 0);
    
    if (p.y > canvasH) 
      particles.splice(i, 1);
  }
  
  for (i = 0; i < 3; i++) 
    emit(Math.random() * 465, 0, Math.random() + 0.5);
  
  faidout();
  context.putImageData(pixels, 0, 0);
}



function emit(ex, ey, s){
  var p = new Particle(ex, ey, 0, 0, s, 0xFFFFFF);
  particles.push(p);
}


function setPixel(x, y, r, g, b){
  if (x >= 0 && x < canvasW && y >= 0 && y < canvasH) {
    var idx = ((x | 0) + (y | 0) * canvasW) * 4;
    pixels.data[idx + 0] = r;
    pixels.data[idx + 1] = g;
    pixels.data[idx + 2] = b;
    pixels.data[idx + 3] = 252;
  }
}


function getPixel(x, y){
  if (!forcePixels) 
    return {
      r: 0,
      g: 0,
      b: 0
    };
  if (x >= 0 && x < canvasW && y >= 0 && y < canvasH) {
    var idx = ((x | 0) + (y | 0) * canvasW) * 4;
    var r = forcePixels.data[idx + 0];
    var g = forcePixels.data[idx + 1];
    var b = forcePixels.data[idx + 2];
  }
  return {
    r: r,
    g: g,
    b: b
  };
}


function faidout(){
  for (var i = 3, l = pixels.data.length; i < l; i += 4) {
    var a = pixels.data[i];
    if (a < 253) {
      if (a < 36) 
        pixels.data[i] = 0;
      else 
        if (a < 66) {
          pixels.data[i] *= 0.985;
        }
        else {
          pixels.data[i] *= 0.76;
        }
    }
  }
} 