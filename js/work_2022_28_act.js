let img,
  x,
  y; //x와 y좌표 선언
let overImg = false; //마우스가 그림위에 있는지
let locked = false; //마우스 누르고 있는지

function preload(){
  //여기서 쓰는 절대경로가 js가 기준이 아니라 js가 적용된 html기준으로 절대경로임
  img = loadImage('../../../images/2022/28.png');
}

// setup()함수 속 선언문은 프로그램 시작시 한 번만 실행
function setup(){
  //캔버스 사이즈
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');

  //초기화 시 중앙 정렬
  x = width/2 - img.width/2;
  y = height/2 - img.height/2;
}

// draw()함수 속 선언문은 프로그램이 멈출 때 까지 실행
function draw() {
  
  //캔버스 색
  background('#f6f5f0');

  // 마우스가 그림 위에 있는지
  if (
    mouseX >= x &&
    mouseX <= x + img.width &&
    mouseY >= y &&
    mouseY <= y + img.height
  ) {
    overImg = true;
    if (locked) {
      x += random(-5, 5);
      y += random(-5, 5);
    }
  } else {
    overImg = false;
  }

  //그림 그리기
  image(img, x, y);

}

function mousePressed() {
  if (overImg) {
    locked = true;
  } else {
    locked = false;
  }
}

function mouseReleased() {
  locked = false;
}