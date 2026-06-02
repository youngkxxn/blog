let area, ground;
let s = [];
let lastClickTime = Date.now();
const RESTART_TIMEOUT = 30000; // 30sec

function preload() {
  area = new Sprite(windowWidth/2, windowHeight/2, 170, 20, 'static')
  area.visible = false;
  area.overlap(allSprites);

  ground = new Sprite(windowWidth/2, windowHeight/2 + 30, 200, 20, 'static')
  ground.addAni('bg', '../../../images/2023/44/bg_001.png', 3);
}

function setup() {
  // 캔버스 사이즈
  var cnv = createCanvas(windowWidth, windowHeight);
  // cnv.style('display', 'block');
  world.gravity.y = 10;
  background('#f6f5f0'); //이렇게 하면 클릭할때마다 배경이 깜빡거리지 않음.
}

function draw() {
  background('#f6f5f0');

  checkRestartTimeout();

  s.forEach(function(sprite, index) {
    if (sprite) {
      if (sprite.overlapping(area)) {
        sprite.ani = 'normal';
        sprite.rotation = 0;
        sprite.rotationDrag = 100;
        sprite.mass = 2;
      } else {
        sprite.ani = 'falling';
        if (sprite.x < width * 0.5) {
          sprite.rotationSpeed = -5 ;
        } else {
          sprite.rotationSpeed = 5 ;
        }
        sprite.rotationDrag = 10;
        sprite.mass = 3;
      }
      //화면을 넘어서면 sprite 삭제
      if (sprite.position.y > height) {
        s.splice(index, 1);
      }
    }
  });

  if (frameRate() > 80) {
    console.log(s.length, frameRate())
  }
}

function addUri(x, y) {
  resetTimeout();
  let _t = createSprite(x, y, 30);
  _t.addAni('normal', '../../../images/2023/44/set3_001.png', 7)
  _t.addAni('falling', '../../../images/2023/44/set4_001.png', 4);
  s.push(_t);
}

function Mobile() {return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}
// console.log(Mobile()) 

if (Mobile()){
  function touchStarted() {
    if (touches.length > 0) {
      addUri(touches[0].x, 0);
    }
  }
} else {
  function mousePressed() {
    addUri(mouseX, 0);
  }
}

function resetTimeout() {
  lastClickTime = Date.now();
}

function checkRestartTimeout() {
  if (Date.now() - lastClickTime >= RESTART_TIMEOUT) {
    location.reload();
  }
}