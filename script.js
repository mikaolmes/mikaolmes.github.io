document.addEventListener('DOMContentLoaded', () => {
    const scrollContainers = document.querySelectorAll('.scroll-text-container');
    const aboutBox = document.querySelector('.box-about');
    const boxes = document.querySelectorAll('[class^="box-"]');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const backToTopBtn = document.querySelector('.back-to-top');
    const projectLinks = document.querySelectorAll('.project-box');
    const socialLinks = document.querySelectorAll('.box-socials a');
    const sections = document.querySelectorAll('.full-section');
    const themeSwitch = document.querySelector('.theme-switch');
    
    let lastScroll = 0;
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (document.querySelector('.theme-switch i')) {
            document.querySelector('.theme-switch i').classList.remove('fa-moon');
            document.querySelector('.theme-switch i').classList.add('fa-sun');
        }
    }
    
    // Theme switcher functionality
    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            
            // Update icon
            const icon = themeSwitch.querySelector('i');
            if (icon) {
                if (currentTheme === 'dark') {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }
    
    // Store initial page position
    const initialPosition = window.scrollY;
    
    // Pre-expansion effect for about box
    const checkScroll = () => {
        const currentScroll = window.scrollY;
        const triggerPoint = window.innerHeight * 0.2;
        
        if (aboutBox) {
            if (currentScroll > triggerPoint * 0.5) {
                aboutBox.classList.add('pre-expand');
            } else {
                aboutBox.classList.remove('pre-expand');
            }
        }
        
        // Show/hide back to top button
        if (backToTopBtn) {
            if (currentScroll > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }
        
        // Update active state in table of contents
        updateActiveSection();
        
        lastScroll = currentScroll;
    };
    
    // Update active section in table of contents
    const updateActiveSection = () => {
        // Get current scroll position plus some offset to handle section transitions better
        const currentPos = window.scrollY + window.innerHeight / 3;
        
        // Clear all active states
        tocLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Set active state based on current position
        const topLink = document.querySelector('.table-of-contents a[href="#top"]');
        if (currentPos < window.innerHeight && topLink) {
            // We're at the top
            topLink.classList.add('active');
        } else {
            // Check each section
            let activeSection = null;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (currentPos >= sectionTop && currentPos <= sectionBottom) {
                    activeSection = section.getAttribute('id');
                }
            });
            
            if (activeSection) {
                const activeLink = document.querySelector(`.table-of-contents a[href="#${activeSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    };

    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Setup section navigation - scroll to sections
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const targetId = box.dataset.section;
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to the section smoothly
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle project links to prevent default behavior and open in new tab
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Stop event propagation to prevent triggering parent box click
            e.stopPropagation();
            const url = link.getAttribute('href');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
    
    // Handle social links to open in new tab and prevent default behavior
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Stop event propagation to prevent triggering parent box click
            e.stopPropagation();
            const url = link.getAttribute('href');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
    
    // Smooth scrolling for table of contents links
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Smooth scrolling for back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initially hide back to top button
        backToTopBtn.style.display = 'none';
    }
    
    // Listen for history changes to restore position
    window.addEventListener('popstate', function(event) {
        // Return to top when coming back from external links
        window.scrollTo(0, 0);
    });
    
    // Initial active section
    updateActiveSection();
    
    // Update user info if available
    const userInfoElement = document.querySelector('.user-info');
    if (userInfoElement) {
        const timeElement = userInfoElement.querySelector('.time');
        if (timeElement) {
            timeElement.textContent = `Date: ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`;
        }
    }
});
