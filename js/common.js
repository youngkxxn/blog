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
      // 섹션 상단 패딩만큼 내리되, 제목 위에 24px 여백을 남김 (PC 120px / 모바일 64px 패딩)
      const paddingTop = parseFloat(getComputedStyle(target).paddingTop) || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + paddingTop - 24;
      gsap.to(window, { duration: 0.8, scrollTo: targetTop, ease: 'power2.inOut' });
    }
  });
});

// 모바일 햄버거 메뉴 (뒤로가기로도 닫히도록 히스토리에 한 칸 추가)
const menuToggleEl = document.querySelector('.menu-toggle');

function closeMobileNav() {
  document.body.classList.remove('nav-open');
  menuToggleEl.setAttribute('aria-expanded', 'false');
  menuToggleEl.setAttribute('aria-label', '메뉴 열기');
}

menuToggleEl.addEventListener('click', function () {
  const open = document.body.classList.toggle('nav-open');
  menuToggleEl.setAttribute('aria-expanded', open);
  menuToggleEl.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  if (open) {
    history.pushState({ mobileNav: true }, '');
  } else {
    // X 버튼으로 닫음 → 쌓아둔 히스토리 소비
    window.__suppressPop = (window.__suppressPop || 0) + 1;
    history.back();
  }
});
document.querySelectorAll('.mobile-nav a').forEach(function (a) {
  a.addEventListener('click', closeMobileNav);
});

// 모바일: 스크롤을 내린 상태에서 뒤로가기 한 번 → 맨 위로 (to-top 버튼 대체)
let backToTopArmed = false;
if (window.matchMedia('(max-width: 768px)').matches) {
  window.addEventListener('scroll', _.throttle(function () {
    if (window.scrollY > 500 && !backToTopArmed) {
      backToTopArmed = true;
      history.pushState({ backToTop: true }, '');
    }
  }, 300));
}

// 뒤로가기 통합 처리 — 우선순위: 카드 모달(card.js가 닫음) > 햄버거 메뉴 > 맨 위로
window.addEventListener('popstate', function () {
  if (window.__suppressPop > 0) {
    window.__suppressPop--;
    return;
  }
  if (document.querySelector('.card-overlay')) return; // card.js의 popstate 핸들러가 닫음
  if (document.body.classList.contains('nav-open')) {
    closeMobileNav();
    return;
  }
  if (backToTopArmed) {
    backToTopArmed = false;
    gsap.to(window, .5, { scrollTo: 0 });
  }
});