document.addEventListener('DOMContentLoaded', () => {
    // --- STICKY HEADER ON SCROLL ---
    const header = document.querySelector('header');

    // --- SCROLL REVEAL (IntersectionObserver) ---
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    // --- SCROLL TO TOP BUTTON ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate burger menu
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translate(6px, 6px)' 
            : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') 
            ? '0' 
            : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translate(6px, -7px)' 
            : 'none';
    });

    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            // Reset burger icons
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- ACTIVE LINK SELECTION ON SCROLL ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- CONTACT FORM INTEGRATION WITH WHATSAPP ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const origin = document.getElementById('origin').value;
            const destination = document.getElementById('destination').value;
            const details = document.getElementById('details').value;
            
            // Format WhatsApp Message
            const whatsappText = `Olá Milene Transportes! Gostaria de fazer um orçamento.%0A%0A` +
                `*Nome:* ${encodeURIComponent(name)}%0A` +
                `*Telefone:* ${encodeURIComponent(phone)}%0A` +
                `*Origem:* ${encodeURIComponent(origin)}%0A` +
                `*Destino:* ${encodeURIComponent(destination)}%0A` +
                `*Detalhes da Carga:* ${encodeURIComponent(details)}`;
                
            // Open WhatsApp in new tab with the real number
            const whatsappNumber = '559991742625';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});
