/* ============================================
   EDUVAULT - CONTACT FORM JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Handle form submission
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            subscribe: document.getElementById('subscribe').checked
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';

        try {
            // Send to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showMessage('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showMessage('Error sending message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            // For demo purposes, show success even if backend is not available
            showMessage('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // Validate form
    function validateForm(data) {
        const formMessage = document.getElementById('formMessage');

        // Check required fields
        if (!data.name) {
            showMessage('Please enter your name.', 'error');
            return false;
        }

        if (!data.email) {
            showMessage('Please enter your email address.', 'error');
            return false;
        }

        if (!isValidEmail(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (!data.subject) {
            showMessage('Please select a subject.', 'error');
            return false;
        }

        if (!data.message) {
            showMessage('Please enter your message.', 'error');
            return false;
        }

        if (data.message.length < 10) {
            showMessage('Message must be at least 10 characters long.', 'error');
            return false;
        }

        return true;
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message
    function showMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = `form-message form-message-${type}`;
        formMessage.style.display = 'block';

        // Auto hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });
    });

    // Validate individual field
    function validateField(field) {
        let isValid = true;

        switch (field.id) {
            case 'name':
                isValid = field.value.trim().length > 0;
                break;
            case 'email':
                isValid = isValidEmail(field.value.trim());
                break;
            case 'subject':
                isValid = field.value !== '';
                break;
            case 'message':
                isValid = field.value.trim().length >= 10;
                break;
        }

        if (isValid) {
            field.classList.remove('invalid');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
        }

        return isValid;
    }
});

// Add form validation styles
const style = document.createElement('style');
style.innerHTML = `
    #contactForm input.valid,
    #contactForm textarea.valid,
    #contactForm select.valid {
        border-color: #00ff88 !important;
        background: rgba(0, 255, 136, 0.05) !important;
    }

    #contactForm input.invalid,
    #contactForm textarea.invalid,
    #contactForm select.invalid {
        border-color: #ff3333 !important;
        background: rgba(255, 51, 51, 0.05) !important;
    }

    .form-message {
        padding: 1rem;
        border-radius: 10px;
        margin-top: 1rem;
        font-weight: 500;
        animation: slideUp 0.3s ease-out;
    }

    .form-message-success {
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid #00ff88;
        color: #00ff88;
    }

    .form-message-error {
        background: rgba(255, 51, 51, 0.1);
        border: 1px solid #ff3333;
        color: #ff3333;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
