// const searchEl = document.querySelector('.search');
// const searchInputEl = searchEl.querySelector('input')

// searchEl.addEventListener('click', function () {
//   searchInputEl.focus();
// });

// searchInputEl.addEventListener('focus', function () {
//   searchEl.classList.add('focused');
//   searchInputEl.setAttribute('placeholder', '통합검색');
// });

// searchInputEl.addEventListener('blur', function () {
//   searchEl.classList.remove('focused');
//   searchInputEl.setAttribute('placeholder', '');
// });


const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

console.log(badgeEl)

// 버튼 숨겨서 초기화
gsap.to(toTopEl, .2, {
  x: 100
});

// ._throttle(함수, 시간(ms))
window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));

toTopEl.addEventListener('click', function () {
  gsap.to(window, .5, {
    scrollTo: 0
  });
});

// 앵커 링크 스무스 스크롤 (헤더 높이 오프셋 포함)
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 120;
      gsap.to(window, { duration: 0.8, scrollTo: targetTop, ease: 'power2.inOut' });
    }
  });
});