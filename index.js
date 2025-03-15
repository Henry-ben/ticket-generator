const dropArea = document.getElementById("dropArea");
    const imageInput = document.getElementById("imageInput");
    const viewImage = document.getElementById("viewImage");
    const uploadText = document.getElementById("uploadText");

    // Function to handle file selection
    function handleFile(file) {
        if (!file.type.startsWith("image/")) {
            alert("Only image files (PNG, JPEG) are allowed!");
            return;
        }
        
        if (file.size > 500 * 1024) { // 500KB size limit
            alert("File size must be less than 500KB!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageBase64 = event.target.result;
            viewImage.src = imageBase64;
            viewImage.style.display = "block";

            document.getElementById("uploadButton").style.display = "none"
            uploadText.style.display = "none"; // Hide text

            localStorage.setItem("uploadedImage", imageBase64);
        };
        reader.readAsDataURL(file);
    }

    // Drag and Drop Events
    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("dragover");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("dragover");
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("dragover");
        const file = e.dataTransfer.files[0]; // Get first file
        if (file) handleFile(file);
    });

    // File Input Change Event
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0]; // Get first file
        if (file) handleFile(file);
    });

    // Button Click to Trigger File Input
    document.getElementById("uploadButton").addEventListener("click", () => {
        imageInput.click();
    });


function validateFullName(fullName){
    const namePattern = /^[A-Za-z ]+$/;
    return namePattern.test(fullName)
}   

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
}

function validateGithub(github){
    const userName = /^@[\w-]+$/;
    return userName.test(github)
} 

function generateTicket(){
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let github = document.getElementById("github").value;

    let nameError = document.getElementById("fullNameError");
    let emailError = document.getElementById("emailError");
    let githubError = document.getElementById("githubError");

    let isValid = true;

    // Validate Full Name
    if (!validateFullName(fullName)) {
        nameError.innerText = "Only letters and spaces are allowed.";
        isValid = false;
    } else {
        nameError.innerText = "";
    }

    // Validate Email
    if (!validateEmail(email)) {
        emailError.innerText = "Invalid email format.";
        isValid = false;
    } else {
        emailError.innerText = "";
    }

    // Validate GitHub Username
    if (!validateGithub(github)) {
        githubError.innerText = "GitHub username must start with '@'.";
        isValid = false;
    } else {
        githubError.innerText = "";
    }


    // If all inputs are valid, generate ticket
    if (isValid){
        let ticketId = Math.floor(Math.random()* 30000)
        let ticketURL = `generated.html?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&github=${encodeURIComponent(github)}&ticket=${ticketId}`;
        window.location.href = ticketURL; 
    } 
                 
}