/* =========================================================
   A S ENGINEERING WORK - ANIMATED WAVE PROCESS TIMELINE
   File: client/js/wave-timeline.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initWaveTimelineAnimation();
});

function initWaveTimelineAnimation() {
  const container = document.querySelector('.wave-timeline-container');
  const activePath = document.getElementById('wave-line-active');
  const bgPath = document.getElementById('wave-line-bg');
  const pulseBall = document.getElementById('pulse-energy-ball');
  const completeBadge = document.getElementById('process-complete-badge');
  const stepCards = Array.from(document.querySelectorAll('.wave-step-node'));

  if (!container || !stepCards.length) return;

  function updatePathCoordinates() {
    const containerRect = container.getBoundingClientRect();
    const coords = stepCards.map(card => {
      const rect = card.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    });

    if (coords.length < 12) return coords;

    const scaleX = 1000 / containerRect.width;
    const scaleY = 500 / containerRect.height;

    const p = coords.map(c => ({
      x: c.x * scaleX,
      y: c.y * scaleY
    }));

    // S-Wave Bezier curves connecting Step 1 -> 4, 4 -> 5 U-turn, 5 -> 8, 8 -> 9 U-turn, 9 -> 12
    const d = [
      `M ${p[0].x},${p[0].y}`,
      `L ${p[1].x},${p[1].y}`,
      `L ${p[2].x},${p[2].y}`,
      `L ${p[3].x},${p[3].y}`,
      `C ${p[3].x + 90},${p[3].y} ${p[4].x + 90},${p[4].y} ${p[4].x},${p[4].y}`,
      `L ${p[5].x},${p[5].y}`,
      `L ${p[6].x},${p[6].y}`,
      `L ${p[7].x},${p[7].y}`,
      `C ${p[7].x - 90},${p[7].y} ${p[8].x - 90},${p[8].y} ${p[8].x},${p[8].y}`,
      `L ${p[9].x},${p[9].y}`,
      `L ${p[10].x},${p[10].y}`,
      `L ${p[11].x},${p[11].y}`
    ].join(' ');

    if (bgPath) bgPath.setAttribute('d', d);
    if (activePath) activePath.setAttribute('d', d);

    return coords;
  }

  let coords = updatePathCoordinates();
  window.addEventListener('resize', () => {
    coords = updatePathCoordinates();
  });

  const DURATION_PER_STEP = 900; // ms per step (0.9s per node transition)
  const TOTAL_STEPS = 12;
  const TOTAL_DURATION = DURATION_PER_STEP * (TOTAL_STEPS - 1);
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const rawProgress = Math.min(elapsed / TOTAL_DURATION, 1);
    const currentStepIndex = Math.min(Math.floor(rawProgress * TOTAL_STEPS), TOTAL_STEPS - 1);

    if (coords && coords[currentStepIndex]) {
      const currentCoord = coords[currentStepIndex];
      const nextIndex = Math.min(currentStepIndex + 1, TOTAL_STEPS - 1);
      const nextCoord = coords[nextIndex];
      
      const stepFraction = (rawProgress * TOTAL_STEPS) - currentStepIndex;
      const interpolatedX = currentCoord.x + (nextCoord.x - currentCoord.x) * stepFraction;
      const interpolatedY = currentCoord.y + (nextCoord.y - currentCoord.y) * stepFraction;

      if (pulseBall) {
        pulseBall.style.left = `${interpolatedX}px`;
        pulseBall.style.top = `${interpolatedY}px`;
        pulseBall.style.opacity = '1';
      }
    }

    stepCards.forEach((card, index) => {
      if (index === currentStepIndex) {
        card.classList.add('active-step');
        card.classList.remove('completed-step');
      } else if (index < currentStepIndex) {
        card.classList.remove('active-step');
        card.classList.add('completed-step');
      } else {
        card.classList.remove('active-step');
        card.classList.remove('completed-step');
      }
    });

    if (rawProgress >= 1) {
      if (stepCards[11]) {
        stepCards[11].classList.remove('active-step');
        stepCards[11].classList.add('completed-step');
      }
      
      if (completeBadge) completeBadge.classList.add('show');

      // Wait 1.8s then restart infinite loop
      setTimeout(() => {
        if (completeBadge) completeBadge.classList.remove('show');
        stepCards.forEach(c => {
          c.classList.remove('active-step');
          c.classList.remove('completed-step');
        });
        startTime = null;
        requestAnimationFrame(animate);
      }, 1800);
      return;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
