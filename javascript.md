## Variables
**var:** Las variables declaradas con var tienen alcance de función o global. Si se declaran dentro de una función, solo son accesibles dentro de esa función. Si se declaran fuera de cualquier función, son globales y accesibles desde cualquier parte del código.

**let y const:** Las variables declaradas con let y const tienen alcance de bloque, lo que significa que solo son accesibles dentro del bloque (definido por llaves {}) en el que se declararon.

## Tipos de datos
**string:** Representa texto, encerrado entre comillas dobles o simples (o usando backticks). 

**number:** Representa números, tanto enteros como de punto flotante. 

**boolean:** Representa valores lógicos: true o false. 

**undefined:** Representa una variable que no tiene valor asignado.

**null:** Representa una ausencia de valor, a diferencia de undefined.

**symbol:** Representa un valor único e inmutable, usado como claves de objeto.

**bigint:** Representa números enteros de gran tamaño que superan el rango de number.

**NaN (Not a Number):** Se utiliza para representar un valor numérico que no es un número válido, como el resultado de operaciones matemáticas inválidas.

## Condicionales
### if-else
```
if (condicion1) {
    // Código si condicion1 es verdadera
} else if (condicion2) {
    // Código si condicion1 es falsa y condicion2 es verdadera`
} else {
    // Código si ambas condiciones son falsas`
}
```
### switch
```
switch (expresión) {
  case valor1:
    //Lógica cuando el resultado de expresión coincide con el valor1
    break;
  case valor2:
    //Cuando el resultado de expresión coincide con el valor2
    break;
...
  case valorN:
    //Cuando el resultado de expresión coincide con valorN
    break;
  default:
    //Cuando ninguno de los valores coincide con el valor de la expresión
    break;
}
```

- Usar if-else para: Evaluar rangos, condiciones complejas, más flexibilidad en las condiciones

- Usar switch: Para comparar una variable contra valores fijos, código más legible para muchas opciones

## for
```
for (expresion-inicial; condicion; expresion-final){
    // Lógica
}
```
**ej:**
```
for (var i = 0; i < 9; i++) {
  n += i;
  mifuncion(n);
}
```

### for para recorrer arrays
**Clásico**
```
for (let i = 0; i < arreglo.lenght; i++) {
  arreglo[i];
}
```
- Se puede acceder al índice i y modificar el array

**for...of**
```
for (const i of arreglo){
  console.log(i);
}
```
- Recorre los valores directamente (no los índices)
- No puedes modificar el índice ni saber en qué posición estás (a menos que lleves un contador externo)

**forEach() (muy usado en funciones)**
```
arreglo.forEach(function(fruta, i)){
  console.log(i, fruta);
}
```
- Puedes usar el valor y el índice.
- No puedes usar break ni continue.

**map() (cuando quieres transformar los valores)**
```
const mayusculas = arreglo.map(i => i.toUpperCase());
console.log(mayusculas);
```
- Crea un nuevo array transformado.
- No sirve para solo imprimir o ejecutar sin devolver algo.

**for...in (no recomendado para arrays)**
```
for (let i in arreglo){
  console.log(i, arreglos[i])
}
```
- Recorre los índices como strings, y puede incluir propiedades añadidas al array.
- Úsalo solo para objetos, no arrays.

| Método      | ¿Cuándo usarlo?                            |
| ----------- | ------------------------------------------ |
| `for`       | Cuando necesitas el índice o control total |
| `for...of`  | Cuando solo quieres los valores            |
| `forEach()` | Para ejecutar una función por cada valor   |
| `map()`     | Cuando necesitas **transformar** el array  |
| `for...in`  | ⚠️ Solo para objetos, no arrays            |

## while

**while**
```
while (condicion){
  //sentencia
}
```

**do while**
```
let i = 0;
do {
  console.log("El valor de i es: " + i);
  i++;
} while (i < 5);
```

La diferencia entre  while y do while es que en el do while se entra al menos una vez a la condicion. Usa do while si estás seguro que necesitas entras al ciclo al menos una vez.

## Funciones
```
function nombreFuncion(parametro1, parametro2) {
  // Código de la función
  return valorRetorno;
}
```

### Funciones flechas
Es una forma más corta y moderna de escribir funciones. Se introdujo en ES6 (2015)

Sintaxis:
```
const saludar = (nombre) => {
  return "Hola" + nombre;
}
```
Equivale a:
```
function saludar(nombre){
  return "Hola" + nombre;
}
```
**Sintaxis reducida (cuando es una sola línea y devuelve algo)**
`const saludar = nombre => "Hola" + nombre;`
- Se omiten paréntesis si hay un solo parámetro.
- Se omiten llaves y return si es una sola expresión.

Ejemplos:

`const sumar = (a,b) => a + b;`
`const cuadrado = x => x * x;`
`const aleatorio = () => Math.random();`

**Comportamiento de this**
Las funciones flecha no tienen su propio this, sino que heredan el `this` del contexto en que se crean.

ej:

```
function Persona (){
  this.nombre ="Ana";
  
  setTimeout(function (){
    console.log("Hola, soy " + this.nombre;) //undefined
  }, 1000);
}
```

```
function PersonaFlecha(){
  this.nombre = "Luis";
  setTimeout(() => {
    console.log("Hola, soy " + this.nombre); //"Luis"
  })
}
```
`new Persona(); // this dentro del setTimeout apunta a window`
`new PersonaFlecha(); //this apunta al objeto PersonaFlecha`

