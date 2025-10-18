// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Success
      showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
      contactForm.reset();
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      // Log form data (in production, send to backend)
      console.log('Form submitted:', formData);
      
      // In production, you would do:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // .then(response => response.json())
      // .then(data => {
      //   showNotification('Message sent successfully!', 'success');
      //   contactForm.reset();
      // })
      // .catch(error => {
      //   showNotification('Error sending message. Please try again.', 'error');
      // });
      
    }, 1500);
  });
}

// Notification function
function showNotification(message, type) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">
        ${type === 'success' ? '✓' : '⚠'}
      </span>
      <p class="notification-message">${message}</p>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 100px;
      right: 30px;
      background: #ffffff;
      padding: 20px 25px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideInRight 0.4s ease;
      max-width: 400px;
      border-left: 4px solid;
    }
    
    .notification-success {
      border-left-color: #10b981;
    }
    
    .notification-error {
      border-left-color: #ef4444;
    }
    
    .notification-content {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    
    .notification-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      flex-shrink: 0;
    }
    
    .notification-success .notification-icon {
      background: #d1fae5;
      color: #10b981;
    }
    
    .notification-error .notification-icon {
      background: #fee2e2;
      color: #ef4444;
    }
    
    .notification-message {
      flex: 1;
      font-family: 'Roboto', sans-serif;
      font-size: 0.95rem;
      color: #222222;
      line-height: 1.5;
      margin: 0;
    }
    
    .notification-close {
      background: none;
      border: none;
      font-size: 24px;
      color: #666666;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: color 0.3s ease;
    }
    
    .notification-close:hover {
      color: #222222;
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @media (max-width: 600px) {
      .notification {
        right: 15px;
        left: 15px;
        max-width: none;
      }
    }
  `;
  
  if (!document.querySelector('style[data-notification]')) {
    style.setAttribute('data-notification', 'true');
    document.head.appendChild(style);
  }
  
  // Append to body
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.4s ease';
      setTimeout(() => notification.remove(), 400);
    }
  }, 5000);
}

// Add slideOutRight animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(slideOutStyle);

// Phone number formatting (optional enhancement)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Basic Ghana phone formatting
    if (value.startsWith('233')) {
      value = '+' + value;
    } else if (value.startsWith('0')) {
      value = '+233' + value.substring(1);
    }
    
    // Limit length
    if (value.length > 13) {
      value = value.substring(0, 13);
    }
    
    e.target.value = value;
  });
}

// Form input animations
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
formInputs.forEach(input => {
  // Add focus class to parent
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
  
  // Check if already has value on page load
  if (input.value) {
    input.parentElement.classList.add('focused');
  }
});
