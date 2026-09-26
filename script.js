document.addEventListener("DOMContentLoaded", () => {
    loadSkills();
    loadProjects('all');
    setupFilterButtons();
    setupMobileMenu();
    setupThemeToggle();
});

// Load Skills
function loadSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;

    grid.innerHTML = skillsData.map(skill => `
        <div class="dynamic-card p-6 flex items-start gap-4">
            <!-- Icon Container -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 border shrink-0" style="background-color: var(--bg-main); border-color: var(--border-color);">
                <img src="${skill.icon}" alt="${skill.name}" class="w-full h-full object-contain">
            </div>
            
            <!-- Skill Info & Description -->
            <div class="space-y-1">
                <div class="flex items-center justify-between gap-2">
                    <h4 class="text-lg font-bold" style="color: var(--text-primary);">${skill.name}</h4>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full" style="background-color: var(--accent-light); color: var(--accent);">${skill.level}</span>
                </div>
                <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">${skill.description}</p>
            </div>
        </div>
    `).join('');
}

// Load Projects with GitHub Links
function loadProjects(filter) {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(project => `
        <div class="dynamic-card overflow-hidden group flex flex-col justify-between">
            <div>
                <div class="h-60 overflow-hidden relative">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="p-6 md:p-8 space-y-4">
                    <div class="flex flex-wrap gap-2">
                        ${project.tags.map(tag => `<span class="px-2.5 py-1 text-xs font-semibold rounded-md" style="background-color: var(--accent-light); color: var(--accent);">${tag}</span>`).join('')}
                    </div>
                    <h4 class="text-2xl font-bold" style="color: var(--text-primary);">${project.title}</h4>
                    <p class="text-sm leading-relaxed" style="color: var(--text-secondary);">${project.description}</p>
                </div>
            </div>

            <!-- Project Actions / GitHub Button -->
            <div class="px-6 pb-6 md:px-8 md:pb-8 pt-0 flex items-center justify-between border-t mt-4" style="border-color: var(--border-color);">
                <a href="${project.liveUrl}" target="_blank" class="text-sm font-semibold hover:underline pt-4 flex items-center gap-1" style="color: var(--accent);">
                    Live Demo &rarr;
                </a>
                <a href="${project.githubUrl}" target="_blank" class="flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-medium transition-all hover:opacity-80 pt-4" style="background-color: var(--bg-main); border-color: var(--border-color); color: var(--text-primary);" title="View Source on GitHub">
                    <!-- GitHub SVG Icon -->
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Source Code
                </a>
            </div>
        </div>
    `).join('');
}
// Filter buttons
function setupFilterButtons() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            buttons.forEach(b => {
                b.style.backgroundColor = 'var(--border-color)';
                b.style.color = 'var(--text-secondary)';
            });
            e.target.style.backgroundColor = 'var(--accent)';
            e.target.style.color = 'white';
            
            loadProjects(e.target.getAttribute("data-filter"));
        });
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });

    // Hide menu when clicking a link
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.add("hidden");
        });
    });
}

// Theme Toggle (Light/Dark)
function setupThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (toggleBtn) toggleBtn.textContent = "☀️";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        if (toggleBtn) toggleBtn.textContent = "🌙";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            let theme = document.documentElement.getAttribute("data-theme");
            if (theme === "dark") {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "🌙";
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                toggleBtn.textContent = "☀️";
            }
        });
    }
}

// Handle Mail Submission
function handleSendMail(event) {
    event.preventDefault();
    const name = document.getElementById("sender-name").value;
    const email = document.getElementById("sender-email").value;
    const subject = document.getElementById("sender-subject").value;
    const message = document.getElementById("sender-message").value;

    const recipient = "alex.morgan@developer.io";
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
}