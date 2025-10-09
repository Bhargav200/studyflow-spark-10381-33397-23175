
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global styles for Spline viewer
const style = document.createElement('style');
style.textContent = `
  .spline-container {
    background: transparent !important;
  }
  spline-viewer {
    width: 100%;
    height: 100%;
    background: transparent !important;
  }
  
  /* Force internal Spline canvas to be transparent too */
  spline-viewer::part(canvas),
  spline-viewer canvas,
  spline-viewer > div {
    background: transparent !important;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
