"use strict";
var _a;
// Profile image preview function
(_a = document.getElementById("profile")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function (event) {
    var _a;
    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            // Create an image element to display the profile picture
            const img = document.createElement("img");
            img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            img.alt = "Profile Picture";
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.borderRadius = "50%";
            // Display the image in resume display section
            const displaySection = document.getElementById("resume-display");
            if (displaySection) {
                const existingImg = displaySection.querySelector("img");
                if (existingImg) {
                    existingImg.src = img.src; // Replace the existing image
                }
                else {
                    displaySection.insertBefore(img, displaySection.firstChild); // Add image if it doesn't exist
                }
            }
        };
        reader.readAsDataURL(file);
    }
});
// Function to get form data
function getFormData() {
    var _a;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value;
    const profileInput = document.getElementById("profile");
    const profile = ((_a = profileInput.files) === null || _a === void 0 ? void 0 : _a[0]) ? URL.createObjectURL(profileInput.files[0]) : "";
    return { name, email, phone, education, experience, skills, profile };
}
// Function to display resume
function displayResume(data) {
    const resumeDisplay = document.getElementById("resume-display");
    if (resumeDisplay) {
        resumeDisplay.style.display = "block";
        resumeDisplay.innerHTML = `
            <h2>Resume</h2>
            ${data.profile ? `<img src="${data.profile}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;">` : ""}
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <h3>Education</h3>
            <p>${data.education}</p>
            <h3>Experience</h3>
            <p>${data.experience}</p>
            <h3>Skills</h3>
            <p>${data.skills}</p>
        `;
    }
}
// Form submit handler
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = getFormData();
    displayResume(formData);
}
// Add event listener to form
const formElement = document.getElementById("resume-form");
if (formElement) {
    formElement.addEventListener("submit", handleFormSubmit);
}
