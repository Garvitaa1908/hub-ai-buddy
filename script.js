
// Global State Management
const AppState = {
    currentPage: 'dashboard',
    theme: localStorage.getItem('theme') || 'light',
    isLoggedIn: false,
    selectedBatch: localStorage.getItem('selectedBatch') || '',
    user: null,
    filters: {
        resources: {
            search: '',
            subject: 'all',
            type: 'all'
        },
        studyBuddy: {
            location: 'all',
            subject: 'all',
            year: 'all',
            gender: 'all',
            currentLocation: 'all'
        },
        attendance: {
            date: '',
            day: ''
        }
    },
    data: {
        resources: [
            {
                id: 1,
                title: 'Calculus Chapter 1-3 Notes',
                subject: 'Mathematics',
                type: 'Notes',
                author: 'Anonymous',
                uploadDate: '2 days ago',
                driveLink: 'https://drive.google.com/file/d/example1',
                description: 'Comprehensive notes covering limits, derivatives, and basic integration'
            },
            {
                id: 2,
                title: 'Physics Mid-term 2023',
                subject: 'Physics',
                type: 'Previous Papers',
                author: 'Anonymous',
                uploadDate: '1 week ago',
                driveLink: 'https://drive.google.com/file/d/example2',
                description: 'Previous year question paper with solutions'
            },
            {
                id: 3,
                title: 'Organic Chemistry Reactions',
                subject: 'Chemistry',
                type: 'Notes',
                author: 'Anonymous',
                uploadDate: '3 days ago',
                driveLink: 'https://drive.google.com/file/d/example3',
                description: 'Important organic reactions with mechanisms'
            },
            {
                id: 4,
                title: 'Data Structures Implementation',
                subject: 'Computer Science',
                type: 'Assignments',
                author: 'Anonymous',
                uploadDate: '5 days ago',
                driveLink: 'https://drive.google.com/file/d/example4',
                description: 'Complete implementation of basic data structures in C++'
            }
        ],
        studyBuddies: [
            {
                id: '1',
                name: 'Student A',
                status: 'Open to Study',
                subject: 'Mathematics',
                location: 'Library - 2nd Floor',
                timeRemaining: '2 hours left',
                year: '2nd Year',
                gender: 'Male'
            },
            {
                id: '2',
                name: 'Student B',
                status: 'Need Help',
                subject: 'Physics',
                location: 'Study Room A',
                timeRemaining: '1 hour left',
                year: '3rd Year',
                gender: 'Female'
            },
            {
                id: '3',
                name: 'Student C',
                status: 'Solo Focus',
                subject: 'Chemistry',
                location: 'Common Area',
                timeRemaining: '3 hours left',
                year: '1st Year',
                gender: 'Male'
            },
            {
                id: '4',
                name: 'Student D',
                status: 'Open to Study',
                subject: 'Computer Science',
                location: 'Library - 1st Floor',
                timeRemaining: '4 hours left',
                year: '4th Year',
                gender: 'Female'
            },
            {
                id: '5',
                name: 'Student E',
                status: 'Need Help',
                subject: 'Mathematics',
                location: 'Study Room B',
                timeRemaining: '1.5 hours left',
                year: '2nd Year',
                gender: 'Prefer not to say'
            },
            {
                id: '6',
                name: 'Student F',
                status: 'Open to Study',
                subject: 'Biology',
                location: 'Lab - 3rd Floor',
                timeRemaining: '2.5 hours left',
                year: '3rd Year',
                gender: 'Male'
            }
        ]
    }
};

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showToast(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    // In a real app, you'd show a toast notification
}

// Theme Management
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    updateThemeIcon();
}

function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    localStorage.setItem('theme', AppState.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = AppState.theme === 'light' ? '🌙' : '☀️';
    }
}

