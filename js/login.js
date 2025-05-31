document.addEventListener('DOMContentLoaded', () => {
    // --- Password Toggle Functionality ---
    const togglePasswordElements = document.querySelectorAll('.toggle-password');

    togglePasswordElements.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');

            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle the eye icon
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // --- Login Form Submission and API Call ---
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form input values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Basic client-side validation
        if (!email || !password) {
            alert('Please enter both email and password.'); // Using alert for simplicity
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        console.log('Client-side validation passed. Attempting login...');

        const loginData = {
            email: email,
            password: password
        };

        // Call the login API function
        await loginUser(loginData);
    });

    // --- Google Sign-in Button (Placeholder) ---
    const googleSignInBtn = document.querySelector('.google-signin-btn');
    googleSignInBtn.addEventListener('click', () => {
        alert('Google Sign-in functionality is not implemented in this demo. This would typically involve OAuth.');
        // In a real application, you would initiate the Google OAuth flow here.
        // E.g., window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?...';
    });


    // --- Helper function for email validation ---
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Backend API Interaction for Login ---

    const API_CONFIG = {
        // Replace with your actual backend API endpoint for user login
        LOGIN_URL: 'https://your-backend.com/api/login',
        // Replace with the URL of the page users should be redirected to after successful login
        LOGGED_IN_PAGE_URL: 'dashboard.html', // Example: 'dashboard.html' or '/user/profile'
        apiKey: "" // Leave empty for Canvas to provide for Gemini/Imagen, or add your custom API key
    };

    /**
     * Sends login credentials to the backend API.
     * @param {Object} credentials - An object containing user's email and password.
     */
    async function loginUser(credentials) {
        console.log('Sending login data to backend:', credentials);

        const submitButton = document.querySelector('.login-btn');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Logging In...';
        submitButton.disabled = true; // Disable button to prevent multiple submissions

        try {
            const response = await fetch(API_CONFIG.LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authorization headers here if required by your backend
                    // 'X-API-Key': API_CONFIG.apiKey
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                alert('Login successful! Redirecting to your dashboard.'); // Using alert for simplicity

                // --- Script to direct and upload the user's logged in page ---
                // In a real application, you would save the authentication token
                // (e.g., JWT) received from the backend in localStorage or sessionStorage
                // and then redirect.
                // Example: localStorage.setItem('authToken', result.token);
                window.location.href = API_CONFIG.LOGGED_IN_PAGE_URL; // Redirect to the logged-in page
            } else {
                const errorData = await response.json();
                console.error('Login failed:', response.status, errorData);
                alert(`Login failed: ${errorData.message || 'Invalid credentials'}`); // Using alert for simplicity
            }
        } catch (error) {
            console.error('An error occurred during login API call:', error);
            alert('A network error occurred. Please check your internet connection and try again.'); // Using alert for simplicity
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    }

    // Example of how you might use a generative model if needed for some form logic
    // (Not directly used for form submission in this example, but for demonstration)
    async function generateTextWithGemini(prompt) {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will provide this at runtime for gemini-2.0-flash
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                console.log("Generated text:", text);
                return text;
            } else {
                console.error("Gemini API response structure unexpected:", result);
                return "Could not generate text.";
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return "Error calling AI service.";
        }
    }
});