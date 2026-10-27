/* =========================================================
   A S ENGINEERING WORK - S-WAVE 12-STEP PIPELINE ANIMATION
   File: client/js/swave-pipeline.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initSWavePipelineAnimation();
});

function initSWavePipelineAnimation() {
  const container = document.querySelector('.swave-pipeline-container');
  const activePath = document.getElementById('swave-line-active');
  const bgPath = document.getElementById('swave-line-bg');
  const pulseBall = document.getElementById('swave-pulse-ball');
  const stepItems = Array.from(document.querySelectorAll('.swave-step-item'));

  if (!container || !stepItems.length) return;

  // Step order sequence: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12
  const orderedSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(stepNum => {
    return stepItems.find(item => parseInt(item.getAttribute('data-step')) === stepNum);
  }).filter(Boolean);

  function updatePathCoordinates() {
    const containerRect = container.getBoundingClientRect();
    if (!containerRect.width || window.innerWidth < 768) {
      if (pulseBall) pulseBall.style.opacity = '0';
      return null;
    }

    const coords = orderedSteps.map(item => {
      const numBadge = item.querySelector('.swave-num-badge');
      const rect = numBadge ? numBadge.getBoundingClientRect() : item.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    });

    if (coords.length < 12) return coords;

    const scaleX = 1180 / (containerRect.width || 1180);
    const scaleY = 480 / (containerRect.height || 480);

    const p = coords.map(c => ({
      x: c.x * scaleX,
      y: c.y * scaleY
    }));

    // Build S-wave curved path for 2-row desktop grid
    const d = [
      `M ${p[0].x},${p[0].y}`,
      `L ${p[1].x},${p[1].y}`,
      `L ${p[2].x},${p[2].y}`,
      `L ${p[3].x},${p[3].y}`,
      `L ${p[4].x},${p[4].y}`,
      `L ${p[5].x},${p[5].y}`,
      `C ${p[5].x + 90},${p[5].y} ${p[6].x + 90},${p[6].y} ${p[6].x},${p[6].y}`,
      `L ${p[7].x},${p[7].y}`,
      `L ${p[8].x},${p[8].y}`,
      `L ${p[9].x},${p[9].y}`,
      `L ${p[10].x},${p[10].y}`,
      `L ${p[11].x},${p[11].y}`
    ].join(' ');

    if (bgPath) bgPath.setAttribute('d', d);
    if (activePath) activePath.setAttribute('d', d);

    return coords;
  }

  let coords = updatePathCoordinates();
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      coords = updatePathCoordinates();
    }, 150);
  });

  const DURATION_PER_STEP = 900; // ms per step
  const TOTAL_STEPS = orderedSteps.length;
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

    orderedSteps.forEach((item, index) => {
      const numBadge = item.querySelector('.swave-num-badge');
      const stepNumStr = String(item.getAttribute('data-step')).padStart(2, '0');

      if (index === currentStepIndex) {
        item.classList.add('active-step');
        item.classList.remove('completed-step');
        if (numBadge) {
          numBadge.innerHTML = stepNumStr;
        }
      } else if (index < currentStepIndex) {
        item.classList.remove('active-step');
        item.classList.add('completed-step');
        if (numBadge) {
          numBadge.innerHTML = '<i class="fas fa-check" style="font-size:0.75rem;"></i>';
        }
      } else {
        item.classList.remove('active-step');
        item.classList.remove('completed-step');
        if (numBadge) {
          numBadge.innerHTML = stepNumStr;
        }
      }
    });

    if (rawProgress >= 1) {
      if (orderedSteps[11]) {
        orderedSteps[11].classList.remove('active-step');
        orderedSteps[11].classList.add('completed-step');
      }

      setTimeout(() => {
        orderedSteps.forEach(item => {
          item.classList.remove('active-step');
          item.classList.remove('completed-step');
          const badge = item.querySelector('.swave-num-badge');
          if (badge) {
            badge.innerHTML = String(item.getAttribute('data-step')).padStart(2, '0');
          }
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
