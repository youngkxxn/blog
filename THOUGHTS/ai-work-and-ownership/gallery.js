(() => {
  'use strict';
  const gallery = document.getElementById('thought-cards');
  if (!gallery) return;
  const image = gallery.querySelector('[data-card-image]');
  const previous = gallery.querySelector('[data-card-previous]');
  const next = gallery.querySelector('[data-card-next]');
  const counter = gallery.querySelector('[data-card-count]');
  const descriptions = [
  "17시간이 1시간 됐다. 남은 16시간은? AI가 내 일을 줄였는데, 왜 내 시간은 늘지 않을까? 루이스 하인의 사진 속 정비공이 증기 펌프를 다룬다.",
  "회사에서 업무 하나를 자동화했다 일이 끝났는데, 왜 퇴근은 그대로일까? 파일을 받고, 내용을 확인하고, 결과를 올리는 일. 17시간씩 걸리던 걸 AI로 1시간 안에 끝냈다. “그럼 나머지 16시간에는 다른 일을 하면 되겠네?” 회사가 이렇게 말할 가능성이 더 커 보였다. 기계가 벌어다 준 시간은 누구의 것일까?",
  "실직과 구인난이 동시에 생긴다면 일자리는 있는데, 내가 갈 자리는 없다. 20년 동안 엑셀로 보고서를 만든 사무직 직원. AI가 보고서를 맡은 뒤 회사는 그를 내보낸다. 같은 동네에선 요양보호사를 구하지 못한다. 그가 옮기려면 급여와 노동환경은 물론, 20년간 쌓은 경력까지 다시 따져야 한다. 한쪽의 구인난이 다른 쪽의 실직을 해결해주진 않는다.",
  "똑같이 10%를 벌었을 때 한 사람은 10만 원, 다른 사람은 10억 원. 100만 원을 가진 사람과 100억 원을 가진 사람. 수익률은 똑같아도 손에 쥐는 돈은 다르다. AI로 생산성이 똑같이 10배 오른다면? 자본과 경험, 고객을 이미 확보한 사람은 그 생산성을 더 큰 결과로 바꿀 여지가 있다. 같은 도구를 써도 출발점의 차이는 남는다.",
  "혼자서 서비스를 만들 수 있는 시대 내가 만든 서비스는 누구의 서버에서 돌까? AI와 함께라면 혼자서 제품을 만들어 볼 수 있다. 그래도 서버가 필요하고, 고객을 만날 곳이 필요하다. 결제를 받으려면 기존 결제망도 거쳐야 한다. 만드는 사람이 늘수록 그들이 함께 쓰는 전력, 반도체, 데이터센터와 플랫폼의 가치도 커질 수 있다. 제품을 소유하는 것과 그 기반을 소유하는 것은 다르다.",
  "직원은 퇴근하면 소비자다 900명이 해고되면 누가 물건을 살까? 직원 1,000명이 하던 일을 100명이 할 수 있다고 치자. 900명을 내보내면 그 회사의 비용은 줄어든다. 그런데 여러 회사가 같은 선택을 하면? 어제 받은 월급으로 오늘 식당에 가고 물건을 사던 사람들의 소득부터 줄어든다. 생산성이 올라도 살 사람의 소득은 따로 움직인다.",
  "그래서 나는 남는 시간에 내가 소유한 작은 생산 시스템을 만든다. 월급으로 생활을 유지하면서 제품을 기획한다. AI와 함께 만들고, 온라인에서 고객을 만나고, 그 반응을 다음 제품에 반영한다. 팔리지 않을 때도 있다. 그래도 다음 시도에 쓸 수 있는 경험과 내가 만든 구조는 남는다. AI가 내 일을 대신하게 됐을 때, 나는 무엇을 소유하고 있을까?"
];
  let current = 0;
  let pointerStart = null;
  const directory = image.src.slice(0, image.src.lastIndexOf('/') + 1);
  const versionQuery = new URL(image.src).search;
  const imagePath = index => `${directory}${String(index + 1).padStart(2, '0')}.webp${versionQuery}`;

  function render() {
    image.src = imagePath(current);
    image.alt = `${current + 1}장. ${descriptions[current]}`;
    counter.textContent = `${current + 1} / ${descriptions.length}`;
    previous.disabled = current === 0;
    next.disabled = current === descriptions.length - 1;
    if (current + 1 < descriptions.length) {
      const upcoming = new Image();
      upcoming.src = imagePath(current + 1);
    }
  }
  function move(delta) {
    const updated = Math.max(0, Math.min(descriptions.length - 1, current + delta));
    if (updated === current) return;
    current = updated;
    render();
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  });
  image.addEventListener('pointerdown', event => {
    pointerStart = { x: event.clientX, y: event.clientY };
  });
  image.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) move(dx < 0 ? 1 : -1);
  });
  image.addEventListener('pointercancel', () => { pointerStart = null; });
  render();
})();
