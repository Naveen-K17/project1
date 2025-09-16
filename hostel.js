document.addEventListener('DOMContentLoaded', () => {
    const hostelPriorityForm = document.getElementById('hostel-priority-form');
    const hostels = ["Boys Hostel A", "Boys Hostel B", "Girls Hostel A", "Girls Hostel B"];
    const selectElements = document.querySelectorAll('.priority-group select');

    // Function to populate dropdowns
    function populateDropdowns() {
        selectElements.forEach(select => {
            select.innerHTML = '<option value="">Select Hostel</option>';
            hostels.forEach(hostel => {
                const option = document.createElement('option');
                option.value = hostel;
                option.textContent = hostel;
                select.appendChild(option);
            });
        });
    }

    // Event listener for dropdown changes
    selectElements.forEach(select => {
        select.addEventListener('change', () => {
            const selectedHostels = Array.from(selectElements).map(s => s.value).filter(Boolean);
            selectElements.forEach(s => {
                Array.from(s.options).forEach(option => {
                    if (selectedHostels.includes(option.value) && option.value !== s.value) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }
                });
            });
        });
    });

    // Handle form submission
    hostelPriorityForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents default form submission

        const selectedPriorities = Array.from(selectElements).map(select => select.value);
        const uniquePriorities = new Set(selectedPriorities.filter(p => p !== ''));
        
        if (selectedPriorities.length !== uniquePriorities.size) {
            alert("Please select each hostel only once.");
            return;
        }

        console.log("Submitted Hostel Priorities:", selectedPriorities);

        const applicationCard = document.getElementById('hostel-card');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `<p>Hostel application submitted successfully! ✅</p>`;

        applicationCard.innerHTML = '';
        applicationCard.appendChild(successMessage);
    });

    // Initial population of dropdowns
    populateDropdowns();

    // Mobile menu toggle (copied from original script.js)
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});