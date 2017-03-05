var pg;
var mask;
var img_small, img_big;

function preload() {
  img_small = loadImage("images/game_small.jpg");
  img_big = loadImage("images/game_big.jpg");
  console.log(img_big);
}

function setup() {
  background(51);
  createCanvas(960,437);
  // pg = createGraphics(100, 100);
  mask = createGraphics(200, 200);
  // mask.background(255,0,0);

  // c = color(0, 255);
  // mask.background(c);
  // mask.fill(alpha(c));
  mask.ellipse(100,100,200);


  // maskImage = createGraphics(512,512);
  // maskImage.beginDraw();
  // maskImage.triangle(30, 480, 256, 30, 480, 480);
  // maskImage.endDraw();
  // apply mask
  // img_small.mask(maskImage._renderer);
}

function draw() {
  background(51);
  // background(200);
  image(img_small, 0, 0);
  // pg.background(100);

// image(mask, 0,0);
  // pg.noStroke();
  // pg.image(img_big, 0, 0);
  img_big.mask(mask._renderer,50,0);
  // image(pg, 50, 50);
  // image(pg, mouseX-50, mouseY-50, 100, 100);
  // image(mask, 0,0);

  mappedX = map(mouseX, 0, width, 0, img_big.width);
  mappedY = map(mouseY, 0, height, 0, img_big.height);
  // image(img_big,mouseX,mouseY, 500,500, mouseX-100,mouseY-100, 200,200);
// image(img,dx,dy,dWidth,dHeight,sx,sy,[sWidth],[sHeight])
// tint(255, 127);
  image(img_big,mappedX-100,mappedY-100, 200,200 , mouseX-100,mouseY-100, 200,200);

  console.log(mouseX, mouseY, mappedX, mappedY);
  // image(img_big,20,20, 100,100, 0,0, 100,100);

  // ellipse(mouseX, mouseY, 55, 55);
}
