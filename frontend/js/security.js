/* ============================================
   EDUVAULT - SECURITY FEATURES
   ============================================ */

// Security Configuration
const SECURITY_CONFIG = {
    disableRightClick: true,
    disableDevTools: true,
    disablePrintScreen: true,
    disableScreenshot: true,
    enableBlurOnTabChange: true,
    enableWatermark: true
};

// Initialize Security Features
function initializeSecurity() {
    console.log('Initializing security features...');

    if (SECURITY_CONFIG.disableRightClick) {
        disableRightClick();
    }

    if (SECURITY_CONFIG.disableDevTools) {
        disableDevTools();
    }

    if (SECURITY_CONFIG.disablePrintScreen) {
        disablePrintScreen();
    }

    if (SECURITY_CONFIG.disableScreenshot) {
        disableScreenshot();
    }

    if (SECURITY_CONFIG.enableBlurOnTabChange) {
        enableBlurOnTabChange();
    }

    if (SECURITY_CONFIG.enableWatermark) {
        enableWatermark();
    }

    // Prevent text selection on sensitive content
    preventTextSelection();

    // Disable drag and drop
    disableDragDrop();

    // Prevent iframe breakout
    preventIframeBreakout();
}

// Disable Right Click
function disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.warn('Right-click is disabled for security');
        return false;
    });
}

// Disable Developer Tools
function disableDevTools() {
    // Disable F12
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') {
            e.preventDefault();
            console.warn('F12 Developer Tools are disabled');
        }
    });

    // Disable Ctrl+Shift+I (Inspector)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            console.warn('Inspector is disabled');
        }
    });

    // Disable Ctrl+Shift+J (Console)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            console.warn('Console is disabled');
        }
    });

    // Disable Ctrl+Shift+C (Element Inspector)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            console.warn('Element Inspector is disabled');
        }
    });

    // Detect DevTools open
    setInterval(() => {
        const devtools = { open: false };
        const threshold = 160;

        if (window.outerHeight - window.innerHeight > threshold ||
            window.outerWidth - window.innerWidth > threshold) {
            devtools.open = true;
        }

        if (devtools.open) {
            console.warn('Developer Tools detected as open!');
            // Optionally blur the page
            document.body.style.filter = 'blur(5px)';
        } else {
            document.body.style.filter = 'blur(0px)';
        }
    }, 1000);
}

// Disable Print Screen
function disablePrintScreen() {
    // Disable PrintScreen key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            console.warn('Print Screen is disabled');
        }
    });

    // Disable Ctrl+P (Print)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            console.warn('Print function is disabled');
        }
    });

    // Disable Ctrl+S (Save)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            console.warn('Save function is disabled');
        }
    });

    // Disable Ctrl+U (View Source)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            console.warn('View Source is disabled');
        }
    });
}

// Disable Screenshot
function disableScreenshot() {
    // Monitor for common screenshot tools
    // This is a basic implementation; more advanced methods may be needed

    // Disable Shift+PrintScreen
    document.addEventListener('keyup', (e) => {
        if (e.shiftKey && e.key === 'PrintScreen') {
            e.preventDefault();
            console.warn('Screenshot attempt blocked');
        }
    });

    // Use canvas fingerprinting detection
    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = canvas.height = 10;
        context.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        context.fillRect(0, 0, 10, 10);

        // Check if canvas data is being extracted
        const imageData = context.getImageData(0, 0, 10, 10);
        if (!imageData.data) {
            console.warn('Canvas access restricted');
        }
    } catch (e) {
        console.warn('Screenshot protection enabled');
    }
}

