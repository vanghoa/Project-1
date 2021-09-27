var boxSz;
var gridSz;
var zTranslate;
var d1;
var dem = 0;
var poX = 0;

function setup() {
  let canvas = createCanvas(window.innerWidth-20, window.innerHeight-20, WEBGL);
  boxSz = 320; //320
  d1 = boxSz;
  gridSz = boxSz / 4;

  zTranslate = -boxSz;

  let button1 = createButton('Save it as png');
  button1.position(width-150,0);
  button1.size(150,40);
  button1.mousePressed(Chuphinh);

  
  let button2 = createButton('Create another python (wait 4 seconds, it might lag a bit)');
  button2.position(width-150,40);
  button2.size(150,60);
  button2.mousePressed(Velaicainay);
}

function Chuphinh() {
  saveCanvas('Python 3D', 'png');
}

function Velaicainay() {
  noiseSeed(random(1,100))
  redraw(1);
}

function preload() {
  img = loadImage('cac-01.png');
  img2 = loadImage('cac-02-01.png');
  img3 = loadImage('cac-03-01.png');
}

function draw() {
  var xoff = 10;
  var xxoff = 1000;

  var dis1;
  dem = dem + 1;

  const length = 20;
  const R = 20;

  background(0);
  //ambientLight(150);
  
  camera(-R*gridSz - 100 ,-R*gridSz - 100,-R*gridSz + 100,-R*gridSz+1500,-R*gridSz+1500,0,-1,-1,0).perspective(PI/3, width/height, 20, 20000);
  //camera(-1000,-1000,-2*R*gridSz + 3000,0,0,0,1,0,0);
  rotateX(0 //- sin(millis()*0.00001)
  );

  let goc ={
    x:0,
    y:2*R*gridSz,
    z:0
  }



  push();
  translate(goc.x,-goc.y,goc.z);
  for (var count = 1; count <= 5; count++) {
        translate(goc.x,goc.y,goc.z);

        for (var X = 0; X <= R * gridSz; X += gridSz) {
          for (var Y = -R * gridSz; Y <= R * gridSz; Y += gridSz) {
            var dis = dist(0, 0, 0, X, Y, 0);
            if (dis > R * gridSz - gridSz && dis < R * gridSz) {
              for (var x = X - boxSz; x <= X + boxSz; x += gridSz) {
                for (
                  var y = Y - boxSz;
                  y <= Y + boxSz;
                  y += gridSz
                ) {
                  for (
                    var z = - boxSz;
                    z <= boxSz;
                    z += gridSz
                  ) {
                    var d = dist(X, Y, 0, x, y, z);
                    if (d > boxSz - gridSz && d < boxSz) {
                      push();
                      xoff += 0.005;
                      let t = noise(xoff);

                      let xgia;
                      if (count % 2 === 0) { xgia = x; } else { xgia = -x; }

                      if (t >= 0.7) 
                      {
                        translate(xgia, y, z);
                        sphere(gridSz/2,8,8); 
                      } 
                      else {
                        xxoff +=0.0009;
                        let l = noise(xxoff);
                        if (l <= 0.4) {texture(img);}
                          else if (l >= 0.6) {texture(img2);}
                          else if (l <= 0.55 && l >= 0.45) {texture(img3);}
                        translate(xgia, y, z*l*1.8);
                        strokeWeight(1);
                        noStroke();
                        box(gridSz);

                      }
                      pop();
                    }
                  }
                }
              }
            }
          }
        }
  }
  pop();
  noLoop();
}