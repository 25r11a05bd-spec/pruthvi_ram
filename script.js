document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    const skillItems = document.querySelectorAll('.skill-item');
    const sections = document.querySelectorAll('section');

    // Custom Cursor Movement
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let blurX = 0, blurY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Smooth lag for the cursor
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Even smoother lag for the blur
        blurX += (mouseX - blurX) * 0.05;
        blurY += (mouseY - blurY) * 0.05;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursor.style.transform = `translate(-50%, -50%)`;

        cursorBlur.style.left = `${blurX}px`;
        cursorBlur.style.top = `${blurY}px`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Interaction with Skill Items (Color Changing)
    skillItems.forEach(item => {
        const color = item.getAttribute('data-color');
        
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '80px';
            cursor.style.height = '80px';
            cursor.style.backgroundColor = color;
            cursor.style.mixBlendMode = 'normal';
            cursorBlur.style.background = `radial-gradient(circle, ${color}33 0%, transparent 70%)`;
            item.style.backgroundColor = color;
            item.style.borderColor = color;
        });

        item.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = '#ffffff';
            cursor.style.mixBlendMode = 'difference';
            cursorBlur.style.background = `radial-gradient(circle, rgba(0, 242, 255, 0.15) 0%, transparent 70%)`;
            item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            item.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('reveal-section');
        revealObserver.observe(section);
    });

    // Add CSS for reveal animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .reveal-section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease;
        }
        .reveal-section.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Hero text reveal */
        .reveal-text {
            overflow: hidden;
            white-space: nowrap;
            border-right: .15em solid orange;
            animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: var(--accent-color); }
        }
    `;
    document.head.appendChild(style);

    // Navigation hover effect on cursor
    const navLinks = document.querySelectorAll('.nav-links a, .btn, .logo');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.border = '1px solid white';
            cursor.style.backgroundColor = 'transparent';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.border = 'none';
            cursor.style.backgroundColor = '#ffffff';
        });
    });

    // 3D Tilt Effect for Stat Cards
    const cards = document.querySelectorAll('.stat-card, .gate-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});