// Navigation Management
function initializeNavigation() {
    // Set initial page based on hash or default to dashboard
    const hash = window.location.hash.slice(1);
    if (hash && ['dashboard', 'resources', 'study-buddy', 'attendance'].includes(hash)) {
        AppState.currentPage = hash;
    }
    
    showPage(AppState.currentPage);
    updateActiveNavLink();

    // Handle nav link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            showPage(hash);
            AppState.currentPage = hash;
            updateActiveNavLink();
        }
    });
}

function navigateToPage(page) {
    if (page !== AppState.currentPage) {
        AppState.currentPage = page;
        window.location.hash = page;
        showPage(page);
        updateActiveNavLink();
    }
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Initialize page-specific functionality
    switch (pageId) {
        case 'resources':
            initializeResourcesPage();
            break;
        case 'study-buddy':
            initializeStudyBuddyPage();
            break;
        case 'attendance':
            initializeAttendancePage();
            break;
    }
}

function updateActiveNavLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === AppState.currentPage) {
            link.classList.add('active');
        }
    });
}

// Resources Page
function initializeResourcesPage() {
    renderResources();
    setupResourceFilters();
}

function setupResourceFilters() {
    const searchInput = document.getElementById('resourceSearch');
    const subjectFilter = document.getElementById('subjectFilter');
    const typeFilter = document.getElementById('typeFilter');

    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            AppState.filters.resources.search = e.target.value;
            renderResources();
        }, 300));
    }

    if (subjectFilter) {
        subjectFilter.addEventListener('change', (e) => {
            AppState.filters.resources.subject = e.target.value;
            renderResources();
        });
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            AppState.filters.resources.type = e.target.value;
            renderResources();
        });
    }
}

