// Convertir una lista de numeros a sus cuadrados.

// Forma tradicional
function alCuadrado(lista) {
  return lista.map(function(num) {
    return num * num;
  });
}

// Arrow function
const alCuadrado = (lista) => lista.map(num => num * num);

// Prueba
// console.log(alCuadrado([2, 3, 4])); // [4, 9, 16]

// Sumar dos números

function sumas(a,b){
    return (a+b);
}

const sumas1 = (a,b) => a+b;

// console.log(sumas(5,3));
// console.log(sumas1(2,5));

//Filtrar numeros pares

let numeros = [76,94,99,13,12,7,6,5,18]

function filtrar(lista){
    return lista.filter(function(num){
        return num % 2 ===0
    });
}

const filtrar1 = (lis) => lis.filter(num => num % 2 === 0)

// console.log(filtrar(numeros));
// console.log(filtrar1(numeros));

// Convertir lista de strings a mayus

function convertir(...cadenas){
    return cadenas.map(function(cadena){
        return cadena.toUpperCase();
    })
}

const convertir1 = (...cadenas) => cadenas.map(cadena => cadena.toUpperCase());

// console.log(convertir("perro","gato","loro"));
// console.log(convertir1("perro","gato","loro"));

// Verificar si una palabra contiene la letra "a"

function letraa(palabra){
    return palabra.includes("a")
}

const letraa1 = (palabra) => palabra.includes("a")

// console.log(letraa("Gato"));
// console.log(letraa("Perro"));

// console.log(letraa1("Gato"));
// console.log(letraa1("Perro"));


// Multiplicar todos los números de un arreglo por 10

let numeros2 = [3,4,5,6,7]

function multPorDiez(lista){
    return lista.map(function (numero){
       return numero*10 
    })
}

const multPorDiez1 = (lista) => lista.map(num => num*10)

console.log(multPorDiez(numeros2));
console.log(multPorDiez1(numeros2));