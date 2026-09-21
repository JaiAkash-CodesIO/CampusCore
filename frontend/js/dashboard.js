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

function formatYearText(year) {
    const y = parseInt(year);
    if (y === 1) return "1st Year (Freshman)";
    if (y === 2) return "2nd Year (Sophomore)";
    if (y === 3) return "3rd Year (Junior)";
    if (y === 4) return "4th Year (Senior)";
    return year ? `Year ${year}` : "-";
}

function formatDepartmentText(dept) {
    const map = {
        "IT": "Information Technology (IT)",
        "CSE": "Computer Science Engineering (CSE)",
        "ECE": "Electronics & Communication (ECE)",
        "EEE": "Electrical & Electronics (EEE)",
        "MECH": "Mechanical Engineering (MECH)",
        "CIVIL": "Civil Engineering (CIVIL)"
    };
    return map[dept] || dept || "-";
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
        studentIdElement.textContent = `#STU-${String(student.id).padStart(4, '0')}`;
        studentDepartment.textContent = formatDepartmentText(student.department);
        studentYear.textContent = formatYearText(student.year);

        profileInitial.textContent =
            student.name ? student.name.charAt(0).toUpperCase() : "S";

        welcomeMessage.textContent =
            `Welcome back, ${student.name}!`;

        loading.style.display = "none";
        studentDetails.style.display = "block";

    } catch (error) {

        console.error("Dashboard error:", error);

        loading.style.display = "none";

        errorMessage.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Unable to load student profile details. Please make sure the backend is active.</span>
        `;

        errorMessage.className = "message error";

    }
}

logoutButton.addEventListener("click", function () {

    localStorage.removeItem("studentId");

    window.location.href = "index.html";

});