function renderResources() {
    const grid = document.getElementById('resourcesGrid');
    const countElement = document.getElementById('resourceCount');
    
    if (!grid) return;

    const filtered = AppState.data.resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(AppState.filters.resources.search.toLowerCase()) ||
                            resource.description.toLowerCase().includes(AppState.filters.resources.search.toLowerCase());
        const matchesSubject = AppState.filters.resources.subject === 'all' || resource.subject === AppState.filters.resources.subject;
        const matchesType = AppState.filters.resources.type === 'all' || resource.type === AppState.filters.resources.type;
        return matchesSearch && matchesSubject && matchesType;
    });

    if (countElement) {
        countElement.textContent = `${filtered.length} resources found`;
    }

    grid.innerHTML = filtered.map(resource => `
        <div class="resource-card" data-subject="${resource.subject}" data-type="${resource.type}">
            <div class="resource-header">
                <div>
                    <h3>${resource.title}</h3>
                    <div class="resource-tags">
                        <span class="tag purple">${resource.subject}</span>
                        <span class="tag blue">${resource.type}</span>
                    </div>
                </div>
                <div class="resource-icon">📄</div>
            </div>
            <p>${resource.description}</p>
            <div class="resource-meta">
                <span>👤 ${resource.author}</span>
                <span>📅 ${resource.uploadDate}</span>
            </div>
            <button class="resource-link" onclick="window.open('${resource.driveLink}', '_blank')">
                <span>🔗</span> Open in Drive
            </button>
        </div>
    `).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📚</div>
                <p style="font-size: 1.125rem; color: var(--text-gray); margin-bottom: 0.5rem;">No resources found</p>
                <p style="color: var(--text-gray);">Try adjusting your filters or be the first to share!</p>
            </div>
        `;
    }
}

// Study Buddy Page
function initializeStudyBuddyPage() {
    renderStudyBuddies();
    setupStudyBuddyFilters();
    setupStatusButtons();
}

function setupStatusButtons() {
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`Status updated to: ${btn.getAttribute('data-status')}`);
        });
    });
}

function setupStudyBuddyFilters() {
    const locationFilter = document.getElementById('locationFilter');
    const subjectFilter = document.getElementById('buddySubjectFilter');
    const yearFilter = document.getElementById('yearFilter');
    const genderFilter = document.getElementById('genderFilter');
    const currentLocationFilter = document.getElementById('currentLocationFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');

    [locationFilter, subjectFilter, yearFilter, genderFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                updateStudyBuddyFilters();
                renderStudyBuddies();
            });
        }
    });

    if (currentLocationFilter) {
        currentLocationFilter.addEventListener('input', debounce(() => {
            updateStudyBuddyFilters();
            renderStudyBuddies();
        }, 300));
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearStudyBuddyFilters);
    }
}

function updateStudyBuddyFilters() {
    AppState.filters.studyBuddy.location = document.getElementById('locationFilter')?.value || 'all';
    AppState.filters.studyBuddy.subject = document.getElementById('buddySubjectFilter')?.value || 'all';
    AppState.filters.studyBuddy.year = document.getElementById('yearFilter')?.value || 'all';
    AppState.filters.studyBuddy.gender = document.getElementById('genderFilter')?.value || 'all';
    AppState.filters.studyBuddy.currentLocation = document.getElementById('currentLocationFilter')?.value || 'all';
}

function clearStudyBuddyFilters() {
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('buddySubjectFilter').value = 'all';
    document.getElementById('yearFilter').value = 'all';
    document.getElementById('genderFilter').value = 'all';
    document.getElementById('currentLocationFilter').value = '';
    
    AppState.filters.studyBuddy = {
        location: 'all',
        subject: 'all',
        year: 'all',
        gender: 'all',
        currentLocation: 'all'
    };
    
    renderStudyBuddies();
}

function renderStudyBuddies() {
    const grid = document.getElementById('buddyGrid');
    if (!grid) return;

    const filtered = AppState.data.studyBuddies.filter(buddy => {
        const matchesLocation = AppState.filters.studyBuddy.location === 'all' || buddy.location === AppState.filters.studyBuddy.location;
        const matchesSubject = AppState.filters.studyBuddy.subject === 'all' || buddy.subject === AppState.filters.studyBuddy.subject;
        const matchesYear = AppState.filters.studyBuddy.year === 'all' || buddy.year === AppState.filters.studyBuddy.year;
        const matchesGender = AppState.filters.studyBuddy.gender === 'all' || buddy.gender === AppState.filters.studyBuddy.gender;
        const matchesCurrentLocation = AppState.filters.studyBuddy.currentLocation === 'all' || 
                                     AppState.filters.studyBuddy.currentLocation === '' ||
                                     buddy.location.toLowerCase().includes(AppState.filters.studyBuddy.currentLocation.toLowerCase());
        return matchesLocation && matchesSubject && matchesYear && matchesGender && matchesCurrentLocation;
    });

    grid.innerHTML = filtered.map(buddy => {
        const statusClass = buddy.status === 'Open to Study' ? 'open' : 
                           buddy.status === 'Need Help' ? 'help' : 'solo';
        const initials = buddy.name.split(' ').map(n => n[0]).join('');
        const canConnect = buddy.status !== 'Solo Focus';
        
        return `
            <div class="buddy-card" data-location="${buddy.location}" data-subject="${buddy.subject}" data-year="${buddy.year}" data-gender="${buddy.gender}">
                <div class="buddy-header">
                    <div class="buddy-avatar">${initials}</div>
                    <div class="buddy-info">
                        <h3>${buddy.name}</h3>
                        <p>${buddy.subject}</p>
                        <small>${buddy.year}</small>
                    </div>
                </div>
                <div class="buddy-status ${statusClass}">${buddy.status}</div>
                <div class="buddy-details">
                    <div class="buddy-detail">
                        <span>📍</span> ${buddy.location}
                    </div>
                    <div class="buddy-detail">
                        <span>⏰</span> ${buddy.timeRemaining}
                    </div>
                </div>
                ${canConnect ? `
                    <button class="connect-btn" onclick="connectToBuddy('${buddy.id}')">
                        <span>💬</span> Connect
                    </button>
                ` : ''}
            </div>
        `;
    }).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">👥</div>
                <p style="font-size: 1.125rem; color: var(--text-gray); margin-bottom: 0.5rem;">No study buddies found</p>
                <p style="color: var(--text-gray);">Try adjusting your filters or check back later</p>
            </div>
        `;
    }
}

