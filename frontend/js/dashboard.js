const API_URL = "http://localhost:8080/api/students";

const studentId = localStorage.getItem("studentId");

const loading = document.getElementById("loading");
const studentDetails = document.getElementById("studentDetails");
const errorMessage = document.getElementById("errorMessage");

const welcomeMessage = document.getElementById("welcomeMessage");
const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentEmailDetails = document.getElementById("studentEmailDetails");
const studentIdElement = document.getElementById("studentId");
const studentDepartment = document.getElementById("studentDepartment");
const studentYear = document.getElementById("studentYear");
const profileInitial = document.getElementById("profileInitial");

const logoutButton = document.getElementById("logoutButton");

studentDetails.style.display = "none";

if (!studentId) {

    window.location.href = "index.html";

} else {

    loadStudentDetails();

}

async function loadStudentDetails() {

    try {

        const response = await fetch(`${API_URL}/${studentId}`);

        if (!response.ok) {
            throw new Error("Student not found");
        }

        const student = await response.json();

        studentName.textContent = student.name;
        studentEmail.textContent = student.email;
        studentEmailDetails.textContent = student.email;
        studentIdElement.textContent = student.id;
        studentDepartment.textContent = student.department;
        studentYear.textContent = student.year;

        profileInitial.textContent =
            student.name.charAt(0).toUpperCase();

        welcomeMessage.textContent =
            `Welcome, ${student.name}!`;

        loading.style.display = "none";
        studentDetails.style.display = "block";

    } catch (error) {

        console.error("Dashboard error:", error);

        loading.style.display = "none";

        errorMessage.textContent =
            "Unable to load student details.";

        errorMessage.className = "message error";

    }
}

logoutButton.addEventListener("click", function () {

    localStorage.removeItem("studentId");

    window.location.href = "index.html";

});