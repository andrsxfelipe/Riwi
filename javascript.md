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

# truthy & falsy

`if (valor)` JavaScript convierte el valor en un booleano implícito.
Los 7 valores *falsy* en JS que dan `false` en un if son:

1. `false`
2. `0` (truthy si es tipo string)
3. `""`
4. `null`
5. `undefined`
6. `NaN`
7. `document.all `