/**
 * Admin Dashboard JavaScript
 * Handles PDF uploads, document management, and statistics
 */

// Configuration
const API_BASE_URL = 'http://localhost:5000';
// For production, use: const API_BASE_URL = 'https://your-render-domain.onrender.com';

let adminToken = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    adminToken = localStorage.getItem('adminToken');

    if (!adminToken) {
        alert('Please login with admin credentials first');
        window.location.href = 'index.html';
        return;
    }

    setupFileInput();
    setupFormSubmit();
    loadDocuments();
    loadStatistics();
    displayAdminInfo();
});

// Get admin info from token
function displayAdminInfo() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('admin-welcome').textContent = `Welcome, ${userEmail}`;
    }
}

// Setup file input drag and drop
function setupFileInput() {
    const fileInput = document.getElementById('pdfFile');
    const fileLabel = document.querySelector('.file-input-label');

    fileInput.addEventListener('change', function (e) {
        updateFileName();
    });

    // Drag and drop
    fileLabel.addEventListener('dragover', function (e) {
        e.preventDefault();
        fileLabel.style.background = 'rgba(0, 212, 255, 0.3)';
        fileLabel.style.borderColor = 'var(--accent-primary)';
    });

    fileLabel.addEventListener('dragleave', function (e) {
        fileLabel.style.background = 'rgba(0, 212, 255, 0.1)';
        fileLabel.style.borderColor = 'rgba(0, 212, 255, 0.5)';
    });

    fileLabel.addEventListener('drop', function (e) {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            updateFileName();
        }
        fileLabel.style.background = 'rgba(0, 212, 255, 0.1)';
        fileLabel.style.borderColor = 'rgba(0, 212, 255, 0.5)';
    });
}

// Update file name display
function updateFileName() {
    const fileInput = document.getElementById('pdfFile');
    const fileName = document.getElementById('fileName');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        fileName.textContent = `✓ ${file.name} (${sizeMB} MB)`;
    } else {
        fileName.textContent = '';
    }
}

// Setup form submit
function setupFormSubmit() {
    const form = document.getElementById('uploadForm');
    form.addEventListener('submit', handleUpload);
}

// Handle PDF upload
async function handleUpload(e) {
    e.preventDefault();

    const fileInput = document.getElementById('pdfFile');
    const file = fileInput.files[0];

    if (!file) {
        showMessage('Please select a PDF file', 'error');
        return;
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
        showMessage('File size exceeds 100MB limit', 'error');
        return;
    }

    // Validate file type
    if (!file.name.endsWith('.pdf')) {
        showMessage('Please upload a PDF file only', 'error');
        return;
    }

    showSpinner(true);

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', document.getElementById('title').value);
        formData.append('branch', document.getElementById('branch').value);
        formData.append('semester', document.getElementById('semester').value);
        formData.append('subject', document.getElementById('subject').value);
        formData.append('type', document.getElementById('type').value);
        formData.append('description', document.getElementById('description').value);

        const response = await fetch(`${API_BASE_URL}/api/pdf/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('PDF uploaded successfully!', 'success');
            document.getElementById('uploadForm').reset();
            document.getElementById('fileName').textContent = '';

            // Reload documents list
            setTimeout(() => {
                loadDocuments();
            }, 1000);
        } else {
            showMessage(data.message || 'Upload failed', 'error');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showMessage('Error uploading PDF: ' + error.message, 'error');
    } finally {
        showSpinner(false);
    }
}

// Load and display documents
async function loadDocuments() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/pdf/`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });

        if (!response.ok) throw new Error('Failed to load documents');

        const documents = await response.json();
        displayDocuments(documents);
    } catch (error) {
        console.error('Error loading documents:', error);
        document.getElementById('managedocs').innerHTML = `
            <p style="color: #FF6347;">Error loading documents</p>
        `;
    }
}

// Display documents in table
function displayDocuments(documents) {
    let html = `
        <table class="documents-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Branch</th>
                    <th>Semester</th>
                    <th>Views</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (documents.length === 0) {
        html += `
            <tr>
                <td colspan="7" style="text-align: center; padding: 30px;">
                    No documents uploaded yet
                </td>
            </tr>
        `;
    } else {
        documents.forEach(doc => {
            const status = doc.is_published ? 'Published' : 'Draft';
            const statusClass = doc.is_published ? 'status-published' : 'status-draft';

            html += `
                <tr>
                    <td>${doc.title}</td>
                    <td><span class="doc-badge">${doc.doc_type}</span></td>
                    <td>${doc.branch}</td>
                    <td>Sem ${doc.semester}</td>
                    <td>${doc.views_count}</td>
                    <td><span class="status-badge ${statusClass}">${status}</span></td>
                    <td>
                        <button class="action-btn" onclick="deleteDocument(${doc.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    html += `
            </tbody>
        </table>
    `;

    document.getElementById('managedocs').innerHTML = html;
}

// Delete document
async function deleteDocument(docId) {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/pdf/${docId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });

        if (response.ok) {
            showMessage('Document deleted successfully', 'success');
            loadDocuments();
        } else {
            showMessage('Failed to delete document', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showMessage('Error deleting document', 'error');
    }
}

// Load statistics
async function loadStatistics() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/statistics`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });

        if (response.ok) {
            const stats = await response.json();
            document.getElementById('statDocs').textContent = stats.total_documents || 0;
            document.getElementById('statViews').textContent = stats.total_views || 0;
            document.getElementById('statUsers').textContent = stats.total_users || 0;
            document.getElementById('statActive').textContent = stats.active_users || 0;
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Switch tabs
function switchTab(tabName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active from buttons
    document.querySelectorAll('.admin-nav .btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    });

    // Show selected section
    document.getElementById(tabName).classList.add('active');

    // Highlight button
    event.target.classList.remove('btn-secondary');
    event.target.classList.add('btn-primary');

    // Reload data if needed
    if (tabName === 'manage') {
        loadDocuments();
    } else if (tabName === 'stats') {
        loadStatistics();
    }
}

// Show/hide spinner
function showSpinner(show) {
    const spinner = document.getElementById('uploadSpinner');
    const btn = document.getElementById('uploadBtn');

    if (show) {
        spinner.style.display = 'block';
        btn.disabled = true;
    } else {
        spinner.style.display = 'none';
        btn.disabled = false;
    }
}

// Show message
function showMessage(text, type) {
    const messageDiv = document.getElementById('uploadMessage');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;

    setTimeout(() => {
        messageDiv.className = 'message';
    }, 5000);
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    }
}
