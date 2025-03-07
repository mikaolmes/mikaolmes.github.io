document.addEventListener('DOMContentLoaded', () => {
    const scrollContainers = document.querySelectorAll('.scroll-text-container');
    const aboutBox = document.querySelector('.box-about');
    let lastScroll = 0;
    
    const checkScroll = () => {
        const currentScroll = window.scrollY;
        const triggerPoint = window.innerHeight * 0.2;
        
        // Pre-expansion effect
        if (currentScroll > triggerPoint * 0.5) {
            aboutBox.classList.add('pre-expand');
        } else {
            aboutBox.classList.remove('pre-expand');
        }
        
        lastScroll = currentScroll;
    };

    // Click handler for the about box
    aboutBox.addEventListener('click', () => {
        // Scroll to where the expanded box would be
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Setup section navigation
    const boxes = document.querySelectorAll('.box-about, .box-projects, .box-socials, .box-motivation');
    
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const targetSection = document.getElementById(box.dataset.section);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth'
                });
            }
        });
    });
});