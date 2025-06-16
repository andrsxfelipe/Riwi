#Variables

**var:** Las variables declaradas con var tienen alcance de función o global. Si se declaran dentro de una función, solo son accesibles dentro de esa función. Si se declaran fuera de cualquier función, son globales y accesibles desde cualquier parte del código.

**let y const:** Las variables declaradas con let y const tienen alcance de bloque, lo que significa que solo son accesibles dentro del bloque (definido por llaves {}) en el que se declararon

#Tipos de datos
**string:** Representa texto, encerrado entre comillas dobles o simples (o usando backticks). 
**number:** Representa números, tanto enteros como de punto flotante. 
**boolean:** Representa valores lógicos: true o false. 
**undefined:** Representa una variable que no tiene valor asignado. 
**null:** Representa una ausencia de valor, a diferencia de undefined. 
**symbol:** Representa un valor único e inmutable, usado como claves de objeto. 
**bigint:** Representa números enteros de gran tamaño que superan el rango de number. 
**NaN (Not a Number):** Se utiliza para representar un valor numérico que no es un número válido, como el resultado de operaciones matemáticas inválidas.

#Condicionales
if (condicion1) {
  // Código si condicion1 es verdadera
} else if (condicion2) {
  // Código si condicion1 es falsa y condicion2 es verdadera
} else {
  // Código si ambas condiciones son falsas
}

**switch**

switch (expresión) {
  case valor1:
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
    [break;]
  case valor2:
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
    [break;]
  ...
  case valorN:
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
    [break;]
  default:
    //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
    [break;]
}

Usar if-else para: Evaluar rangos, condiciones complejas, más flexibilidad en las condiciones

usar switch: PAra comparar una variable contra valores fijos, código más legible para muchas opciones

#Bucles

**for**
for ([expresion-inicial]; [condicion]; [expresion-final])sentencia

    expresion-inicial
Una expresión (incluyendo las expresiones de asignación) o la declaración de variable. Típicamente se utiliza para usarse como variable contador. Esta expresión puede opcionalmente declarar nuevas variables con la palabra clave var. Estas variables no son locales del bucle, es decir, están en el mismo alcance en el que está el bucle for. El resultado de esta expresión es descartado.

    condicion
Una expresión para ser evaluada antes de cada iteración del bucle. Si esta expresión se evalúa como verdadera, se ejecuta sentencia. Esta comprobación condicional es opcional. Si se omite, la condición siempre se evalúa como verdadera. Si la expresión se evalúa como falsa, la ejecución salta a la primera expresión que sigue al constructor de for.

    expresion-final
Una expresión para ser evaluada al final de cada iteración del bucle. Esto ocurre antes de la siguiente evaluación de la condicion. Generalmente se usa para actualizar o incrementar la variable contador.

    sentencia
Una sentencia que se ejecuta mientras la condición se evalúa como verdadera. Para ejecutar múltiples sentencias dentro del bucle, utilice una sentencia block ({ ... }) para agrupar aquellas sentecias.

for (var i = 0; i < 9; i++) {
  n += i;
  mifuncion(n);
}

**while**
Crea un bucle que ejecuta una sentencia especificada mientras cierta condición se evalúe como verdadera. Dicha condición es evaluada antes de ejecutar la sentencia

while (condicion)
  sentencia
  
condicion
Una expresión que se evalúa antes de cada paso del bucle. Si esta condición se evalúa como verdadera, se ejecuta sentencia. Cuando la condición se evalúa como false, la ejecución continúa con la sentencia posterior al bucle while.

sentencia
Una sentecia que se ejecuta mientras la condición se evalúa como verdadera. Para ejecutar múltiples sentencias dentro de un bucle, utiliza una sentencia block ({ ... }) para agrupar esas sentencias.

**do while**
let result = "";
let i = 0;

do {
  i = i + 1;
  result = result + i;
} while (i < 5);

console.log(result);
// Expected output: "12345"

La diferencia entre  while y do while es que en el do while se entra al menos una vez a la condicion. Usa do while si estás seguro que necesitas entras al ciclo al menos una vez.

#Funciones
Expresión:
function [nombre]([param[, param[, ...param]]]) {
   instrucciones
}

**Funciones flecha**
Una expresión de función flecha es una alternativa compacta a una expresión de función tradicional, pero es limitada y no se puede utilizar en todas las situaciones.

const materials = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

console.log(materials.map((material) => material.length));
// Expected output: Array [8, 6, 7, 9]


#
