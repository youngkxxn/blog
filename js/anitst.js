let img;
let Default;
let Set1;
let Set2;
let Set3;
let x;
let y;
let i = 0;
let clicked = false; //클릭했는지

function preload() {
  
	//커피마시는 행동
	Set1 = loadAni('./test/set2_001.png', 3);
  Set1.looping = false;
  
  //2단계 속도
  Set2 = loadAni('./test/set1_001.png', 5);

  //3단계
  Set3 = loadAni('./test/set1_001.png', 6);

	//default acting : 느리게 작업하며 종종 하품을 함
  Default = loadAni('./test/set1_001.png', 4);

}

function setup() {
  //캔버스 사이즈
	var cnv = createCanvas(windowWidth, windowHeight);
	// cnv.style('display', 'block');
	//x y값은 화면 중앙
	x = width / 2;
  y = height / 2;
}

function draw() {
	background('#f6f5f0');
	
  // if (Set1.frameChanged && i > 0) {
  //   i -= 1;
  // } else if (Set2.frameChanged && i > 0) {
	// 	i -= 1;
	// } else if (Set3.frameChanged && i > 0) {
	// 	i -= 1;
	// } else if (Default.frameChanged && i > 0) {
	// 	i -= 1;
	// }

  //최고 속도 제한
  if (i > 300) {
    i = 300;
  }

  if (clicked) {
    i += 10;
  }

	//img-Set 순서 설정
	if (clicked) {
		img = !Set1;
	} else	if (Set1.frame == 2) {
		img = !Set1;
	} else {
		img = Default;
	}

	animation(img, x, y);
	Set1.frameDelay = 20;
	Set2.frameDelay = 10;
	Set3.frameDelay = 5;
	Default.frameDelay = 20;

  // allSprites.debug = mouse.pressing();
  console.log(clicked, i, Set1.frame)
}

function mousePressed() {
	clicked = true;
}