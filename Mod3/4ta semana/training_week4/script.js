function saveInfo(){
    userName = document.getElementById('inputName').value;
    userAge = document.getElementById('inputAge').value;
    if (
        !userName ||
        !userAge ||
        userAge.includes(".") ||
        userAge.includes("e") ||
        isNaN(userAge) ||
        +userAge < 0 || 
        +userAge > 123
    ){
        alert("Ingresa datos válidos");
        return
    }
    localStorage.setItem(userName,userAge);
}

function clearInfo(){
    localStorage.clear()
}
