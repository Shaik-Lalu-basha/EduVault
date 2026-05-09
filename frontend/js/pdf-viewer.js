/* ============================================
   EDUVAULT - PDF VIEWER JAVASCRIPT
   ============================================ */

let pdfDoc = null;
let currentPage = 1;
let zoomLevel = 100;
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');

// PDF.js Worker Setup
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Load PDF Document
async function loadPDF(pdfUrl) {
    try {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'flex';

        // Load PDF from URL
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        pdfDoc = pdf;

        // Update UI
        updateDocumentInfo();
        renderPage(currentPage);

        if (loading) loading.style.display = 'none';
    } catch (error) {
        console.error('Error loading PDF:', error);
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = '<p style="color: #ff3333;">Error loading PDF. Please try again.</p>';
        }
    }
}

// Render Current Page
async function renderPage(pageNum) {
    try {
        // Validate page number
        if (pageNum < 1) pageNum = 1;
        if (pageNum > pdfDoc.numPages) pageNum = pdfDoc.numPages;
        currentPage = pageNum;

        // Get page
        const page = await pdfDoc.getPage(pageNum);

        // Set canvas dimensions based on zoom
        const scale = (zoomLevel / 100) * (window.innerWidth > 768 ? 1 : 0.8);
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render page to canvas
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        const task = page.render(renderContext);
        await task.promise;

        // Add watermark
        addWatermark();

        // Update page indicator
        updatePageIndicator();
    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

// Update Page Indicator
function updatePageIndicator() {
    const pageInput = document.getElementById('pageInput');
    const pageTotal = document.getElementById('pageTotal');

    if (pageInput) pageInput.value = currentPage;
    if (pageTotal) pageTotal.textContent = pdfDoc.numPages;
}

// Update Document Information
function updateDocumentInfo() {
    const totalPages = document.getElementById('totalPages');
    if (totalPages) totalPages.textContent = pdfDoc.numPages;

    // Get document metadata from URL
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('id');

    // Sample metadata (replace with actual API call)
    const docMetadata = {
        branch: 'Computer Science & Engineering',
        semester: '5',
        subject: 'Database Management Systems'
    };

    document.getElementById('branchInfo').textContent = docMetadata.branch || '--';
    document.getElementById('semesterInfo').textContent = docMetadata.semester || '--';
    document.getElementById('subjectInfo').textContent = docMetadata.subject || '--';

    // Update document title
    const titleElement = document.getElementById('documentTitle');
    if (titleElement) {
        titleElement.textContent = docMetadata.subject || 'EduVault PDF Viewer';
    }
}

// Navigation Controls
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        renderPage(currentPage - 1);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < pdfDoc.numPages) {
        renderPage(currentPage + 1);
    }
});

// Page Input
document.getElementById('pageInput').addEventListener('change', (e) => {
    const pageNum = parseInt(e.target.value) || 1;
    if (pageNum >= 1 && pageNum <= pdfDoc.numPages) {
        renderPage(pageNum);
    }
});

// Zoom Controls
document.getElementById('zoomOutBtn').addEventListener('click', () => {
    if (zoomLevel > 50) {
        zoomLevel -= 10;
        updateZoomLevel();
        renderPage(currentPage);
    }
});

document.getElementById('zoomInBtn').addEventListener('click', () => {
    if (zoomLevel < 300) {
        zoomLevel += 10;
        updateZoomLevel();
        renderPage(currentPage);
    }
});

function updateZoomLevel() {
    document.getElementById('zoomLevel').textContent = zoomLevel + '%';
}

// Home Button
document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Fullscreen Button
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const container = document.querySelector('.viewer-container');
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
});

// Print Button (Disabled for Security)
document.getElementById('printBtn').disabled = true;
document.getElementById('printBtn').title = 'Print is disabled for security';

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!pdfDoc) return;

    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
            if (currentPage > 1) renderPage(currentPage - 1);
            break;
        case 'ArrowDown':
        case 'ArrowRight':
            if (currentPage < pdfDoc.numPages) renderPage(currentPage + 1);
            break;
        case '+':
        case '=':
            if (zoomLevel < 300) {
                zoomLevel += 10;
                updateZoomLevel();
                renderPage(currentPage);
            }
            break;
        case '-':
            if (zoomLevel > 50) {
                zoomLevel -= 10;
                updateZoomLevel();
                renderPage(currentPage);
            }
            break;
    }
});

// Add Watermark
function addWatermark() {
    const studentId = getStudentIdFromURL() || 'STUDENT_' + Date.now();
    const timestamp = new Date().toLocaleString();

    const watermark = document.getElementById('watermark');
    if (watermark) {
        watermark.innerHTML = `Viewed by ${studentId}<br>Page ${currentPage}`;
        watermark.style.display = 'block';
    }
}

// Get Student ID from URL
function getStudentIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('studentId');
}

// Double-click to Zoom
let lastClickTime = 0;
canvas.addEventListener('dblclick', (e) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;

    if (timeDiff < 300) {
        // Double click detected
        zoomLevel = zoomLevel === 100 ? 150 : 100;
        updateZoomLevel();
        renderPage(currentPage);
    }

    lastClickTime = currentTime;
});

// Mouse Wheel Zoom
document.addEventListener('wheel', (e) => {
    if (!e.ctrlKey) return;

    e.preventDefault();

    if (e.deltaY > 0) {
        // Zoom out
        if (zoomLevel > 50) {
            zoomLevel -= 10;
        }
    } else {
        // Zoom in
        if (zoomLevel < 300) {
            zoomLevel += 10;
        }
    }

    updateZoomLevel();
    renderPage(currentPage);
}, { passive: false });

// Responsive Canvas
window.addEventListener('resize', () => {
    if (pdfDoc) {
        renderPage(currentPage);
    }
});

// Load PDF on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('id');

    if (docId) {
        // Construct PDF URL (replace with actual backend endpoint)
        const pdfUrl = `/api/pdf/${docId}`;
        loadPDF(pdfUrl);
    } else {
        // For demo, load a sample PDF
        loadSamplePDF();
    }
});

// Load Sample PDF for Demo
function loadSamplePDF() {
    // Using a public PDF for demo
    const samplePdfUrl = 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table.pdf';
    loadPDF(samplePdfUrl);
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
});

// Prevent Context Menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Prevent Text Selection on Canvas
canvas.style.userSelect = 'none';
canvas.style.webkitUserSelect = 'none';

// Log viewer session
console.log('PDF Viewer initialized for secure content viewing');
