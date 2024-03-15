document.addEventListener('DOMContentLoaded', () => {
    const emergencyNumberInput = document.getElementById('emergency-number');
    const feedback = document.getElementById('feedback');
    const profileNameInput = document.getElementById('profile-name');
    const profileSection = document.getElementById('profile-section');

    // Load profile name and emergency number from localStorage
    const savedProfileName = localStorage.getItem('profileName');
    if (savedProfileName) {
        profileNameInput.value = savedProfileName;
        profileSection.style.display = 'none';
    }
    const savedEmergencyNumber = localStorage.getItem('emergencyNumber');
    if (savedEmergencyNumber) {
        emergencyNumberInput.value = savedEmergencyNumber;
    }

    document.getElementById('save-profile').addEventListener('click', () => {
        saveProfileName();
    });

    document.getElementById('save-emergency').addEventListener('click', () => {
        saveEmergencyNumber();
    });

    document.getElementById('panic-button').addEventListener('click', () => {
        // Trigger SOS alert
        triggerSOS();
    });

    function saveProfileName() {
        const profileName = profileNameInput.value.trim();
        if (!profileName) {
            showError('Please enter your name.');
            return;
        }
        localStorage.setItem('profileName', profileName);
        profileSection.style.display = 'none';
        showSuccess('Profile saved.');
    }

    function saveEmergencyNumber() {
        const emergencyNumber = emergencyNumberInput.value.trim();
        if (!emergencyNumber) {
            showError('Please enter an emergency contact number.');
            return;
        }
        localStorage.setItem('emergencyNumber', emergencyNumber);
        showSuccess('Emergency contact number saved.');
    }

    function triggerSOS() {
        // Trigger SOS siren
        playSiren();
        // Call emergency services or a designated contact
        callEmergencyServices();
    }

    function playSiren() {
        // Play a loud siren tone
        const audio = new Audio('siren.mp3');
        audio.play();
    }

    function callEmergencyServices() {
        const emergencyNumber = localStorage.getItem('emergencyNumber');
        if (!emergencyNumber) {
            showError('Please set an emergency number first.');
            return;
        }
        window.location.href = `tel:${emergencyNumber}`;
    }

    function showError(message) {
        feedback.textContent = message;
        feedback.style.backgroundColor = '#dc3545';
        setTimeout(() => {
            feedback.textContent = '';
        }, 5000);
    }

    function showSuccess(message) {
        feedback.textContent = message;
        feedback.style.backgroundColor = '#28a745';
        setTimeout(() => {
            feedback.textContent = '';
        }, 5000);
    }
});
