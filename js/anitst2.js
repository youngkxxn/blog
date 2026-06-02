// Class Sprite 사용법

let img;
let i = 200;
let cnt = 0;

function preload() {
  //Sprite(x, y, 가로, 세로)
  img = new Sprite(250, 200, 200, 200);
  //커피마시는 액션
  img.addAni('coffee', './test/set2_001.png', 3);
  img.ani.looping = false;
  
  //일하는 모션
  img.addAni('work', './test/set1_001.png', 6);
  //default acting : 일하는 모션 + 가끔 하품
  img.addAni('./test/set1_001.png', 6);
}

function setup() {
  createCanvas(500, 400);
}

function draw() {
	background('#f6f5f0');

  if (img.ani.frameChanged && i > 200) {
    i -= 1;
  }

  //최고 속도 제한
  if (i > 350) {
    i = 350;
  }
  // work --> default로 빠져나오기 위한 카운트
  if (i == 200 && img.ani.frame == 0 && img.ani.name == 'work') {
    cnt += 1;
  }

  if (img.ani.name == 'work' && cnt > 100 ) {
    cnt = 0;
    img.ani = 'default';
  }

  if (img.mouse.presses()) {
    i += 10;
    img.ani = 'coffee'
    img.ani.play(0);
  }

  if (img.mouse.released()) {
    if (200 < i) {
      img.ani = ['!coffee', 'work']
    }
  }

  img.ani.frameDelay = Math.floor(40 - i / 10);

  // allSprites.debug = mouse.pressing();
  console.log(i, 40-i/10, img.ani.name, cnt)
}