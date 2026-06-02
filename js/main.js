



const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .5,
    opacity: 1
  });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});



// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
     random(1.5, 2.5), // 애니메이션 동작 시간
    {  //옵션
      y: size,
      repeat: -1, //무한반복
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay)
    }
  )
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// 토마토 회전
function rotateObject(selector) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
     random(1.5, 2.5), // 애니메이션 동작 시간
    {  //옵션
      repeat: -1, //무한반복
      yoyo: false,
      ease: Power0.easeNone,
      rotation: 360
    }
  )
}
rotateObject('.floating1');
rotateObject('.floating2');
rotateObject('.floating3');

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .75 //스크롤이 75% 넘어가는 순간
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
})