Usar funciones flecha:
- Para funciones cortas o expresiones simples.
- Para callbacks: `map`, `filter`, `forEach`, `setTimeout`, etc.
- Cuando no necesitas `this`

No usar:
- Como métodos de objetos que necesitan su propio `this`
- Como contructores (`new MiFuncionFlecha()`) da error

## Conversores
**Tabla de conversión de tipos en JavaScript**
| Valor original | `+valor` | `Number(valor)` | `parseInt(valor)` | `parseFloat(valor)` |
| -------------- | -------- | --------------- | ----------------- | ------------------- |
| `"123"`        | `123`    | `123`           | `123`             | `123`               |
| `"12.64"`      | `12.64`  | `12.64`         | `12`              | `12.64`             |
| `"123d"`       | `NaN`    | `NaN`           | `123`             | `123`               |
| `"d123"`       | `NaN`    | `NaN`           | `NaN`             | `NaN`               |
| `"12d3"`       | `NaN`    | `NaN`           | `12`              | `12`                |
| `"-123"`       | `-123`   | `-123`          | `-123`            | `-123`              |
| `"-12.5"`      | `-12.5`  | `-12.5`         | `-12`             | `-12.5`             |
| `"-123d"`      | `NaN`    | `NaN`           | `-123`            | `-123`              |
| `true`         | `1`      | `1`             | `NaN`             | `NaN`               |
| `false`        | `0`      | `0`             | `NaN`             | `NaN`               |
| `null`         | `0`      | `0`             | `NaN`             | `NaN`               |
| `"0"`          | `0`      | `0`             | `0`               | `0`                 |
| `""` (vacío)   | `0`      | `0`             | `NaN`             | `NaN`               |

**Otros métodos más avanzados**

`valor * 1` - Multiplicación implícita para forzar conversión
`~~valor` - Conversión rápida a entero (bitwise NOT doble)
`Math.floor(valor)` - Redondea hacia abajo (requiere un número válido)
`Math.round(valor)` - Redondea al número más cercano
`JSON.parse(valor)` - Conviere strings numéricos a número (solo si el valor es limpio)
`parseFloat().toFixed` - Convierte y limita decimales (devuelve string)

| Valor original | `valor * 1` | `~~valor` | `Math.floor(valor)` | `JSON.parse(valor)` |
| -------------- | ----------- | --------- | ------------------- | ------------------- |
| `"123"`        | `123`       | `123`     | `123`               | `123`               |
| `"12.64"`      | `12.64`     | `12`      | `12`                | `12.64`             |
| `"123d"`       | `NaN`       | `0`       | `NaN`               | ❌ Error            |
| `"d123"`       | `NaN`       | `0`       | `NaN`               | ❌ Error            |
| `"12d3"`       | `NaN`       | `0`       | `NaN`               | ❌ Error            |
| `"-123"`       | `-123`      | `-123`    | `-123`              | `-123`              |
| `"-12.5"`      | `-12.5`     | `-12`     | `-13`               | `-12.5`             |
| `"-123d"`      | `NaN`       | `0`       | `-NaN`              | ❌ Error            |
| `true`         | `1`         | `1`       | `1`                 | ❌ Error            |
| `false`        | `0`         | `0`       | `0`                 | ❌ Error            |
| `null`         | `0`         | `0`       | `0`                 | ❌ Error            |
| `"0"`          | `0`         | `0`       | `0`                 | `0`                 |
| `""` (vacío)   | `0`         | `0`       | `0`                 | ❌ Error            |

