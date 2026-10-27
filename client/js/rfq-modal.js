/* =========================================================
   A S ENGINEERING WORK - GLOBAL INSTANT RFQ MODAL HANDLER
   File: client/js/rfq-modal.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalRfqModal();
});

function initGlobalRfqModal() {
  // Create Modal HTML dynamically if not present
  if (!document.getElementById('global-rfq-modal')) {
    const modalHTML = `
      <div id="global-rfq-modal" class="rfq-modal-overlay">
        <div class="rfq-modal-container">
          <button class="rfq-modal-close-btn" id="rfq-modal-close" aria-label="Close RFQ Form"><i class="fas fa-times"></i></button>
          
          <div class="rfq-modal-header">
            <h3><i class="fas fa-file-contract" style="color: var(--accent-orange);"></i> Request For Quotation (RFQ)</h3>
          </div>
          
          <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1.5rem;">
            Submit your component specs or CAD blueprint for an instant factory price quotation.
          </p>

          <form id="modal-rfq-form" action="#" method="POST" enctype="multipart/form-data">
            <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group" style="margin-bottom: 0;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">Company Name *</label>
                <input type="text" class="form-control-input" placeholder="e.g. Apex Hydro Pumps" required style="width: 100%; padding: 0.65rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">Contact Person *</label>
                <input type="text" class="form-control-input" placeholder="e.g. Rahul Sharma" required style="width: 100%; padding: 0.65rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
              </div>
            </div>

            <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group" style="margin-bottom: 0;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">Email Address *</label>
                <input type="email" class="form-control-input" placeholder="name@company.com" required style="width: 100%; padding: 0.65rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">WhatsApp / Mobile *</label>
                <input type="tel" class="form-control-input" placeholder="+91 9850444542" required style="width: 100%; padding: 0.65rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
              </div>
            </div>

            <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group" style="margin-bottom: 0;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">Product Category *</label>
                <select class="form-control-input" required style="width: 100%; padding: 0.65rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
                  <option value="" disabled selected>Select Product...</option>
                  <option value="ss-rings">Precision SS Rings</option>
                  <option value="ss-bushings">Flanged SS Bushings</option>
                  <option value="ss-sleeves">Submersible Pump SS Sleeves</option>
                  <option value="ss-pipes">Seamless SS Pipes & Tubes</option>
                  <option value="machined">Custom Machined Components</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">Material Grade *</label>
                <select class="form-control-input" required style="width: 100%; padding: 0.65rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
                  <option value="" disabled selected>Select Material...</option>
                  <option value="jindal-304">Jindal 304</option>
                  <option value="jindal-202">Jindal 202 J4</option>
                  <option value="ss-316">SS 316 (Marine Grade)</option>
                </select>
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">CAD Drawing Blueprint File (Optional)</label>
              <input type="file" class="form-control-input" accept=".pdf,.dwg,.dxf,.step,.png,.jpg" style="width: 100%; padding: 0.5rem; border: 1px dashed #CBD5E1; border-radius: 8px; font-size: 0.82rem; background: #F8FAFC;">
            </div>

            <button type="submit" class="btn btn-accent" style="width: 100%; padding: 0.8rem; font-size: 0.9rem; background: var(--accent-orange); border-color: var(--accent-orange);">
              SUBMIT FOR INSTANT QUOTE <i class="fas fa-calculator" style="margin-left: 0.4rem;"></i>
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modalOverlay = document.getElementById('global-rfq-modal');
  const modalClose = document.getElementById('rfq-modal-close');
  const modalForm = document.getElementById('modal-rfq-form');

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your quotation request has been submitted. Our engineering team will contact you shortly.');
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  // Intercept all "REQUEST QUOTE" or "Get Quote" buttons across the site
  const quoteButtons = Array.from(document.querySelectorAll('a, button')).filter(el => {
    const text = (el.textContent || '').toUpperCase();
    const href = el.getAttribute('href') || '';
    return text.includes('REQUEST QUOTE') || text.includes('GET QUOTE') || text.includes('INQUIRE NOW') || href.includes('#rfq-form') || el.classList.contains('float-rfq');
  });

  quoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (modalOverlay) {
        modalOverlay.classList.add('active');
        e.preventDefault();
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Check URL hash for #rfq-form
  if (window.location.hash.includes('rfq')) {
    const rfqCard = document.querySelector('#rfq-form-main')?.closest('.form-container-card');
    if (rfqCard) {
      rfqCard.classList.add('rfq-highlight-pulse');
      setTimeout(() => rfqCard.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    } else if (modalOverlay) {
      modalOverlay.classList.add('active');
    }
  }
}
