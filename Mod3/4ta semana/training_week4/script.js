// This function save info from the form to the localStorage.
function saveInfo(){
    userName = document.getElementById('inputName').value;
    userAge = document.getElementById('inputAge').value;
    // Validates if the content inserted is valid (No null values and for the age, only positive intergers).
    if (
        !userName ||
        !userAge ||
        userAge.includes(".") ||
        userAge.includes("e") ||
        isNaN(userAge) ||
        +userAge < 0 || 
        +userAge > 123
    ) {
        warningMessage("Please, insert valid values"); // If invalid values, then show a message.
        return
    }

    // Validates if the information entered is already on the localStorage.
    if ((localStorage.getItem(userName)) && (localStorage.getItem(userName)===userAge)) {
        // If it is, the show a message
        warningMessage("This user is already setted with the same age")
        return
    }

    localStorage.setItem(userName,userAge); // Save the info in localStorage.
    updateDisplay()
    countInteractions()
}

// Restore the information. This function counts an interactions
function clearInfo(){
    if (localStorage.length === 0) {
        warningMessage("There's no information to clear.")
        return
    }
    localStorage.clear()
    countInteractions()
    updateDisplay()
}

// When something in the localStorage changes, the table which contain the information is updated. 
function updateDisplay(){
    const table = document.getElementById('elementTable');
    table.innerHTML="<tr><th>User</th><th>Age</th></tr>"
    for (let i = 0; i<localStorage.length;i++) {
        key = localStorage.key(i);
        value = localStorage.getItem(key)
        table.innerHTML += `<tr><td>${key}</td><td>${value}</td></tr>`
    }
}

// This function updates the interactions an shows it in a text.
// Saving information and clear it counts as an interaction and this information remains in the session.
function updateInteractions(){
    let elementInteractions = document.querySelector(".elementInteractions")
    let interactions = sessionStorage.getItem("Interactions")
    if (interactions) {
        elementInteractions.textContent = `Interactions: ${interactions}`;
    }
    else {
        elementInteractions.textContent = "There's no interactions yet."
    }
}

// Counts and interaction.
function countInteractions(){
    let interactions = sessionStorage.getItem("Interactions")
    if (interactions) {
        interactions = Number(interactions)+1
        sessionStorage.setItem("Interactions",interactions)
    }
    else {
        sessionStorage.setItem("Interactions",1)
    }
    updateInteractions()
}

// Shows a message.
function warningMessage(message){
    divWarning = document.querySelector(".divWarning");
    divWarning.textContent = message;
    setTimeout( () => (divWarning.textContent = ""), 3000);
}

updateDisplay()
updateInteractions()