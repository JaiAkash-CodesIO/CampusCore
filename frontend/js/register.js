const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

const API_URL = "http://localhost:8080/api/students";

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

    message.className = "message info";
    message.textContent = "Registering student...";

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
            message.textContent = "Registration successful! Redirecting to login...";

            registerForm.reset();

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1500);

        } else {

            message.className = "message error";
            message.textContent = data;

        }

    } catch (error) {

        console.error("Registration error:", error);

        message.className = "message error";
        message.textContent =
            "Unable to connect to the server. Make sure Spring Boot is running.";

    }
});