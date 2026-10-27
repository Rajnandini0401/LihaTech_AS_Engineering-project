/* =========================================================
   A S ENGINEERING WORK - HOME PAGE SECTION 6 ANIMATION
   File: client/js/home-process-anim.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initHomeProcessAnimation();
});

function initHomeProcessAnimation() {
  const stepCards = Array.from(document.querySelectorAll('.process-step-card'));
  if (!stepCards.length) return;

  const DURATION_PER_STEP = 900; // 0.9s per step
  const TOTAL_STEPS = stepCards.length;
  const TOTAL_DURATION = DURATION_PER_STEP * TOTAL_STEPS;
  let startTime = null;

  function animateProcess(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const rawProgress = Math.min(elapsed / TOTAL_DURATION, 1);
    const currentStepIndex = Math.min(Math.floor(rawProgress * TOTAL_STEPS), TOTAL_STEPS - 1);

    stepCards.forEach((card, index) => {
      const numBadge = card.querySelector('.step-num-badge');
      const stepNumStr = String(index + 1).padStart(2, '0');

      if (index === currentStepIndex) {
        card.classList.add('active-home-step');
        card.classList.remove('completed-home-step');
        if (numBadge) {
          numBadge.innerHTML = stepNumStr;
          numBadge.style.background = '#F97316';
          numBadge.style.color = '#FFFFFF';
          numBadge.style.boxShadow = '0 0 20px #F97316';
        }
      } else if (index < currentStepIndex) {
        card.classList.remove('active-home-step');
        card.classList.add('completed-home-step');
        if (numBadge) {
          numBadge.innerHTML = '<i class="fas fa-check" style="font-size:0.7rem;"></i>';
          numBadge.style.background = '#10B981';
          numBadge.style.color = '#FFFFFF';
          numBadge.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.5)';
        }
      } else {
        card.classList.remove('active-home-step');
        card.classList.remove('completed-home-step');
        if (numBadge) {
          numBadge.innerHTML = stepNumStr;
          numBadge.style.background = 'var(--primary-blue)';
          numBadge.style.color = '#FFFFFF';
          numBadge.style.boxShadow = 'none';
        }
      }
    });

    if (rawProgress >= 1) {
      setTimeout(() => {
        stepCards.forEach((c, idx) => {
          c.classList.remove('active-home-step');
          c.classList.remove('completed-home-step');
          const badge = c.querySelector('.step-num-badge');
          if (badge) {
            badge.innerHTML = String(idx + 1).padStart(2, '0');
            badge.style.background = 'var(--primary-blue)';
            badge.style.boxShadow = 'none';
          }
        });
        startTime = null;
        requestAnimationFrame(animateProcess);
      }, 1500);
      return;
    }

    requestAnimationFrame(animateProcess);
  }

  requestAnimationFrame(animateProcess);
}
