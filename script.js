// Initialize cart
let cart = [];
const cartCount = document.querySelector('.cart-count');

// Add to cart functionality
document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        
        // Add to cart
        cart.push({
            name: productName,
            price: productPrice
        });
        
        // Update cart count
        cartCount.textContent = cart.length;
        
        // Show notification
        showNotification(`${productName} added to cart!`);
        
        // Animate button
        this.textContent = '✓ Added';
        this.style.background = '#4CAF50';
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '';
        }, 2000);
    });
});

// Shop now button
document.querySelector('.btn-primary').addEventListener('click', function() {
    const productsSection = document.querySelector('#products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        subject: this.querySelector('input[placeholder="Subject"]').value,
        message: this.querySelector('textarea').value
    };
    
    // Log form data (in real scenario, this would be sent to a server)
    console.log('Form submitted:', formData);
    
    showNotification('Message sent successfully! We will contact you soon.');
    
    // Reset form
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #D4AF37, #E5C100);
        color: #2C2C2C;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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
document.head.appendChild(style);

// Category click handlers
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        showNotification(`Exploring ${categoryName}...`);
        // In a real scenario, this would filter products
    });
});

// Mobile menu toggle (for future expansion)
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    if (window.innerWidth < 768) {
        nav.style.display = 'none';
    }
}

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.product-image img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Track page analytics (simple version)
function trackPageView() {
    console.log('Page loaded:', new Date().toLocaleString());
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    trackPageView();
    
    // Add hover effects to products
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Responsive window resize handler
window.addEventListener('resize', function() {
    initMobileMenu();
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'C' to view cart
    if (e.key === 'c' || e.key === 'C') {
        if (cart.length > 0) {
            showNotification(`Cart: ${cart.length} items`);
        } else {
            showNotification('Your cart is empty!');
        }
    }
    
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log('✓ Velnora Bags website loaded successfully!');
console.log('Tip: Press "C" to view cart, "H" to go home');