## truthy & falsy

`if (valor)` JavaScript convierte el valor en un booleano implícito.
Los 7 valores *falsy* en JS que dan `false` en un if son:

1. `false`
2. `0` (truthy si es tipo string)
3. `""`
4. `null`
5. `undefined`
6. `NaN`
7. `document.all `

## Scope 
El scope determina dónde puedes acceder a variables y funciones en tu código.

**Global scope**

Variables declaradas fuera de cualquier función o bloque están disponibles en todo el código.
```
let nombre = "Pipo";

function saludar() {
  console.log(nombre); // ✅ Puede acceder a 'nombre' porque está en el scope global
}
saludar();
```

**Function scope**

Variables declaradas dentro de una función solo existen ahí.
```
function ejemplo() {
  let mensaje = "Hola";
  console.log(mensaje); // ✅
}
console.log(mensaje); // ❌ Error: mensaje is not defined
```
**Block scope**

Desde ES6, let y const tienen bloque de alcance, es decir, variables solo existen dentro de {} donde se declaran.

```
{
  let secreto = "123";
  const clave = "abc";
}
// secreto y clave no existen aquí fuera ❌

```
en cambio `var` no tiene block scope, solo function scope.
```
{
  var x = 5;
}
console.log(x); // ✅ 5 (porque var ignora el bloque)
```

## Hoisting

JavaScript mueve las declaraciones al principio del scope antes de ejecutar el código.

Pero **solo las declaraciones**, no las asignaciones.

**Ej. con `var`**
```
console.log(a); // undefined (no error, porque se elevó la declaración)
var a = 5;
```
JS lo interpreta como:
```
var a;
console.log(a); // undefined
a = 5;
```

**Ej. con `let` y `const`**
```
console.log(b); // ❌ Error: Cannot access 'b' before initialization
let b = 10;
```
- Esto sucede porque let y const también se elevan, pero entran en una zona llamada “Temporal Dead Zone”: una etapa entre la elevación y su declaración donde no se pueden usar.

**Hoisting en funciones**
```
saluda(); // ✅ Funciona

function saluda() {
  console.log("Hola!");
}
```

Expresiones de función:

```
saluda(); // ❌ TypeError: saluda is not a function

var saluda = function() {
  console.log("Hola!");
};
```

## Objetos y arrays

### Objetos

**Sintaxis:**
```
const persona = {
  nombre: "Pipo",
  edad: 30,
  esGroomer: true
};
```

**Acceso a propiedades:**
```
console.log(persona.nombre);     // "Pipo"
console.log(persona["edad"]);    // 30
```

**Modificar propiedades:**

```
persona.edad = 31;               // Modificar
persona.ciudad = "Bogotá";       // Agregar
```

**Eliminar una propiedad:**

`delete persona.esGroomer;`

**Acceder a las keys:**
`object.keys()` - Devuelve un array con todas las claves (en forma de strings).

**Acceder a los values:**
`object.values()` - Todos los values

**Acceder a las llaves y valores simultaneamente**
`object.entries()` - Es como .items() en python 

### Arrays

**Sintaxis**
`const frutas = ["manzana", "pera", "banana"];`

**Acceder a elementos**
`console.log(frutas[0]); // "manzana"`

**Métodos**
`unshift()` - Agrega al inicio
`push()` - Agrega al final
`shift()` - Quita el primero
`pop()` - Quita el último
`splice(i,n)` - Quita `n` elementos desde posición `i`
`slice(i,f)` - Crea copia desde `i` hasta `f` sin incluir `f`
`includes()` - Verifica si un elemento existe
`indexOf()` - Devuelve índice del valor (o -1)

