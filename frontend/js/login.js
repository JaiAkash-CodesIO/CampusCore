const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

const API_URL = "http://localhost:8080/api/auth";

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const loginData = {
        email: email,
        password: password
    };

    message.className = "message info";
    message.textContent = "Logging in...";

    try {

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("studentId", data.id);

            window.location.href = "dashboard.html";

        } else {

            message.className = "message error";
            message.textContent = data.message || "Invalid email or password.";

        }

    } catch (error) {

        console.error("Login error:", error);

        message.className = "message error";
        message.textContent =
            "Unable to connect to the server. Make sure Spring Boot is running.";

    }
});