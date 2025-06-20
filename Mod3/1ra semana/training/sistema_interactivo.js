// // Program initialization
// console.log("Welcome to the Messenger Interactive System!");
// // Getting user info
// let nombre = prompt("Please, enter your name: ");
// let edad = prompt("Please enter your age: ");

// // If it is not possible convert it to interger edad variable will be NaN
// edad = parseInt(edad);

// // Validations
// if (isNaN(edad)){
//     console.error("Error: Please, enter a valid age in numbers.");
// }
// else if (edad < 18){
//     alert(`Hello ${nombre}, you are under de legal age. Keep learning and enjoying the code!`);
// }
// else {
//     alert(`Hello ${nombre}, your are on the legal age. Be prepared for big oportunities in the programming world!`);
// }

document.getElementById("usuario").addEventListener("submit", function (event) {
    event.preventDefault();
    let entradas = [...document.querySelectorAll("input")]
    nombre = entradas[0].value
    edad = (entradas[1].value)
    document.getElementById("msj").textContent = ""
    document.getElementById("error_msj").textContent = ""
    if (isNaN(~~edad) || ~~edad <= 0 || ~~edad >= 120 || (edad.includes("e")) || (edad.includes("."))){
        document.getElementById("error_msj").textContent = "Por favor digite una edad correcta"
    } else if (edad >= 18) {
        document.getElementById("msj").textContent = `Hello ${nombre}, your are on the legal age. Be prepared for big oportunities in the programming world!`
    } else {
        document.getElementById("msj").textContent = `Hello ${nombre}, you are under de legal age. Keep learning and enjoying the code!`
    }
});