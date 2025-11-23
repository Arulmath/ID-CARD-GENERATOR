// Fill Day
let day = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
    day.innerHTML += `<option>${i}</option>`;
}

// Fill Month
let month = document.getElementById("month");
["01","02","03","04","05","06","07","08","09","10","11","12"].forEach(m => {
    month.innerHTML += `<option>${m}</option>`;
});

// Fill Year
let year = document.getElementById("year");
let currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1970; y--) {
    year.innerHTML += `<option>${y}</option>`;
};

// Preview Image
document.getElementById("photo").addEventListener("change", (e) => {
    let reader = new FileReader();
    reader.onload = () => {
        document.getElementById("previewImg").src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// DOWNLOAD BUTTON
document.getElementById("downloadBtn").addEventListener("click", async () => {

    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    let dob = `${day.value}/${month.value}/${year.value}`;
    let previewImg = document.getElementById("previewImg");

    if (!name || !role || day.value === "DD" || month.value === "MM" || year.value === "YYYY" || previewImg.src === "") {
        alert("Please fill all fields properly.");
        return;
    }

    // Fill Preview
    document.getElementById("prevName").textContent = name;
    document.getElementById("prevRole").textContent = role;
    document.getElementById("prevDOB").textContent = "DOB: " + dob;

    // Make sure card is visible
    const card = document.querySelector(".id-card");
    card.style.visibility = "visible";

    // Wait for image to load inside the card
    await new Promise(resolve => setTimeout(resolve, 300));

    html2canvas(card, { scale: 3 }).then(canvas => {
        let link = document.createElement("a");
        link.download = "ID_Card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});

// CANCEL BUTTON
document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("idForm").reset();
    document.getElementById("previewImg").src = "";
});

