// Import WebComponents polyfill for broader browser support
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

// Import our components
import './components/FormInput.js';
import './components/MultiSelect.js';
import './components/ServiceTable.js';
import './components/Modal.js';
import './components/FloatingButton.js';
import './components/CoverageVerification.js';

// Import and export ShadowWidgets API
import { ShadowWidgets } from './shadow-widgets.js';

// Initialize the coverage verification widget
const coverageVerification = ShadowWidgets.createCoverageVerificationWithButton({
  position: 'bottom-right',
  glowing: true
});

// Export helpers and widgets
export { ShadowWidgets };

// Import Tailwind styles
import './styles/tailwind.css'; 