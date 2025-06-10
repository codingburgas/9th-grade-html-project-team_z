document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Theme Toggle ---
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save theme preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Change icon to sun
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Change icon to moon
        }
    });

    // Apply saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Set sun icon
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Set moon icon
    }

    // Set active class for the current page's nav link
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // If current path is empty (e.g., just / or /index.html), make 'Начало' active
    if (currentPath === '' || currentPath === 'index.html') {
        document.querySelector('.main-nav ul li a[data-section="home"]')?.classList.add('active');
    }
});