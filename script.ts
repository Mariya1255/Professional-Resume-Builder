// Interface for form data
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
    profile?: string; // Optional field for profile image URL
}

// Profile image preview function
document.getElementById("profile")?.addEventListener("change", function(event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Create an image element to display the profile picture
            const img = document.createElement("img");
            img.src = e.target?.result as string;
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
                } else {
                    displaySection.insertBefore(img, displaySection.firstChild); // Add image if it doesn't exist
                }
            }
        };
        reader.readAsDataURL(file);
    }
});

// Function to get form data
function getFormData(): ResumeData {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    const profileInput = document.getElementById("profile") as HTMLInputElement;
    const profile = profileInput.files?.[0] ? URL.createObjectURL(profileInput.files[0]) : "";

    return { name, email, phone, education, experience, skills, profile };
}

// Function to display resume
function displayResume(data: ResumeData): void {
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
function handleFormSubmit(event: Event): void {
    event.preventDefault(); // Prevent default form submission
    const formData = getFormData();
    displayResume(formData);
}

// Add event listener to form
const formElement = document.getElementById("resume-form");
if (formElement) {
    formElement.addEventListener("submit", handleFormSubmit);
}
