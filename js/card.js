// ===== 포켓몬 카드 홀로그래픽 효과 =====

(function () {

  // 카드 클릭 → 모달 오픈
  document.querySelectorAll('.card, .pcard').forEach(function (card) {
    card.addEventListener('click', function () {
      openCardModal(this);
    });
  });

  function openCardModal(card) {
    const img = card.querySelector('.card__image img, .pcard__image img');
    if (!img) return;

    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalImg.className = 'card-modal-img';

    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';

    const wrapper = document.createElement('div');
    wrapper.className = 'card-modal-wrapper';
    wrapper.appendChild(modalImg);

    overlay.appendChild(wrapper);
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      overlay.classList.add('active');
    });

    applyHoloEffect(wrapper, modalImg);

    // 닫기: 오버레이 클릭
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        setTimeout(function () { overlay.remove(); }, 300);
      }
    });

    // ESC 닫기
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
        setTimeout(function () { overlay.remove(); }, 300);
        document.removeEventListener('keydown', onKeyDown);
      }
    }
    document.addEventListener('keydown', onKeyDown);
  }

  function applyHoloEffect(card, imgEl) {
    const target = imgEl || card;
    let bounds;
    let animFrame;

    function getAngle(e) {
      bounds = card.getBoundingClientRect();
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;

      let clientX, clientY;
      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = clientX - cx;
      const dy = clientY - cy;
      const rotX = -(dy / (bounds.height / 2)) * 18;
      const rotY =  (dx / (bounds.width  / 2)) * 18;

      // 빛 위치 (0~100%)
      const px = ((clientX - bounds.left) / bounds.width)  * 100;
      const py = ((clientY - bounds.top)  / bounds.height) * 100;

      return { rotX, rotY, px, py };
    }

    function applyTransform(rotX, rotY, px, py) {
      card.style.transform =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.06,1.06,1.06)`;

      // 홀로그래픽 shimmer 레이어 — 항상 wrapper(card)에 붙임
      let holo = card.querySelector('.holo-layer');
      if (!holo) {
        holo = document.createElement('div');
        holo.className = 'holo-layer';
        card.appendChild(holo);
      }

      holo.style.background = `
        radial-gradient(circle at ${px}% ${py}%,
          rgba(255,255,255,0.35) 0%,
          rgba(255,200,100,0.15) 20%,
          rgba(200,100,255,0.10) 40%,
          rgba(100,200,255,0.10) 60%,
          transparent 70%
        ),
        linear-gradient(
          ${125 + (py / 100) * 40}deg,
          transparent 20%,
          rgba(255,50,50,0.08)  30%,
          rgba(255,200,50,0.08) 40%,
          rgba(50,255,150,0.08) 50%,
          rgba(50,150,255,0.08) 60%,
          rgba(200,50,255,0.08) 70%,
          transparent 80%
        )
      `;
      holo.style.opacity = '1';
    }

    function onMove(e) {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(function () {
        const { rotX, rotY, px, py } = getAngle(e);
        applyTransform(rotX, rotY, px, py);
      });
    }

    function onLeave() {
      cancelAnimationFrame(animFrame);
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      const holo = card.querySelector('.holo-layer');
      if (holo) holo.style.opacity = '0';
    }

    card.addEventListener('mousemove',  onMove);
    card.addEventListener('touchmove',  onMove, { passive: true });
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('touchend',   onLeave);
  }

})();
