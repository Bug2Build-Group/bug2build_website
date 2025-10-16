// Events page JavaScript for filtering, sorting, searching, and tabs

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const eventsList = document.getElementById('events-list');
    const eventCards = Array.from(document.querySelectorAll('.event-card'));
    const tabButtons = document.querySelectorAll('.tab-btn');

    let currentTab = 'all'; // Default tab

    // Function to classify events based on date
    function classifyEvent(card) {
        const eventDate = new Date(card.dataset.date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);

        const eventTypeElement = card.querySelector('.event-type');

        if (eventDate.toDateString() === now.toDateString()) {
            // Ongoing: today
            eventTypeElement.className = 'event-type ongoing';
            eventTypeElement.textContent = 'Ongoing';
            return 'ongoing';
        } else if (eventDate < now) {
            // Past
            eventTypeElement.className = 'event-type past';
            eventTypeElement.textContent = 'Past';
            return 'past';
        } else {
            // Upcoming
            eventTypeElement.className = 'event-type upcoming';
            eventTypeElement.textContent = 'Upcoming';
            return 'upcoming';
        }
    }

    // Function to update highlight classes based on current date
    function updateEventHighlights() {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Set to start of day for comparison

        eventCards.forEach(card => {
            const eventDate = new Date(card.dataset.date);
            eventDate.setHours(0, 0, 0, 0);

            if (eventDate >= now) {
                card.classList.add('highlight-event');
            } else {
                card.classList.remove('highlight-event');
            }
        });
    }

    // Function to show events based on tab
    function showEventsForTab(tab) {
        eventCards.forEach(card => {
            const classification = classifyEvent(card);
            if (tab === 'all' || classification === tab) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to filter and sort events
    function filterAndSortEvents() {
        const searchTerm = searchInput.value.toLowerCase();
        const sortBy = sortSelect.value;
        const dateFrom = dateFromInput.value ? new Date(dateFromInput.value) : null;
        const dateTo = dateToInput.value ? new Date(dateToInput.value) : null;

        let filteredEvents = eventCards.filter(card => {
            const title = card.dataset.title.toLowerCase();
            const date = new Date(card.dataset.date);

            // Search filter
            const matchesSearch = title.includes(searchTerm);

            // Date range filter
            const matchesDateFrom = !dateFrom || date >= dateFrom;
            const matchesDateTo = !dateTo || date <= dateTo;

            return matchesSearch && matchesDateFrom && matchesDateTo;
        });

        // Sort events
        filteredEvents.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            const titleA = a.dataset.title.toLowerCase();
            const titleB = b.dataset.title.toLowerCase();

            switch (sortBy) {
                case 'date-asc':
                    return dateA - dateB;
                case 'date-desc':
                    return dateB - dateA;
                case 'name-asc':
                    return titleA.localeCompare(titleB);
                case 'name-desc':
                    return titleB.localeCompare(titleA);
                default:
                    return 0;
            }
        });

        // Clear current events
        eventsList.innerHTML = '';

        // Add filtered and sorted events
        if (filteredEvents.length === 0) {
            eventsList.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
        } else {
            filteredEvents.forEach(card => {
                eventsList.appendChild(card);
            });
        }

        // Update highlights after filtering/sorting
        updateEventHighlights();
    }

    // Function to clear all filters
    function clearFilters() {
        searchInput.value = '';
        sortSelect.value = 'date-asc';
        dateFromInput.value = '';
        dateToInput.value = '';
        filterAndSortEvents();
    }

    // Tab event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current tab
            currentTab = this.dataset.tab;
            // Show events for selected tab
            showEventsForTab(currentTab);
            // Re-apply filters and sorting
            filterAndSortEvents();
        });
    });

    // Event listeners
    searchInput.addEventListener('input', filterAndSortEvents);
    sortSelect.addEventListener('change', filterAndSortEvents);
    dateFromInput.addEventListener('change', filterAndSortEvents);
    dateToInput.addEventListener('change', filterAndSortEvents);
    clearFiltersBtn.addEventListener('click', clearFilters);

    // Modal functionality (REPLACED: improved structure, fallbacks, close on Esc)
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button class="modal-close" aria-label="Close">&times;</button>

            <div class="modal-body">
                <h2 id="modal-title" class="modal-title"></h2>

                <div class="modal-image-wrap" aria-hidden="false">
                    <img class="modal-image" src="" alt="">
                </div>

                <div class="modal-description"></div>

                <div class="modal-contact" style="display:none;">
                    <h3 class="modal-contact-title">Event Coordinator</h3>
                    <p><strong>Name:</strong> <span class="modal-coordinator-name"></span></p>
                    <p><strong>Email:</strong> <span class="modal-coordinator-email"></span></p>
                    <p><strong>Phone:</strong> <span class="modal-coordinator-phone"></span></p>
                </div>

                <div class="modal-help" style="display:none;">
                    <h3 class="modal-help-title">Need help?</h3>
                    <p class="modal-help-text">Contact us at <a href="mailto:contact@bug2build.in">contact@bug2build.in</a> for any queries.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalTitle = modal.querySelector('.modal-title');
    const modalImageWrap = modal.querySelector('.modal-image-wrap');
    const modalImage = modal.querySelector('.modal-image');
    const modalDescription = modal.querySelector('.modal-description');
    const modalContactSection = modal.querySelector('.modal-contact');
    const modalCoordinatorName = modal.querySelector('.modal-coordinator-name');
    const modalCoordinatorEmail = modal.querySelector('.modal-coordinator-email');
    const modalCoordinatorPhone = modal.querySelector('.modal-coordinator-phone');
    const modalHelpSection = modal.querySelector('.modal-help');
    const modalHelpText = modal.querySelector('.modal-help-text');
    const closeBtn = modal.querySelector('.modal-close');

    // Function to open modal with event details (improved formatting + fallbacks)
    function openModal(eventCard) {
        const title = eventCard.dataset.title || eventCard.querySelector('h3')?.textContent || 'Event';
        const dateText = eventCard.querySelector('.event-date')?.textContent || '';
        const description = eventCard.querySelector('p')?.textContent || '';
        const imageSrc = eventCard.dataset.image || eventCard.querySelector('img')?.src || '';
        const coordinatorName = eventCard.dataset.coordinatorName || eventCard.dataset.coordinator || '';
        const coordinatorContact = eventCard.dataset.coordinatorContact || eventCard.dataset.contact || '';
        const helpText = eventCard.dataset.help || '';

        // Title
        modalTitle.textContent = title;

        // Image: show if present, otherwise hide the image area (keeps layout consistent)
        if (imageSrc) {
            modalImage.src = imageSrc;
            modalImage.alt = title + ' image';
            modalImageWrap.style.display = '';
            modalImageWrap.setAttribute('aria-hidden', 'false');
        } else {
            modalImage.src = '';
            modalImage.alt = '';
            modalImageWrap.style.display = 'none';
            modalImageWrap.setAttribute('aria-hidden', 'true');
        }

        // Description (keeps line breaks)
        modalDescription.textContent = description;
        if (dateText) {
            // add date line above description for clarity
            modalDescription.innerHTML = `<div class="modal-date"><i class="fas fa-calendar-alt"></i> ${dateText}</div><div class="modal-desc-text">${escapeHtml(description)}</div>`;
        }

        // Coordinator info: show only if any coordinator data exists
        if (coordinatorName || coordinatorContact) {
            modalCoordinatorName.textContent = coordinatorName || 'John Doe';
            modalCoordinatorEmail.textContent = coordinatorContact.includes('@') ? coordinatorContact : 'coordinator@bug2build.in';
            modalCoordinatorPhone.textContent = coordinatorContact.match(/\+?\d[\d\s-]{6,}\d/) ? coordinatorContact : '+91 98765 43210';
            modalContactSection.style.display = '';
        } else {
            modalContactSection.style.display = 'none';
        }

        // Help section
        if (helpText) {
            modalHelpText.textContent = helpText;
            modalHelpSection.style.display = '';
        } else {
            modalHelpSection.style.display = 'none';
        }

        // show modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        // focus for accessibility
        closeBtn.focus();
    }

    // Utility to format contact (auto-link email or phone)
    function formatContact(text) {
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
        const telRegex = /(\+?\d[\d\s-]{6,}\d)/;
        if (emailRegex.test(text)) {
            const email = text.match(emailRegex)[0];
            return `<a href="mailto:${email}">${email}</a>`;
        } else if (telRegex.test(text)) {
            const tel = text.match(telRegex)[0].replace(/\s+/g, '');
            return `<a href="tel:${tel}">${text}</a>`;
        }
        return escapeHtml(text);
    }

    // Basic HTML escape to avoid accidental HTML injection from dataset values
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function (m) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
        });
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Expand button functionality (opens modal)
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const eventCard = this.closest('.event-card');
            openModal(eventCard);
        });
    });

    // Click anywhere on event card to open modal (except expand button)
    eventCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Prevent modal opening if clicking on expand button (handled above)
            if (!event.target.closest('.expand-btn')) {
                openModal(this);
            }
        });
    });

    // Initialize with default tab and sorting
    showEventsForTab(currentTab);
    updateEventHighlights();
    filterAndSortEvents();
});
