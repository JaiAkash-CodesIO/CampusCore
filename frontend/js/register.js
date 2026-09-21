const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");
const registerSubmitBtn = document.getElementById("registerSubmitBtn");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const passwordInput = document.getElementById("password");

const API_URL = "http://localhost:8080/api/students";

// Password visibility toggle
if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", function () {
        const isPassword = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", isPassword ? "text" : "password");
        
        togglePasswordBtn.innerHTML = isPassword
            ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
               </svg>`
            : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
               </svg>`;
    });
}

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;

    const studentData = {
        name: name,
        email: email,
        password: password,
        department: department,
        year: parseInt(year)
    };

    if (registerSubmitBtn) {
        registerSubmitBtn.disabled = true;
        registerSubmitBtn.innerHTML = `<span>Registering...</span>`;
    }

    message.className = "message info";
    message.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Registering student account...</span>
    `;

    try {

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        const data = await response.json();

        if (response.ok) {

            message.className = "message success";
            message.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Registration successful! Redirecting to login...</span>
            `;

            registerForm.reset();

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1500);

        } else {

            message.className = "message error";
            message.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <span>${typeof data === 'string' ? data : (data.message || "Registration failed.")}</span>
            `;

            if (registerSubmitBtn) {
                registerSubmitBtn.disabled = false;
                registerSubmitBtn.innerHTML = `
                    <span>Create Student Account</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                `;
            }

        }

    } catch (error) {

        console.error("Registration error:", error);

        message.className = "message error";
        message.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Unable to connect to the server. Make sure Spring Boot is running.</span>
        `;

        if (registerSubmitBtn) {
            registerSubmitBtn.disabled = false;
            registerSubmitBtn.innerHTML = `
                <span>Create Student Account</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            `;
        }

    }
});