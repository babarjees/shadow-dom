import './components/FloatingButton.js';
import './components/ServiceTable.js';
import './components/Modal.js';
import './components/DataViewModal.js';
import './components/CoverageVerification.js';

// Create the ShadowWidgets API
const ShadowWidgets = {
  createFloatingButton(options) {
    const btn = document.createElement('floating-button');
    if (options.position) {
      btn.setAttribute('position', options.position);
    }
    if (typeof options.glowing !== 'undefined') {
      btn.glowing = options.glowing;
    }
    if (typeof options.disabled !== 'undefined') {
      btn.disabled = options.disabled;
    }
    document.body.appendChild(btn);
    return btn;
  },

  createPlanModal(options) {
    const modal = document.createElement('plan-modal');
    if (options) {
      if (options.title) {
        modal.title = options.title;
      }
      if (typeof options.isOpen !== 'undefined') {
        modal.isOpen = options.isOpen;
      }
    }
    document.body.appendChild(modal);
    return modal;
  },

  createDataViewModal(options) {
    const modal = document.createElement('data-view-modal');
    if (options) {
      if (typeof options.isOpen !== 'undefined') {
        modal.isOpen = options.isOpen;
      }
      if (options.patientData) {
        modal.patientData = options.patientData;
      }
      if (options.insuranceData) {
        modal.insuranceData = options.insuranceData;
      }
    }
    document.body.appendChild(modal);
    return modal;
  },

  createModalWithFloatingButton(modalOptions, buttonOptions) {
    const modal = this.createPlanModal(modalOptions);
    const button = this.createFloatingButton(buttonOptions);
    // Wire the floating button to toggle the modal on click
    button.addEventListener('click', () => {
      if (!modal.isOpen) {
        modal.isOpen = true;
      } else {
        modal.close();
      }
    });
    return { modal, button };
  },

  createDataViewWithFloatingButton(modalOptions, buttonOptions) {
    const modal = this.createDataViewModal(modalOptions);
    const button = this.createFloatingButton(buttonOptions);
    button.addEventListener('click', () => {
      if (!modal.isOpen) {
        modal.isOpen = true;
      } else {
        modal.close();
      }
    });
    return { modal, button };
  },

  createCoverageVerificationWithButton(buttonOptions = {}) {
    // Create a container for the coverage verification popup
    const container = document.createElement('div');
    container.id = 'coverage-verification-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 9999;
      overflow-y: auto;
      padding: 2rem;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.3s ease;
      justify-content: center;
      align-items: flex-start;
    `;
    
    // Create the coverage verification component
    const coverageVerification = document.createElement('coverage-verification');
    coverageVerification.style.cssText = `
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;

    container.appendChild(coverageVerification);
    document.body.appendChild(container);

    // Create the floating button with specific text and icon
    const button = this.createFloatingButton({
      position: 'bottom-right',
      glowing: true,
      ...buttonOptions
    });

    // Set the button content
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <span>Verify Coverage</span>
    `;

    const showPopup = () => {
      container.style.display = 'flex';
      // Force a reflow before adding opacity
      container.offsetHeight;
      container.style.opacity = '1';
      coverageVerification.style.opacity = '1';
      coverageVerification.style.transform = 'translateY(0)';
      document.body.style.overflow = 'hidden';
    };

    const hidePopup = () => {
      container.style.opacity = '0';
      coverageVerification.style.opacity = '0';
      coverageVerification.style.transform = 'translateY(20px)';
      setTimeout(() => {
        container.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    };

    // Wire up the button click to show the popup
    button.addEventListener('click', showPopup);

    // Add click handler to close on background click
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        hidePopup();
      }
    });

    // Listen for the close event from the component
    coverageVerification.addEventListener('close', hidePopup);

    // Add escape key handler
    const handleEscape = (e) => {
      if (e.key === 'Escape' && container.style.display === 'flex') {
        hidePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup function
    const cleanup = () => {
      document.removeEventListener('keydown', handleEscape);
      container.remove();
      button.remove();
    };

    return { container, button, coverageVerification, cleanup };
  },

  createPriorAuthWithButton(buttonOptions = {}) {
    // Create a container for the prior auth popup
    const container = document.createElement('div');
    container.id = 'prior-auth-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 9999;
      overflow-y: auto;
      padding: 2rem;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.3s ease;
      justify-content: center;
      align-items: flex-start;
    `;
    
    // Create the prior auth verification component
    const priorAuthVerification = document.createElement('prior-auth-verification');
    priorAuthVerification.style.cssText = `
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;

    container.appendChild(priorAuthVerification);
    document.body.appendChild(container);

    // Create the floating button
    const button = this.createFloatingButton({
      position: 'bottom-right',
      glowing: true,
      ...buttonOptions
    });

    // Position the button slightly above the coverage button
    button.style.bottom = '6rem';

    // Set the button content
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" 
        />
      </svg>
      <span>Prior Authorization</span>
    `;

    const showPopup = () => {
      container.style.display = 'flex';
      // Force a reflow
      container.offsetHeight;
      container.style.opacity = '1';
      priorAuthVerification.style.opacity = '1';
      priorAuthVerification.style.transform = 'translateY(0)';
      document.body.style.overflow = 'hidden';
    };

    const hidePopup = () => {
      container.style.opacity = '0';
      priorAuthVerification.style.opacity = '0';
      priorAuthVerification.style.transform = 'translateY(20px)';
      setTimeout(() => {
        container.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    };

    // Wire up the button click to show the popup
    button.addEventListener('click', showPopup);

    // Add click handler to close on background click
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        hidePopup();
      }
    });

    // Listen for the close event from the component
    priorAuthVerification.addEventListener('close', hidePopup);

    // Add escape key handler
    const handleEscape = (e) => {
      if (e.key === 'Escape' && container.style.display === 'flex') {
        hidePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup function
    const cleanup = () => {
      document.removeEventListener('keydown', handleEscape);
      container.remove();
      button.remove();
    };

    return { container, button, priorAuthVerification, cleanup };
  }
};

// Make it available globally
window.ShadowWidgets = ShadowWidgets;

// Export as default and as a named export
export default ShadowWidgets;
export { ShadowWidgets };

// Ensure compatibility with CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports.default = ShadowWidgets;
} 