function connectToBuddy(buddyId) {
    const buddy = AppState.data.studyBuddies.find(b => b.id === buddyId);
    if (buddy) {
        showToast(`Connecting to ${buddy.name}...`, 'success');
    }
}

// Attendance Page
function initializeAttendancePage() {
    const batchSelect = document.getElementById('batchSelect');
    const batchSelection = document.getElementById('batchSelection');
    const attendanceContent = document.getElementById('attendanceContent');
    const selectedBatchText = document.getElementById('selectedBatchText');

    // Show batch selection if no batch is selected
    if (!AppState.selectedBatch) {
        if (batchSelection) batchSelection.style.display = 'flex';
        if (attendanceContent) attendanceContent.style.display = 'none';
    } else {
        if (batchSelection) batchSelection.style.display = 'none';
        if (attendanceContent) attendanceContent.style.display = 'block';
        if (selectedBatchText) selectedBatchText.textContent = `Batch: ${AppState.selectedBatch}`;
        setupAttendanceFilters();
        renderTimetable();
    }

    // Handle batch selection
    if (batchSelect) {
        batchSelect.value = AppState.selectedBatch;
        batchSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                AppState.selectedBatch = e.target.value;
                localStorage.setItem('selectedBatch', AppState.selectedBatch);
                if (batchSelection) batchSelection.style.display = 'none';
                if (attendanceContent) attendanceContent.style.display = 'block';
                if (selectedBatchText) selectedBatchText.textContent = `Batch: ${AppState.selectedBatch}`;
                setupAttendanceFilters();
                renderTimetable();
            }
        });
    }

    // Handle change batch button
    const changeBatchBtn = document.getElementById('changeBatchBtn');
    if (changeBatchBtn) {
        changeBatchBtn.addEventListener('click', () => {
            AppState.selectedBatch = '';
            localStorage.removeItem('selectedBatch');
            if (batchSelection) batchSelection.style.display = 'flex';
            if (attendanceContent) attendanceContent.style.display = 'none';
            if (batchSelect) batchSelect.value = '';
        });
    }

    // Handle add class button
    const addClassBtn = document.getElementById('addClassBtn');
    if (addClassBtn) {
        addClassBtn.addEventListener('click', () => {
            showToast('Add Class functionality would open a form here', 'info');
        });
    }
}

function setupAttendanceFilters() {
    const dateInput = document.getElementById('attendanceDate');
    const daySelect = document.getElementById('attendanceDay');
    const resetBtn = document.getElementById('resetFilters');

    if (dateInput) {
        dateInput.addEventListener('change', () => {
            AppState.filters.attendance.date = dateInput.value;
            updateActiveFilters();
            renderTimetable();
        });
    }

    if (daySelect) {
        daySelect.addEventListener('change', () => {
            AppState.filters.attendance.day = daySelect.value;
            updateActiveFilters();
            renderTimetable();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (dateInput) dateInput.value = '';
            if (daySelect) daySelect.value = '';
            AppState.filters.attendance = { date: '', day: '' };
            updateActiveFilters();
            renderTimetable();
        });
    }
}

function updateActiveFilters() {
    const activeFilters = document.getElementById('activeFilters');
    const filterTags = document.getElementById('filterTags');
    
    if (!activeFilters || !filterTags) return;

    const hasFilters = AppState.filters.attendance.date || AppState.filters.attendance.day;
    
    if (hasFilters) {
        activeFilters.style.display = 'block';
        let tags = [];
        
        if (AppState.filters.attendance.date) {
            const formattedDate = new Date(AppState.filters.attendance.date).toLocaleDateString();
            tags.push(`<span class="filter-tag">Date: ${formattedDate}</span>`);
        }
        
        if (AppState.filters.attendance.day) {
            tags.push(`<span class="filter-tag">Day: ${AppState.filters.attendance.day}</span>`);
        }
        
        filterTags.innerHTML = tags.join('');
    } else {
        activeFilters.style.display = 'none';
    }
}

