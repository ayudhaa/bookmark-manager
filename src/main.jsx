import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => {
        console.log('SW registered: ', registration)
      },
      error => {
        console.log('SW registration failed: ', error)
      }
    )
  })
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  const installPrompt = document.getElementById('install-prompt');
  const installBtn = document.getElementById('install-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  if (installPrompt && installBtn && cancelBtn) {
    installPrompt.classList.remove('hidden');
    
    installBtn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
      installPrompt.classList.add('hidden');
    });
    
    cancelBtn.addEventListener('click', () => {
      installPrompt.classList.add('hidden');
    });
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)