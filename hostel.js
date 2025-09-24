let currentStudent = null;
let hostels = [
    {
        id: 1,
        name: "Sunrise Hostel",
        details: "Boys hostel with AC facilities, Wi-Fi, and 24/7 security"
    },
    {
        id: 2,
        name: "Moonlight Hostel",
        details: "Girls hostel with modern amenities, study rooms, and mess facility"
    },
    {
        id: 3,
        name: "Highland Hostel",
        details: "Co-ed hostel with gym, library, and recreational facilities"
    },
    {
        id: 4,
        name: "Valley View Hostel",
        details: "Boys hostel with mountain view, sports complex, and dining hall"
    },
    {
        id: 5,
        name: "Garden Hostel",
        details: "Girls hostel with garden view, yoga center, and cafeteria"
    },
    {
        id: 6,
        name: "Central Hostel",
        details: "Co-ed hostel in campus center with easy access to all facilities"
    }
];

// DOM elements
const loginForm = document.getElementById('loginForm');
const hostelSelection = document.getElementById('hostelSelection');
const successModal = document.getElementById('successModal');

// Login functionality
function handleLogin(event) {
    event.preventDefault();
    
    const studentName = document.getElementById('studentName').value.trim();
    const srn = document.getElementById('srn').value.trim();
    
    if (!studentName || !srn) {
        alert('Please fill in all fields');
        return;
    }
    
    currentStudent = { name: studentName, srn: srn };
    
    // Hide login form and show hostel selection
    loginForm.style.display = 'none';
    hostelSelection.style.display = 'block';
    
    // Update student display
    document.getElementById('studentDisplay').textContent = `${studentName} (${srn})`;
    
    // Render hostel list
    renderHostelList();
}

// Logout functionality
function handleLogout() {
    currentStudent = null;
    loginForm.style.display = 'block';
    hostelSelection.style.display = 'none';
    
    // Clear form
    document.getElementById('studentName').value = '';
    document.getElementById('srn').value = '';
}

// Render hostel list
function renderHostelList() {
    const hostelList = document.getElementById('hostelList');
    hostelList.innerHTML = '';
    
    hostels.forEach((hostel, index) => {
        const hostelItem = document.createElement('div');
        hostelItem.className = 'hostel-item';
        hostelItem.innerHTML = `
            <div class="priority-number">${index + 1}</div>
            <div class="hostel-info">
                <div class="hostel-name">${hostel.name}</div>
                <div class="hostel-details">${hostel.details}</div>
            </div>
            <div class="hostel-actions">
                <button class="move-btn" onclick="moveHostel(${index}, -1)" ${index === 0 ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"/>
                    </svg>
                </button>
                <button class="move-btn" onclick="moveHostel(${index}, 1)" ${index === hostels.length - 1 ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </button>
            </div>
        `;
        hostelList.appendChild(hostelItem);
    });
}

// Move hostel in priority list
function moveHostel(index, direction) {
    const newIndex = index + direction;
    
    if (newIndex < 0 || newIndex >= hostels.length) {
        return;
    }
    
    // Swap hostels
    [hostels[index], hostels[newIndex]] = [hostels[newIndex], hostels[index]];
    
    // Re-render list
    renderHostelList();
}

// Submit application
function submitApplication() {
    if (!currentStudent) {
        alert('Please login first');
        return;
    }
    
    // Show success modal with final preferences
    const finalPreferences = document.getElementById('finalPreferences');
    finalPreferences.innerHTML = '';
    
    hostels.forEach((hostel, index) => {
        const li = document.createElement('li');
        li.textContent = hostel.name;
        finalPreferences.appendChild(li);
    });
    
    successModal.style.display = 'flex';
    
    // You can add code here to send the data to a server
    console.log('Application submitted:', {
        student: currentStudent,
        preferences: hostels.map((hostel, index) => ({
            priority: index + 1,
            hostel: hostel
        }))
    });
}

// Close modal
function closeModal() {
    successModal.style.display = 'none';
    // Optionally redirect or reset the form
    handleLogout();
}