console.log("Hola mundo");

//var, scope global | let, scope local
let fullName = "Camilo Agudelo"
let lastName = "Agudelo"
let edad = 32;


const iva = 19.2

let isActive = true

name2 = 2

// console.log(name2+" "+lastName)
// console.log(`El nombre es ${name2} y el apellido es ${lastName}`);
// console.error(name2)
// console.warn(name2)
// console.info(name2)

function printInConsole() {
    let documento = document.querySelector("h2").innerHTML = fullName
    console.log("clic en el boton")
}


function enviar() {
    edad = document.getElementById("edad").value;
    nombre = document.getElementById("nombre").value;
    console.log(edad)
    if (isNaN(edad)) {
        alert("Error: Please, enter a valid age in numbers.");
    }
    else if (edad < 18) {
        alert(`Hello ${nombre}, you are under de legal age. Keep learning and enjoying the code!`);
    }
    else {
        alert(`Hello ${nombre}, your are on the legal age. Be prepared for big oportunities in the programming world!`);
    }
}
function espositivo(numero) {
    numero = parseFloat(numero)
    if (numero > 0) {
        alert("El número es positivo")
    }
    else if (numero < 0) {
        alert("El número es negativo")
    } else {
        alert("Ingrese un digito válido")
    }
}
// let num = prompt("Ingrese un número")
// do {
//     espositivo(num)
//     num = prompt("Ingrese otro número")
// } while (num != "")
// console.log("Hola")