// Blur on Tab Change
function enableBlurOnTabChange() {
    const blurOverlay = document.getElementById('blurOverlay');

    // When user leaves the tab
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.warn('User switched tabs - applying blur');
            if (blurOverlay) {
                blurOverlay.classList.add('active');
            }
            document.body.style.filter = 'blur(20px)';
        } else {
            console.log('User returned to tab - removing blur');
            if (blurOverlay) {
                blurOverlay.classList.remove('active');
            }
            document.body.style.filter = 'blur(0px)';
        }
    });

    // When window loses focus
    window.addEventListener('blur', () => {
        console.warn('Window lost focus - applying blur');
        if (blurOverlay) {
            blurOverlay.classList.add('active');
        }
        document.body.style.filter = 'blur(20px)';
    });

    // When window regains focus
    window.addEventListener('focus', () => {
        console.log('Window regained focus - removing blur');
        if (blurOverlay) {
            blurOverlay.classList.remove('active');
        }
        document.body.style.filter = 'blur(0px)';
    });
}

// Enable Watermark
function enableWatermark() {
    const watermarkElement = document.getElementById('watermark');
    if (!watermarkElement) return;

    // Get student ID (from URL or session)
    const studentId = getStudentId() || 'STUDENT_ID';
    const timestamp = new Date().toLocaleString();

    // Set watermark content
    watermarkElement.innerHTML = `Viewed by ${studentId}<br>${timestamp}`;
    watermarkElement.style.opacity = '0.1';
}

// Get Student ID
function getStudentId() {
    // Try to get from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('studentId')) {
        return urlParams.get('studentId');
    }

    // Try to get from localStorage
    if (localStorage.getItem('studentId')) {
        return localStorage.getItem('studentId');
    }

    // Try to get from session
    if (sessionStorage.getItem('studentId')) {
        return sessionStorage.getItem('studentId');
    }

    // Default
    return 'GUEST_USER_' + Date.now();
}

// Prevent Text Selection on Certain Elements
function preventTextSelection() {
    // Prevent selection on sensitive elements
    const protectedElements = document.querySelectorAll('body');
    protectedElements.forEach(el => {
        el.style.userSelect = 'none';
        el.style.webkitUserSelect = 'none';
        el.style.msUserSelect = 'none';
    });

    // Also prevent copy
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        console.warn('Copy is disabled');
        return false;
    });

    // Prevent cut
    document.addEventListener('cut', (e) => {
        e.preventDefault();
        console.warn('Cut is disabled');
        return false;
    });
}

// Disable Drag and Drop
function disableDragDrop() {
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        console.warn('Drag is disabled');
        return false;
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        console.warn('Drop is disabled');
        return false;
    });

    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        return false;
    });
}

// Prevent iframe Breakout
function preventIframeBreakout() {
    // Check if page is in an iframe
    if (window.self !== window.top) {
        // Either break out of iframe or restrict functionality
        // For security, we'll just warn about it
        console.warn('Page is running inside an iframe');

        // Optionally break out of iframe
        window.top.location = window.self.location;
    }
}

// Log Security Events
function logSecurityEvent(event, details = {}) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        event: event,
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...details
    };

    // Send to backend for logging
    sendSecurityLog(logEntry);

    console.log('Security Event:', logEntry);
}

// Send Security Log to Backend
async function sendSecurityLog(logEntry) {
    try {
        await fetch('/api/security-log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logEntry)
        });
    } catch (error) {
        console.error('Error sending security log:', error);
    }
}

// Detect Screen Recording
function detectScreenRecording() {
    // This is a simple detection method
    // More sophisticated methods may be needed

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;

    try {
        // Fill with a specific color
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 100, 100);

        // Check pixel data
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const data = imageData.data;

        let blackPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
                blackPixels++;
            }
        }

        // If significant pixels are not black, likely screen recording
        if (blackPixels < 100 * 100 * 0.9) {
            console.warn('Screen recording may be in progress');
            logSecurityEvent('suspected_screen_recording');
        }
    } catch (error) {
        console.error('Error checking screen recording:', error);
    }
}

// Initialize security when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSecurity);
} else {
    initializeSecurity();
}

// Log page visit
logSecurityEvent('page_visit');

// Periodic security checks
setInterval(() => {
    detectScreenRecording();
}, 5000);