### Sets
Un Set en JavaScript es una colección de valores únicos, es decir, no permite elementos repetidos. Se usa para almacenar cualquier tipo de dato y es útil cuando necesitas asegurarte de que no haya duplicados.

Características principales:
No permite valores duplicados.
El orden de los elementos es el de inserción.
Puedes agregar, eliminar y verificar si un valor existe de forma eficiente.
Ejemplo básico de uso:
```
// Crear un set y agregar valores
const numeros = new Set();
numeros.add(1);
numeros.add(2);
numeros.add(2); // No se agrega porque ya existe

console.log(numeros); // Set { 1, 2 }
console.log(numeros.has(1)); // true
console.log(numeros.has(3)); // false

numeros.delete(1); // Elimina el 1
console.log(numeros); // Set { 2 }
```
Ejemplo: Eliminar duplicados de un array
```
const frutas = ["manzana", "pera", "manzana", "uva"];
const frutasUnicas = [...new Set(frutas)];
console.log(frutasUnicas); // ["manzana", "pera", "uva"]
```

### CallBacks
Un callback es simplemente una función que se pasa como argumento a otra función, y se ejecuta más adelante (cuando "la llamen de vuelta").

```
function saludar(nombre) {
  console.log("Hola " + nombre);
}
function procesarUsuario(callback) {
  const nombre = "Pipo";
  callback(nombre);  // 👈 aquí se llama al callback
}
procesarUsuario(saludar);  // salida: "Hola Pipo"
// Observe que se llamó la función dentro de la función pero sin pasarle parametros.
```

**forEach(callback)**

Ejecuta una función una vez por cada elemento.
```
const numeros = [1, 2, 3];

numeros.forEach(num => {
  console.log(num);  // 1, 2, 3
});
```

**map(callback)**

Crea un nuevo array con los resultados de aplicar una función a cada elemento.
```
const dobles = numeros.map(num => num * 2);
console.log(dobles); // [2, 4, 6]
```

**filter(callback)**

Crea un nuevo array solo con los elementos que cumplan una condición.

```
const pares = numeros.filter(num => num % 2 === 0);
console.log(pares); // [2]
```

**find(callback)**

Devuelve el primer elemento que cumple una condición.

```
const mayorA1 = numeros.find(num => num > 1);
console.log(mayorA1); // 2
```

**reduce(callback, valorInicial)**

Reduce el array a un solo valor.

```
const suma = numeros.reduce((acumulador, actual) => acumulador + actual, 0);
console.log(suma); // 6
```

**some(callback) / every(callback)**
some: al menos uno cumple, every: todos cumplen.

```
console.log(numeros.some(num => num > 2));  // true
console.log(numeros.every(num => num > 0)); // true
```

**callbacks asincronicos**

```
setTimeout(() => {
  console.log("Esperaste 2 segundos");
}, 2000);
```

### Spread operator (...)

**En arrays:**

```
const a = [1, 2];
const b = [3, 4];
const combinado = [...a, ...b];
console.log(combinado); // [1, 2, 3, 4]
```
También sirve para copiar arrays:
`const copia = [...a]; // copia exacta de 'a'`

**En objetos:**

```
const persona = { nombre: "Pipo", edad: 30 };
const infoExtra = { ciudad: "Bogotá" };

const personaCompleta = { ...persona, ...infoExtra };
console.log(personaCompleta);
// { nombre: 'Pipo', edad: 30, ciudad: 'Bogotá' }
```

### Rest operator (...)

El operador rest **recolecta** los elementos restantes en funciones o estructuras.

```
function sumar(...numeros) {
  return numeros.reduce((a, b) => a + b, 0);
}

console.log(sumar(1, 2, 3)); // 6
```
Aquí, numeros es un array: `[1, 2, 3]`

### Destructuring

```
const [primero, ...resto] = [10, 20, 30, 40];
console.log(primero); // 10
console.log(resto);   // [20, 30, 40]
```

En objetos:

```
const { nombre, ...datos } = { nombre: "Pipo", edad: 30, ciudad: "Bogotá" };
console.log(nombre); // "Pipo"
console.log(datos);  // { edad: 30, ciudad: "Bogotá" }
```

