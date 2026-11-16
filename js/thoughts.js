(() => {
  'use strict';
  const gallery = document.getElementById('thought-cards');
  if (!gallery) return;
  const image = gallery.querySelector('[data-card-image]');
  const previous = gallery.querySelector('[data-card-previous]');
  const next = gallery.querySelector('[data-card-next]');
  const counter = gallery.querySelector('[data-card-count]');
  const descriptions = [
    '같은 높이, 다른 출발. 결과표에는 출발점이 적혀 있지 않다. 쿠르베의 마을의 처녀들 속 차려입은 여성들과 맨발 소녀가 마주한다.',
    '구슬판의 왼쪽 10개 출구만 성공이다. 누군가는 5번, 누군가는 95번 입구에서 시작한다. 높이가 같으면 기회도 공평한 걸까?',
    '5에서 8은 성공, 95에서 30은 실패. 그런데 어느 구슬이 더 멀리 움직였나.',
    '도착한 좌표와 함께 출발한 좌표, 그 사이의 거리도 보고 싶다.',
    '노력은 성공을 보장하는 게 아니라 확률을 움직이는 것. 공부하고 일하고 만나고 만들어보고, 망하면 또 해본다.',
    '통장에 안 찍힌다고 없는 자산은 아니다. 사람, 배운 것, 나에 대한 이해가 남을 수 있다.',
    '내 아이는 최대한 왼쪽에 놓고 싶다. 다만 네가 잘한 것도 있겠지만 네가 고른 입구는 아니라고 알려주고 싶다.',
    '네가 힘든 건 힘든 게 맞다. 내가 힘든 것과 내가 유리한 자리에 있는 것은 동시에 참일 수 있다.',
    '95에서 출발해 30까지 왔다면 많이 왔다. 성공했다면 조금 겸손하게, 아직이라면 나를 너무 실패라 여기지 않게.',
    '결과표에는 마지막 좌표만 찍힌다. 결과는 운이 많이 정한다. 하지만 움직인 거리는 내 것이니까.'
  ];
  let current = 0;
  let pointerStart = null;
  const directory = image.src.slice(0, image.src.lastIndexOf('/') + 1);
  const imagePath = index => `${directory}${String(index + 1).padStart(2, '0')}.webp`;

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
