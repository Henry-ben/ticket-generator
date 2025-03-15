function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayTicket() {
    let fullName = getQueryParam("name");
    let email = getQueryParam("email");
    let github = getQueryParam("github");
    let ticketId = getQueryParam("ticket");
    let normalName = fullName

    const uploadedImage = localStorage.getItem("uploadedImage");

    if (fullName) {
        fullName += "!";
    }
    if(normalName){
         fullName.replace(/^!/, "");
    }
    document.getElementById("normalName").innerText = normalName

    if (fullName && email && github && ticketId) {
        document.getElementById("name").innerText = fullName;
        document.getElementById("email").innerText = email;
        document.getElementById("github").innerText = github;
        document.getElementById("ticket-id").innerText = "#" + ticketId;
    } else {
        document.getElementById("ticket").innerHTML = "<p style='color: red;'>Error: Ticket data is missing!</p>";
    }

    if (uploadedImage) {
        document.getElementById("displayImage").src = uploadedImage;
        document.getElementById("displayImage").style.display = "block";
    }
}
displayTicket()