## DOM y Eventos

### Seleccionar elementos del DOM

DOM -> Document Object Model

**`document.getElementById("id")`**

Selecciona un solo elemento por su atributo `id`

**`document.querySelector("selector")`**

Usa selectores CSS para seleccionar el primer elemento que coincida. (clases).

```
document.querySelector("#id");        // por ID
document.querySelector("div");        // primera etiqueta <div>
document.querySelector("input[type='text']"); // input de texto
```
**`document.querySelectorAll("selector")`**

Devuelve todos los elementos que coincidan con el selector (NodeList iterable)
```
const parrafos = document.querySelectorAll("p");
parrafos.forEach(p => console.log(p.textContent));
```

**`document.getElementsByClassName("clase")`**

Selecciona todos los elementos con una clase. Devuelve un HTMLCollection (similar a un array, pero no exactamente igual)

**`document.getElementsByTagName("clase")`**

Selecciona todos los elementos por su nombre de etiqueta

| Método                   | Devuelve               | Selector usado |
| ------------------------ | ---------------------- | -------------- |
| `getElementById`         | 1 solo elemento        | ID             |
| `getElementsByClassName` | Lista (HTMLCollection) | Clase          |
| `getElementsByTagName`   | Lista (HTMLCollection) | Etiqueta       |
| `querySelector`          | 1 solo elemento        | CSS selector   |
| `querySelectorAll`       | Lista (NodeList)       | CSS selector   |

### Crear, eliminar y modificar elementos

**Crear elementos**

`document.createElement("etiqueta")` - Lo crea (Se puede agregar texto, clases, atributos, etc.)

`.appendChild()` ó `.append()` - Para insertar en el DOM

ej:

```
// Crear un nuevo párrafo
const nuevoParrafo = document.createElement("p");

// Agregar texto
nuevoParrafo.textContent = "Hola, soy nuevo";

// Agregar clase
nuevoParrafo.classList.add("mi-clase");

// Agregar al body o a otro contenedor
document.body.appendChild(nuevoParrafo);
```
con `.innerHTML`:
```
const contenedor = document.getElementById("caja");
contenedor.innerHTML += "<p>Otro párrafo</p>";
```


**Eliminar elementos**

`.remove()`:

```
const elemento = document.querySelector(".eliminarme");
elemento.remove();
```

`.removeChild()` si tienes acceso al padre:
```
const padre = document.getElementById("contenedor");
const hijo = document.getElementById("hijo");
padre.removeChild(hijo);
```

**Modificar elementos**

***Cambiar texto***
`document.querySelector("h1").textContent = "Nuevo título";`:
Cambia el texto, también se puede añadir con:
`document.querySelector("h1").textContent += "texto añadido";`

***Cambiar el HTML interno***
`document.querySelector(#mensaje).innerHTML = "<strong>Hola</strong>;"`

***Cambiar atributos***
```
const imagen = document.querySelector("img");
imagen.setAttribute("src", "nueva-imagen.jpg");
imagen.setAttribute("alt", "Texto alternativo");
```

***Cambiar clases***
```
const div = document.querySelector("#caja");
div.classList.add("nueva-clase");
div.classList.remove("vieja-clase");
div.classList.toggle("modo-oscuro");
```

***Cambiar estilos***
```
const boton = document.querySelector("button");
boton.style.backgroundColor = "blue";
boton.style.color = "white";
```

### Eventos

Es una acción del usuario o del navegador que podemos "escuchar" y responder con código.

Sintaxis:

`elemento.addEventListener("tipoDeEvento", funcionCallback);`

ej:
```
document.querySelector("button").addEventListener("click", () => {
  console.log("¡Botón clickeado!");
});
```

| Evento      | ¿Cuándo se dispara?                                |
| ----------- | -------------------------------------------------- |
| `click`     | Al hacer clic en un botón, div, etc.               |
| `submit`    | Al enviar un formulario                            |
| `keydown`   | Al presionar una tecla                             |
| `input`     | Al escribir en un input (cambia mientras escribes) |
| `change`    | Al cambiar el valor de un select o checkbox        |
| `mouseover` | Cuando el mouse entra en un elemento               |
| `mouseout`  | Cuando el mouse sale del elemento                  |