function renderTimetable() {
    const timetableGrid = document.getElementById('timetableGrid');
    if (!timetableGrid) return;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = AppState.filters.attendance.day;

    // Show only selected day or all days
    const daysToShow = selectedDay ? [selectedDay] : days;

    // Hide all day columns first
    document.querySelectorAll('.day-column').forEach(col => {
        const day = col.getAttribute('data-day');
        if (daysToShow.includes(day)) {
            col.style.display = 'block';
        } else {
            col.style.display = 'none';
        }
    });

    // Setup attendance button handlers
    document.querySelectorAll('.att-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const classItem = e.target.closest('.class-item');
            const status = e.target.getAttribute('data-status');
            
            // Remove active class from all buttons in this class item
            classItem.querySelectorAll('.att-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Update status icon
            const statusIcon = classItem.querySelector('.status-icon');
            if (statusIcon) {
                const icons = {
                    'attending': '✅',
                    'missed': '❌',
                    'cancelled': '⏰',
                    'proxy': '👥'
                };
                statusIcon.textContent = icons[status] || '⏰';
            }
            
            const subject = classItem.getAttribute('data-subject');
            const time = classItem.getAttribute('data-time');
            showToast(`${subject} (${time}): ${status}`, 'success');
        });
    });
}

// Modal Management
function initializeModals() {
    const loginModal = document.getElementById('loginModal');
    const resourceModal = document.getElementById('resourceModal');
    const userBtn = document.getElementById('userBtn');
    const shareResourceBtn = document.getElementById('shareResourceBtn');

    // User button click
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            if (AppState.isLoggedIn) {
                showToast('User menu would open here', 'info');
            } else {
                showModal('loginModal');
            }
        });
    }

    // Share resource button click
    if (shareResourceBtn) {
        shareResourceBtn.addEventListener('click', () => {
            showModal('resourceModal');
        });
    }

    // Close button handlers
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            hideModal(modal.id);
        });
    });

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                AppState.isLoggedIn = true;
                AppState.user = { email, name: email.split('@')[0] };
                hideModal('loginModal');
                showToast('Login successful!', 'success');
                loginForm.reset();
            }
        });
    }

    // Resource form
    const resourceForm = document.getElementById('resourceForm');
    if (resourceForm) {
        resourceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('resourceTitle').value;
            const subject = document.getElementById('resourceSubject').value;
            const type = document.getElementById('resourceType').value;
            const link = document.getElementById('resourceLink').value;
            const description = document.getElementById('resourceDescription').value;
            
            if (title && subject && type && link) {
                const newResource = {
                    id: Date.now(),
                    title,
                    subject,
                    type,
                    driveLink: link,
                    description: description || 'No description provided',
                    author: 'Anonymous',
                    uploadDate: 'Just now'
                };
                
                AppState.data.resources.unshift(newResource);
                hideModal('resourceModal');
                showToast('Resource shared successfully!', 'success');
                resourceForm.reset();
                
                if (AppState.currentPage === 'resources') {
                    renderResources();
                }
            }
        });
    }

    // Cancel resource button
    const cancelResourceBtn = document.getElementById('cancelResource');
    if (cancelResourceBtn) {
        cancelResourceBtn.addEventListener('click', () => {
            hideModal('resourceModal');
        });
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 HostelHub+ Initialized');
    
    initializeTheme();
    initializeNavigation();
    initializeModals();
    initializeMobileMenu();
    
    // Theme toggle handler
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Notification handler
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            showToast('No new notifications', 'info');
        });
    }
});

// Global functions for inline event handlers
window.connectToBuddy = connectToBuddy;
