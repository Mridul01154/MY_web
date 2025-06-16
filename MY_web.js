// Matrix-style animation
document.addEventListener('DOMContentLoaded', () => {
  const matrixContainer = document.getElementById('matrixAnimation');
  const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&@*<>{}[]()/\\|";
  
  // Create initial matrix rows
  function createMatrixRow() {
    const row = document.createElement('div');
    row.className = 'matrix-row';
function getCharCount() {
  return window.innerWidth < 600 ? 20 : 70;
}

// Then use:
let charCount = getCharCount();
    // Create characters for the row
    for (let i = 0; i < charCount; i++) {
      const char = document.createElement('span');
      char.className = 'matrix-character';
      char.textContent = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      char.style.animationDelay = `${Math.random() * 2}s`;
      row.appendChild(char);
    }
    
    matrixContainer.appendChild(row);
    
    // Remove old rows to prevent performance issues
    if (matrixContainer.children.length > 5) {
      matrixContainer.removeChild(matrixContainer.children[0]);
    }
  }
  
  // Create initial rows
  for (let i = 0; i < 3; i++) {
    createMatrixRow();
  }
  
  // Add new rows periodically
  setInterval(createMatrixRow, 800);
  
  // Create floating particles effect in background
  const particlesContainer = document.createElement('div');
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '-1';
  document.body.appendChild(particlesContainer);
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 6}px`;
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = Math.random() > 0.5 ? 'rgba(0, 255, 157, 0.3)' : 'rgba(0, 184, 255, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = '0 0 10px rgba(0, 255, 157, 0.5)';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.opacity = '0';
    
    particlesContainer.appendChild(particle);
    
    // Animate particle
    const animation = particle.animate([
      { transform: 'translateY(0)', opacity: 0 },
      { transform: 'translateY(-20px)', opacity: 1 },
      { transform: 'translateY(-100px)', opacity: 0 }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'ease-out'
    });
    
    // Remove particle after animation completes
    animation.onfinish = () => {
      particle.remove();
    };
  }
  
  // Create particles periodically
  setInterval(createParticle, 300);
});

const url = 'Mridul1.pdf';
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
const pageInfo = document.getElementById('page-info');
let pdfDoc = null;
let currentPage = 1;
let scale = 1;

pdfjsLib.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

pdfjsLib.getDocument(url).promise.then(pdf => {
  pdfDoc = pdf;
  pageInfo.textContent = `Page ${currentPage} / ${pdfDoc.numPages}`;
  renderPage(currentPage);
}).catch(err => {
  console.error('Error loading PDF:', err);
});

function renderPage(pageNum) {
  pdfDoc.getPage(pageNum).then(page => {
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);
    
    pageInfo.textContent = `Page ${currentPage} / ${pdfDoc.numPages}`;
  });
}

// Controls
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage <= 1) return;
  currentPage--;
  renderPage(currentPage);
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage >= pdfDoc.numPages) return;
  currentPage++;
  renderPage(currentPage);
});

document.getElementById('zoom-in').addEventListener('click', () => {
  scale = Math.min(scale + 0.25, 3);  
  renderPage(currentPage);
});

document.getElementById('zoom-out').addEventListener('click', () => {
  scale = Math.max(scale - 0.25, 0.5);  
  renderPage(currentPage);
});
