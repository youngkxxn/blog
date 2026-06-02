let img;
let Set1;
let Set2;
let Set2b;
let Set3;
let Set4;
let x;
let y; //x와 y좌표 선언
let i = 0;
let j = 0;
let r; //랜덤값(0~3)
let b = 0; //b는 Setb의 boolean으로 b가 set되면 Setb가 동작함
let s = 0;
let SlpSt = 0; //잠들기 전까지 스택이 쌓임
let w = 0;
let imgHeight = 100;
let imgWidth = 100; //이미지 사이즈는 250x250인데, 기린 클릭할때만 효과 먹히도록 조정
let overImg = false; //마우스가 그림위에 있는지
let clicked = false; //클릭했는지

function preload() {
	//절대경로는 html기준
	Set1 = loadAni('../../../../images/2022/30/set1_001.png', 7);
	Set2 = loadAni('../../../../images/2022/30/set2_001.png', 4);
	Set2b = loadAni('../../../../images/2022/30/set2b_001.png', 6);
	Set3 = loadAni('../../../../images/2022/30/set3_001.png', 6);
	Set4 = loadAni('../../../../images/2022/30/set4_001.png', 14);

	// 0~9 난수생성
	r = Math.floor(Math.random() * 10);

	// 50%의 확률로 b가 set됨.
	if (r < 5) {
		b = 1;
	} else if (r > 4) {
		b = 0;
	}

	// 1~3 사이 난수로 가공 (확률은 1이 약간 더 많이 나옴)
	r = r % 3 + 1
	
}

function setup() {
	//캔버스 사이즈
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	//x y값은 화면 중앙
	x = width / 2;
  y = height / 2;
}

function draw() {
  //캔버스 색
  background('#f6f5f0');

	// 기린 그림 위에 커서가 있는지 확인
	// 0.2와 0.8이라는 계수는 기린만 터치하기 위한 장치
	if (
		mouseX > x - imgWidth * 0.2 &&
		mouseX < x + imgWidth * 0.8 &&
		mouseY > y - imgHeight &&
		mouseY < y + imgHeight
	) {
		overImg = true;
	} else {
		overImg = false;
	}

	//랜덤하게 Set1이 r(1~3)번 돌고, 이후에 set2또는 set2b가 1번 돌고, i=0으로 초기화
	//set2나 set2b가 동작하면 슬립스택이 1씩 쌓이고 스택이 3에 도달하면 Set3이 반복해서 동작.
	if (Set1.frame == Set1.lastFrame && j < r) {
		i += 1;
		j = Math.floor(i / 15);
	} else if (Set2.frame == Set2.lastFrame && j == r) {
		i += 1;
		j = Math.floor(i / 15);
		s += 1;
		SlpSt = Math.floor(s / 15);
	} else if (Set2b.frame == Set2b.lastFrame && j == r) {
		i += 1;
		j = Math.floor(i / 15);
		s += 1;
		SlpSt = Math.floor(s / 15);
	} else if (j > r && SlpSt < 3){
		i = 0;
		j = 0;
		
		// 난수(r, b) 재생성
		r = Math.floor(Math.random() * 10);
		if (r < 5) {
			b = 1;
		} else if (r > 4) {
			b = 0;
		}
		r = r % 3 + 1
	// Set4에서 마지막 1ms 한 틱이 frame.0가 나와서 배열 0~13(14개)중에 12번프레임(13번째) 끝나면,
	// 14번째 마지막 장이 한 틱 플레이 되도록 설계 
	} else if (clicked && Set4.frame == 12) {
		w += 1;
	}	else if (w == 15) {
		Set1.frame = 0;
		Set2.frame = 0;
		Set2b.frame = 0;
		Set3.frame = 0;
		Set4.frame = 0;
		i = 0;
		j = 0;
		s = 0;
		SlpSt = 0;
		w = 0;
		clicked = false;
		r = Math.floor(Math.random() * 10);
		if (r < 5) {
			b = 1;
		} else if (r > 4) {
			b = 0;
		}
		r = r % 3 + 1
	}


	if (j < r && SlpSt < 3) {
		img = Set1;
	} else if (j == r && b == 0) {
		img = Set2;
	} else if (j == r && b == 1) {
		img = Set2b;
	} else if (SlpSt == 3 && !clicked) {
		img = Set3;
	}	else if (clicked) {
		img = Set4;
	} else {
		img = Set1;
	}

	//그림 그리기
	animation(img, x, y);
	Set1.frameDelay = 15;
	Set2.frameDelay = 15;
	Set2b.frameDelay = 15;
	Set3.frameDelay = 15;
	Set4.frameDelay = 15;
	// console.log("r=", r, "i=", i, "j=", j, "b=", b, 'SlpSt=', SlpSt, 'click=', clicked);
}

function mousePressed() {
	if(overImg && SlpSt == 3) {
		clicked = true;
	}
}