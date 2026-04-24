// ── REGISTER REAL SERVICE WORKER ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('[PDFify] Service Worker registered'))
    .catch(err => console.warn('[PDFify] SW registration failed:', err));
}

// ── PWA INSTALL BUTTON LOGIC ──
let deferredPrompt = null;
const installBtn = document.getElementById('install-btn');
const installToast = document.getElementById('install-toast');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.add('visible');
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    installBtn.classList.remove('visible');
    showInstallToast();
  }
  deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
  installBtn.classList.remove('visible');
  deferredPrompt = null;
  showInstallToast();
});

function showInstallToast() {
  installToast.classList.add('show');
  setTimeout(() => installToast.classList.remove('show'), 3500);
}
