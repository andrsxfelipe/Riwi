# Base de datos relacional

Una base de datos relacional es un tipo de base de datos que organiza la información en tablas (también llamadas relaciones), donde cada tabla está compuesta por filas (registros) y columnas (campos o atributos).

## DDL (Data Definition Language)

DDL (Data Definition Language) es el subconjunto del lenguaje SQL que permite crear, modificar o eliminar estructuras dentro de una base de datos, como tablas, vistas, índices, esquemas, procedimientos almacenados (algunas veces).

**Principales comandos DDL**

| Comando    | Descripción                                                       |
| ---------- | ----------------------------------------------------------------- |
| `CREATE`   | Crea nuevas estructuras (tablas, vistas, índices)                 |
| `ALTER`    | Modifica estructuras existentes                                   |
| `DROP`     | Elimina estructuras                                               |
| `TRUNCATE` | Elimina todos los registros de una tabla sin borrar su estructura |
| `RENAME`   | Cambia el nombre a una tabla o columna (depende del motor de BD)  |


**CREATE**

`CREATE DATABASE tienda;`

```sql
CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  fecha_registro DATE DEFAULT CURRENT_DATE
);
```

`INT`, `VARCHAR`, `DATE` son tipos de datos.
`PRIMARY KEY` indica clave primaria.
`AUTO_INCREMENT` genera valores automáticos (solo en MySQL).
`NOT NULL` impide valores nulos.
`DEFAULT` establece un valor por defecto.
`UNIQUE` impide valores repetidos.

**ALTER**

`ALTER TABLE clientes ADD telefono VARCHAR(20);` - Agregar una columna
`ALTER TABLE clientes MODIFY telefono VARCHAR(30);` - Modificar una columna
`ALTER TABLE clientes CHANGE telefono celular VARCHAR(30);` - Cambiar nombre a una columna
`ALTER TABLE clientes DROP COLUMN email;` - Eliminar una columna

**DROP**

`DROP TABLE clientes;` - Eliminar una tabla
`DROP DATABASE tienda;` - Eliminar una base de datos

**TRUNCATE**

`TRUNCATE TABLE clientes;` - ELiminar una tabla, más rápido que DELETE porque no registra cada eliminación

**RENAME**
`RENAME TABLE clientes TO usuarios;` - Renombrar tabla.

**Restricciones comunes**

| Restricción   | Uso                               |
| ------------- | --------------------------------- |
| `PRIMARY KEY` | Identifica unívocamente cada fila |
| `FOREIGN KEY` | Enlaza con otra tabla             |
| `UNIQUE`      | Evita duplicados                  |
| `NOT NULL`    | Obliga a ingresar un valor        |
| `CHECK`       | Restringe valores posibles        |
| `DEFAULT`     | Establece un valor por defecto    |

```sql
CREATE TABLE pedidos (
  id INT PRIMARY KEY,
  cliente_id INT,
  total DECIMAL(10, 2) CHECK (total >= 0),
  fecha DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
```

- Usa nombres descriptivos para tablas y columnas.
- Define `PRIMARY KEY` y `FOREIGN KEY` para integridad referencial.
- Establece restricciones para validar los datos desde la base.
- Usa `TRUNCATE` con precaución (no puedes deshacerlo).
- Haz respaldos antes de usar `DROP`.

## DML (Data Manipulation Language)

DML (Data Manipulation Language) es el subconjunto de SQL que se utiliza para consultar, insertar, actualizar o eliminar datos en una base de datos.

**Principales comandos**

| Comando  | Propósito                         |
| -------- | --------------------------------- |
| `SELECT` | Leer datos desde una o más tablas |
| `INSERT` | Agregar nuevos registros          |
| `UPDATE` | Modificar registros existentes    |
| `DELETE` | Eliminar registros                |

**SELECT**

`SELECT * FROM clientes;` - Leer todos los registros
`SELECT nombre, email FROM clientes;` - Leer columnas específicas
`SELECT * FROM clientes WHERE ciudad = 'Bogotá';` - Con condiciones (WHERE)
`SELECT * FROM clientes ORDER BY nombre ASC;` - Ordenas resultados
`SELECT * FROM clientes LIMIT 5;` - Limitar cantidad de resultados

**Insertar múltiples registros**
```sql
INSERT INTO clientes (nombre, email, ciudad)
VALUES 
  ('Luis Pérez', 'luis@example.com', 'Cali'),
  ('María López', 'maria@example.com', 'Bogotá');
```

**UPDATE**

**Actualizar campo**
```sql
UPDATE clientes
SET ciudad = 'Barranquilla'
WHERE id = 3;
```
**Actualizar varios campos**
```sql
UPDATE clientes
SET nombre = 'Luis P.', email = 'luisp@example.com'
WHERE id = 2;
```

**DELETE** 

**Eliminar registro específico**
```sql
DELETE FROM clientes
WHERE id = 5;
```

**Eliminar registros pero no tabla**
`DELETE FROM clientes;`


**Transacciones (control de cambios)**

En muchos sistemas de bases de datos (como MySQL con InnoDB, PostgreSQL, SQL Server), los cambios hechos por DML se pueden controlar con transacciones:
```sql
BEGIN;

UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;

COMMIT;
```

- BEGIN inicia una transacción.
- COMMIT guarda los cambios.
- ROLLBACK revierte los cambios si algo falla.

Esto es muy útil en operaciones sensibles, como transferencias bancarias.

## DQL (Data Query Language)

Permite consultar y visualizar los datos almacenados en las tablas. Solo tiene un comando principal: SELECT.
```sql
SELECT columna1, columna2
FROM tabla
WHERE condición
ORDER BY columna ASC|DESC
LIMIT número;
```
**Ejemplo**
```sql
-- Seleccionar todos los clientes
SELECT * FROM clientes;

-- Seleccionar nombres y correos de clientes de Medellín
SELECT nombre, email FROM clientes WHERE ciudad = 'Medellín';

-- Ordenar por nombre
SELECT * FROM clientes ORDER BY nombre ASC;
```

## JOIN

| Tipo de JOIN  | Qué hace                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `INNER JOIN`  | Devuelve solo las filas que coinciden en ambas tablas                                                               |
| `LEFT JOIN`   | Devuelve todas las filas de la tabla izquierda, y las coincidencias de la derecha (si existen)                      |
| `RIGHT JOIN`  | Devuelve todas las filas de la tabla derecha, y las coincidencias de la izquierda (si existen)                      |
| `FULL JOIN`\* | Devuelve todas las filas cuando hay coincidencia en al menos una de las tablas (no soportado en MySQL directamente) |
| `CROSS JOIN`  | Devuelve el **producto cartesiano** (todas las combinaciones posibles)                                              |

**Ejemplo**

**Sean estas tablas:**
`estudiantes(id, nombre)`
`cursos(id, nombre, docente_id)`
`docentes(id, nombre)`
`matriculas(id, estudiante_id, curso_id)`

### INNER JOIN - Coincidencias Exactas

```sql
SELECT e.nombre AS estudiante, c.nombre AS curso
FROM matriculas m
INNER JOIN estudiantes e ON m.estudiante_id = e.id
INNER JOIN cursos c ON m.curso_id = c.id;
```
Solo muestra los estudiantes que estén matriculados en cursos.
Si no hay coincidencia en ambas tablas, no se muestra nada.
```sql
SELECT clientes.nombre, pedidos.producto
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
```

### LEFT JOIN – Todo lo de la izquierda + coincidencias

```sql
SELECT e.nombre AS estudiante, c.nombre AS curso
FROM estudiantes e
LEFT JOIN matriculas m ON e.id = m.estudiante_id
LEFT JOIN cursos c ON m.curso_id = c.id;
```
Muestra todos los estudiantes, estén o no matriculados.
Si no están en ninguna matrícula, las columnas de curso saldrán como NULL.

### RIGHT JOIN – Todo lo de la derecha + coincidencias
```sql
SELECT c.nombre AS curso, e.nombre AS estudiante
FROM cursos c
RIGHT JOIN matriculas m ON c.id = m.curso_id
RIGHT JOIN estudiantes e ON m.estudiante_id = e.id;
```
Se usa menos, pero útil cuando quieres ver todos los cursos que aparecen en las matrículas, aunque algún curso no tenga estudiantes (si aplicara).

### FULL JOIN – Todo de ambos lados
```sql
SELECT e.nombre, c.nombre
FROM estudiantes e
FULL OUTER JOIN cursos c ON e.id = c.id;
```

- No está soportado directamente en MySQL, pero en PostgreSQL o SQL Server sí
- Devuelve todo lo de ambas tablas, rellenando con NULL cuando no hay coincidencia.
- En MySQL puedes simularlo así:
```sql
SELECT ... FROM tabla1
LEFT JOIN tabla2 ON ...
UNION
SELECT ... FROM tabla1
RIGHT JOIN tabla2 ON ...;
```
### CROSS JOIN – Producto cartesiano

```sql
SELECT e.nombre, c.nombre
FROM estudiantes e
CROSS JOIN cursos c;
```

Devuelve todas las combinaciones posibles entre estudiantes y cursos. Se usa con cuidado (puede crear millones de combinaciones).

## Group By

**Sintaxis**
```SQL
SELECT columna_agrupada, FUNCION_AGREGADA(columna)
FROM tabla
GROUP BY columna_agrupada;
```

**Sea la siguiente tabla:**
ventas

| id | producto |cantidad | ciudad |
|----|----------|---------|--------|
| 1  | Laptop   | 2       | Bogotá |
| 2  | Mouse    | 5       | Bogotá |
| 3  | Laptop   | 1       | Cali   |
| 4  | Mouse    | 2       | Bogotá |

**Agrupar por productos y contar ventas**

```sql
SELECT producto, COUNT(*) AS total_ventas
FROM ventas
GROUP BY producto;
```

**Sumar cantidad vendida por ciudad**
```sql
SELECT ciudad, SUM(cantidad) AS total_unidades
FROM ventas
GROUP BY ciudad;
```

**Funciones agregadas comunes**

| Función    | Descripción      |
| ---------- | ---------------- |
| `COUNT(*)` | Cuenta filas     |
| `SUM(col)` | Suma los valores |
| `AVG(col)` | Promedio         |
| `MIN(col)` | Mínimo           |
| `MAX(col)` | Máximo           |


## DCL (Data Control Language)

Gestiona los permisos y la seguridad sobre los objetos de la base de datos. Se usa para autorizar o restringir el acceso a usuarios.

| Comando  | Función                   |
| -------- | ------------------------- |
| `GRANT`  | Otorga permisos           |
| `REVOKE` | Revoca permisos otorgados |


**Ejemplos:**
```sql
-- Otorgar permiso de lectura sobre la tabla clientes
GRANT SELECT ON clientes TO 'usuario1';

-- Otorgar permiso completo sobre una tabla
GRANT ALL PRIVILEGES ON pedidos TO 'adminuser';

-- Revocar permiso de escritura
REVOKE INSERT, UPDATE ON clientes FROM 'usuario1';
```

## TCL (Transaction Control Language)

Permite controlar las transacciones en una base de datos. Una transacción es un conjunto de operaciones que deben ejecutarse de forma atómica (todas o ninguna).

| Comando                       | Función                       |
| ----------------------------- | ----------------------------- |
| `BEGIN` o `START TRANSACTION` | Inicia una transacción        |
| `COMMIT`                      | Confirma los cambios          |
| `ROLLBACK`                    | Deshace los cambios           |
| `SAVEPOINT`                   | Marca un punto intermedio     |
| `ROLLBACK TO`                 | Revierte hasta un `SAVEPOINT` |


**Ejemplo:**
```sql
START TRANSACTION;

UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;

COMMIT;
```

**Ejemplo con rollback**
```sql
START TRANSACTION;

UPDATE inventario SET cantidad = cantidad - 5 WHERE producto_id = 10;

-- Algo sale mal
ROLLBACK;
```

**Con savepoint**
```sql
START TRANSACTION;

UPDATE productos SET stock = stock - 10 WHERE id = 1;
SAVEPOINT punto1;

UPDATE productos SET stock = stock - 10 WHERE id = 2;
ROLLBACK TO punto1;

COMMIT;
```

## Vistas (Views)

```sql
CREATE VIEW nombre_de_la_vista AS
SELECT columnas
FROM tablas
[JOIN, WHERE, GROUP BY, etc];
```

### Consultar una vista
```sql
SELECT * FROM vista_historial_academico;

-- Filtrar resultados
SELECT * FROM vista_historial_academico WHERE docente = 'Carlos Pérez';
```

### Actualizar una vista
```sql
CREATE OR REPLACE VIEW vista_historial_academico AS
-- nueva consulta...
```

### Eliminar una vista
DROP VIEW vista_historial_academico;

### Se puede modificar datos de una vista?

Depende del tipo de vista y del sistema de base de datos:

✅ Puedes hacer INSERT, UPDATE, DELETE desde una vista siempre que:

- La vista se base en una sola tabla
- No tenga funciones de agregación (SUM, AVG, etc.)
- No tenga DISTINCT, GROUP BY, UNION, JOIN, etc.
- No tenga subconsultas complejas

Las vistas con JOIN o GROUP BY suelen ser solo de lectura.

### Vistas para seguridad

`GRANT SELECT ON vista_historial_academico TO 'usuario_docente';`

### Vistas con alias y funciones
```sql
CREATE VIEW vista_reporte_general AS
SELECT 
  e.nombre AS estudiante,
  c.nombre AS curso,
  cal.nota_final,
  CASE 
    WHEN cal.nota_final >= 3 THEN 'Aprobado'
    ELSE 'Reprobado'
  END AS estado
FROM calificaciones cal
JOIN estudiantes e ON cal.estudiante_id = e.id
JOIN cursos c ON cal.curso_id = c.id;
```


# MongoDB

## 1. Instalación de MongoDB local

### Windows
1. Ve a la página oficial: https://www.mongodb.com/try/download/community
2. Descarga el instalador `.msi` para Windows.
3. Ejecuta el instalador y selecciona "Complete Setup".
4. Marca la opción "Install MongoDB as a Service".
5. Finaliza la instalación y abre MongoDB Compass si lo instalaste.

Para verificar que está instalado, abre PowerShell y ejecuta:
```bash
mongod --version
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### macOS (usando Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

## 2. Usar MongoDB Atlas (nube)
1. Ve a https://www.mongodb.com/cloud/atlas y crea una cuenta.
2. Crea un nuevo "Cluster" gratuito (M0).
3. Añade tu IP a la lista de IPs permitidas (0.0.0.0 para permitir todas).
4. Crea un usuario con contraseña.
5. Copia la cadena de conexión (Connection String) desde el botón "Connect".

Ejemplo de cadena de conexión:
```
mongodb+srv://usuario:contraseña@cluster0.mongodb.net/test
```

## 3. Conectarse desde la terminal

### Conexión a MongoDB local
```bash
mongosh
```

### Conexión a MongoDB Atlas desde terminal
```bash
mongosh "mongodb+srv://usuario:contraseña@cluster0.mongodb.net/test"
```

Reemplaza `usuario`, `contraseña` y `cluster0.mongodb.net/test` con tu información.

---

✅ Ya puedes comenzar a usar comandos como `show dbs`, `use nombreDB`, `db.coleccion.find()`.


## 2. Operaciones Básicas en MongoDB (CRUD + Operadores)

## Conectar a MongoDB

```bash
mongosh
```

### Seleccionar o crear una base de datos

```js
use mi_base_de_datos
```

### Crear (Insertar documentos)

#### Insertar un documento
```js
db.usuarios.insertOne({
  nombre: "Juan",
  edad: 30,
  email: "juan@mail.com"
})
```

#### Insertar varios documentos
```js
db.usuarios.insertMany([
  { nombre: "Ana", edad: 25 },
  { nombre: "Luis", edad: 35 }
])
```

### Leer (Consultar documentos)

#### Ver todos los documentos
```js
db.usuarios.find()
```

#### Buscar por condición
```js
db.usuarios.find({ edad: 30 })
```

#### Proyección (mostrar solo algunos campos)
```js
db.usuarios.find({}, { nombre: 1, _id: 0 })
```

### Actualizar documentos

#### Actualizar uno
```js
db.usuarios.updateOne(
  { nombre: "Juan" },
  { $set: { edad: 31 } }
)
```

#### Actualizar varios
```js
db.usuarios.updateMany(
  { edad: { $gt: 30 } },
  { $set: { activo: true } }
)
```

### Eliminar documentos

#### Eliminar uno
```js
db.usuarios.deleteOne({ nombre: "Luis" })
```

#### Eliminar varios
```js
db.usuarios.deleteMany({ edad: { $lt: 30 } })
```

---

### Operadores de Consulta Comunes

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `$eq`    | Igual a     | `{ edad: { $eq: 30 } }` |
| `$ne`    | Distinto de | `{ edad: { $ne: 30 } }` |
| `$gt`    | Mayor que   | `{ edad: { $gt: 30 } }` |
| `$gte`   | Mayor o igual | `{ edad: { $gte: 30 } }` |
| `$lt`    | Menor que   | `{ edad: { $lt: 30 } }` |
| `$lte`   | Menor o igual | `{ edad: { $lte: 30 } }` |
| `$in`    | Está en una lista | `{ edad: { $in: [25, 30] } }` |
| `$nin`   | No está en una lista | `{ edad: { $nin: [25, 30] } }` |
| `$and`   | Y lógico    | `{ $and: [ { edad: { $gt: 25 } }, { edad: { $lt: 35 } } ] }` |
| `$or`    | O lógico    | `{ $or: [ { nombre: "Juan" }, { nombre: "Ana" } ] }` |
| `$not`   | Negación    | `{ edad: { $not: { $gt: 30 } } }` |

---

✅ Con esto puedes realizar las operaciones básicas de cualquier aplicación usando MongoDB.


## 3. Modelado de Datos en MongoDB

MongoDB es una base de datos NoSQL orientada a documentos. Diseñar correctamente tus colecciones y documentos es clave para el rendimiento y la escalabilidad.

---

### 1. ¿Cuándo usar documentos embebidos vs referencias?

#### 📌 Documentos Embebidos (Embedded Documents)

**Úsalos cuando:**
- La relación es uno-a-uno o uno-a-muchos y los datos siempre se acceden juntos.
- Los subdocumentos no crecen indefinidamente (como una lista limitada de citas o direcciones).

**Ejemplo:**
```json
{
  "nombre": "Carlos",
  "email": "carlos@mail.com",
  "appointments": [
    { "fecha": "2025-08-01", "servicio": "Baño" },
    { "fecha": "2025-08-15", "servicio": "Corte" }
  ]
}
```

#### 🔗 Referencias (Normalization)

**Úsalas cuando:**
- Los datos relacionados se usan por separado o son muy grandes.
- Hay muchas referencias (muchos-a-muchos).
- Quieres evitar duplicación y facilitar actualizaciones.

**Ejemplo:**
```json
// Colección clientes
{
  "_id": "123",
  "nombre": "Carlos",
  "email": "carlos@mail.com"
}

// Colección citas
{
  "cliente_id": "123",
  "fecha": "2025-08-01",
  "servicio": "Baño"
}
```

---

### 2. Anidar Subdocumentos

MongoDB permite anidar documentos dentro de otros documentos.

**Ventajas:**
- Simplicidad al consultar (`db.clientes.find()` ya devuelve todo).
- Operaciones atómicas sobre el documento completo.

**Ejemplo de uso (como tu campo `Appointments`):**
```json
{
  "nombre": "Ana",
  "appointments": [
    { "fecha": "2025-08-02", "tipo": "Corte", "estado": "completado" },
    { "fecha": "2025-08-10", "tipo": "Baño", "estado": "pendiente" }
  ]
}
```

---

### 3. Normalización vs Desnormalización

| Concepto        | Normalización                       | Desnormalización                         |
|-----------------|--------------------------------------|-------------------------------------------|
| Estructura      | Usa referencias entre documentos     | Usa documentos embebidos                  |
| Ventaja         | Menor duplicación, datos consistentes | Lecturas rápidas, menos joins            |
| Desventaja      | Más consultas para juntar datos      | Duplicación, más difícil de actualizar    |
| Recomendado cuando | Relaciones complejas, datos separados | Datos consultados juntos frecuentemente |

---

### 4. Buenas Prácticas en Diseño de Colecciones

✅ **Diseña según los patrones de acceso.**  
Diseña para que la mayoría de las consultas se puedan hacer con una sola operación.

✅ **Usa embebidos para datos que siempre se usan juntos.**  
Por ejemplo, contactos de emergencia, historial de mascota, direcciones.

✅ **Usa referencias si los datos embebidos crecen sin límite.**  
Evita que un solo documento se haga demasiado grande.

✅ **Limita el tamaño de los documentos.**  
Evita documentos de más de 16 MB (límite de MongoDB).

✅ **Incluye solo los campos necesarios.**  
No pongas campos vacíos o innecesarios.

✅ **Indexa adecuadamente.**  
Usa índices para los campos que usas en consultas (`find`, `sort`, `update`, etc.).

---

Con un buen modelado puedes lograr rendimiento, escalabilidad y claridad en tus datos en MongoDB.


## 4. Comandos y Utilidades de la Shell de MongoDB

La shell de MongoDB (`mongosh`) es una herramienta interactiva para trabajar directamente con tu base de datos.

---

### 1. Navegación entre bases de datos

#### Mostrar bases de datos
```js
show dbs
```

#### Usar una base de datos (y crearla si no existe)
```js
use mi_base
```

#### Crear una colección
```js
db.createCollection("clientes")
```

#### Eliminar la base de datos actual
```js
db.dropDatabase()
```

---

### 2. Listar colecciones

```js
show collections
```

---

### 3. Exportar e Importar Datos

#### Exportar una colección a JSON o CSV
```bash
mongoexport --db mi_base --collection clientes --out clientes.json
mongoexport --db mi_base --collection clientes --type=csv --fields nombre,email --out clientes.csv
```

#### Importar datos desde un archivo JSON o CSV
```bash
mongoimport --db mi_base --collection clientes --file clientes.json
mongoimport --db mi_base --collection clientes --type=csv --headerline --file clientes.csv
```

---

### 4. Uso del campo `_id` y claves personalizadas

MongoDB crea automáticamente un campo `_id` único por cada documento:

```json
{
  "_id": ObjectId("64ed3d9c3f1b9c59c9b2a401"),
  "nombre": "Laura",
  "email": "laura@mail.com"
}
```

#### Personalizar el campo `_id`
Puedes asignar un valor personalizado como `_id` (por ejemplo, un email o un número de cliente):

```js
db.clientes.insertOne({
  _id: "carlos@mail.com",
  nombre: "Carlos",
  telefono: "1234567890"
})
```

#### Acceder a documentos por `_id`
```js
db.clientes.find({ _id: "carlos@mail.com" })
```

⚠️ Si insertas un documento con un `_id` duplicado, se generará un error.

---

Con estos comandos y herramientas puedes administrar bases de datos y colecciones, automatizar backups o migraciones, y trabajar con claves personalizadas eficientemente.


## 5. Consultas Avanzadas en MongoDB

Dominar las consultas en MongoDB te permite aprovechar al máximo su flexibilidad.

---

### 1. Proyección de campos

Puedes mostrar solo algunos campos de los documentos con una **proyección**:

```js
db.clientes.find({}, { nombre: 1, email: 1, _id: 0 })
```

Esto muestra solo los campos `nombre` y `email`, ocultando `_id`.

---

### 2. Ordenamientos y límites

#### Ordenar resultados
```js
db.clientes.find().sort({ edad: 1 })      // Ascendente
db.clientes.find().sort({ edad: -1 })     // Descendente
```

#### Limitar resultados
```js
db.clientes.find().limit(5)
```

#### Saltar documentos (útil para paginación)
```js
db.clientes.find().skip(5).limit(5)
```

---

### 3. Búsquedas por fechas

MongoDB almacena fechas en formato `ISODate`.

#### Buscar documentos por fecha exacta
```js
db.citas.find({ fecha: ISODate("2025-08-05T00:00:00Z") })
```

#### Rango de fechas
```js
db.citas.find({
  fecha: {
    $gte: ISODate("2025-08-01T00:00:00Z"),
    $lte: ISODate("2025-08-31T23:59:59Z")
  }
})
```

---

### 4. Búsquedas dentro de arrays

#### Buscar si un valor está en un array
```js
db.usuarios.find({ roles: "admin" })
```

#### Buscar con múltiples valores posibles
```js
db.usuarios.find({ roles: { $in: ["admin", "editor"] } })
```

---

### 5. Búsquedas en subdocumentos

#### Buscar por campos internos
```js
db.clientes.find({ "direccion.ciudad": "Bogotá" })
```

#### Buscar dentro de arrays de subdocumentos
```js
db.clientes.find({ "appointments.servicio": "Baño" })
```

#### Buscar si algún subdocumento cumple múltiples condiciones
```js
db.clientes.find({
  appointments: {
    $elemMatch: {
      servicio: "Corte",
      estado: "pendiente"
    }
  }
})
```

---

Estas consultas avanzadas te permiten trabajar con estructuras complejas de datos y filtrar exactamente lo que necesitas.


## 6. Agregaciones en MongoDB

El **Aggregation Framework** permite realizar análisis y transformaciones complejas sobre los datos, similar a consultas SQL con `GROUP BY`, `JOIN`, `SUM`, etc.

---

### 1. Introducción al Aggregation Framework

Se usa el método `.aggregate()` con una **pipeline** (tubería) de etapas:

```js
db.coleccion.aggregate([
  { etapa1 },
  { etapa2 },
  ...
])
```

Cada etapa transforma los datos antes de pasarlos a la siguiente.

---

### 2. Operadores comunes

#### `$match` – Filtra documentos (como `find`)
```js
{ $match: { servicio: "Baño" } }
```

#### `$group` – Agrupa documentos y aplica agregaciones
```js
{ $group: { _id: "$servicio", total: { $sum: 1 } } }
```

#### `$project` – Selecciona o transforma campos
```js
{ $project: { nombre_completo: { $concat: ["$nombre", " ", "$apellido"] } } }
```

#### `$sort` – Ordena resultados
```js
{ $sort: { total: -1 } }
```

#### `$limit` – Limita el número de resultados
```js
{ $limit: 5 }
```

#### `$lookup` – Une colecciones (similar a JOIN)
```js
{
  $lookup: {
    from: "clientes",
    localField: "cliente_id",
    foreignField: "_id",
    as: "cliente_info"
  }
}
```

---

### 3. Casos comunes

#### 📊 Contar número de citas por cliente
```js
db.citas.aggregate([
  { $group: { _id: "$cliente_id", totalCitas: { $sum: 1 } } }
])
```

#### 🧼 Agrupar y contar servicios prestados
```js
db.citas.aggregate([
  { $group: { _id: "$servicio", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])
```

#### 💰 Sumar valores totales (por ejemplo, ingresos)
```js
db.citas.aggregate([
  { $group: { _id: null, ingresosTotales: { $sum: "$precio" } } }
])
```

#### 🧾 Mostrar citas con datos del cliente
```js
db.citas.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "cliente"
    }
  },
  { $unwind: "$cliente" },
  {
    $project: {
      servicio: 1,
      fecha: 1,
      "cliente.nombre": 1
    }
  }
])
```

---

Con el Aggregation Framework puedes generar reportes, estadísticas y análisis potentes directamente desde MongoDB.

## 7. Índices en MongoDB

Los **índices** mejoran la eficiencia de las consultas al permitir que MongoDB busque más rápido los documentos que coinciden con ciertos criterios.

---

### 1. ¿Qué es un índice?

Un índice es una estructura de datos que almacena una parte del conjunto de datos de una colección de forma que permite acceder a ellos rápidamente.

Sin un índice, MongoDB debe escanear todos los documentos (full collection scan) para resolver una consulta, lo que es ineficiente.

---

### 2. Crear un índice con `createIndex()`

```js
db.clientes.createIndex({ nombre: 1 })      // Índice ascendente
db.clientes.createIndex({ edad: -1 })       // Índice descendente
```

Consulta que se beneficia:
```js
db.clientes.find({ nombre: "Carlos" })
```

Para ver los índices de una colección:
```js
db.clientes.getIndexes()
```

---

### 3. Índices compuestos

Un índice compuesto usa más de un campo. El orden de los campos importa.

```js
db.clientes.createIndex({ ciudad: 1, edad: -1 })
```

Este índice se puede usar para:
- Buscar por `ciudad`
- Buscar por `ciudad` y `edad`
❌ No se puede usar eficientemente solo por `edad`.

---

### 4. Índices para campos anidados

Puedes crear índices sobre campos dentro de subdocumentos:

```js
db.clientes.createIndex({ "direccion.ciudad": 1 })
```

Consulta compatible:
```js
db.clientes.find({ "direccion.ciudad": "Bogotá" })
```

---

### 5. Índices sobre arrays

MongoDB indexa automáticamente cada elemento del array.

```js
db.usuarios.createIndex({ roles: 1 })
```

Consulta compatible:
```js
db.usuarios.find({ roles: "admin" })
```

---

✅ Usar índices correctamente puede acelerar tus consultas de forma significativa.  
⚠️ Tener demasiados índices puede aumentar el costo de inserciones y actualizaciones.

---

#### Extra: Eliminar un índice

```js
db.clientes.dropIndex("nombre_1")
```

---

Usa siempre `explain()` para evaluar el uso de índices:

```js
db.clientes.find({ nombre: "Carlos" }).explain("executionStats")
```


## 8. Seguridad y Autenticación en MongoDB

Proteger tus bases de datos es esencial. MongoDB ofrece autenticación basada en roles y mecanismos para limitar el acceso, tanto en entornos locales como en la nube (MongoDB Atlas).

---

### 1. Crear usuarios con roles

MongoDB permite crear usuarios con diferentes niveles de acceso mediante roles.

#### Habilitar autenticación

Asegúrate de iniciar MongoDB con autenticación habilitada:

```bash
mongod --auth --dbpath /var/lib/mongodb
```

#### Conectarse como administrador

Primero conecta a la base de datos `admin` como usuario con privilegios:

```bash
mongo
use admin
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```

#### Crear un usuario para una base específica

```js
use mi_negocio
db.createUser({
  user: "andres",
  pwd: "andres123",
  roles: [ { role: "readWrite", db: "mi_negocio" } ]
})
```

---

### 2. Autenticación básica en MongoDB

Para conectarte con usuario y contraseña:

```bash
mongo -u andres -p andres123 --authenticationDatabase mi_negocio
```

Desde una URI (útil para aplicaciones):

```
mongodb://andres:andres123@localhost:27017/mi_negocio
```

---

### 3. Seguridad en MongoDB Atlas

MongoDB Atlas (la nube oficial de MongoDB) tiene medidas adicionales de seguridad.

#### Reglas básicas:

- **Whitelist de IPs**: solo se permite conexión desde IPs autorizadas.
- **Usuarios y roles**: cada base tiene sus propios usuarios.
- **Cifrado**: datos cifrados en tránsito (TLS) y en reposo.
- **Opciones de conexión seguras**: Atlas ofrece una URI segura para conexión.

#### Crear un usuario en Atlas

1. Ve a tu proyecto en Atlas.
2. Dirígete a **Database Access** > **Add New Database User**.
3. Define el usuario, contraseña y permisos (por ejemplo: "readWriteAnyDatabase").
4. Añade la IP de tu red en **Network Access**.

---

🔐 **Buenas prácticas**:

- No usar el usuario `admin` para la aplicación.
- Usar contraseñas seguras.
- Limitar el acceso por IP.
- Mantener MongoDB actualizado.

---

## 9. Integración con Aplicaciones

MongoDB puede integrarse fácilmente con varios lenguajes y frameworks modernos para construir APIs, interfaces web y aplicaciones móviles.

---

### 1. Conectar MongoDB desde Node.js (con Mongoose)

#### Instalación de Mongoose

```bash
npm install mongoose
```

#### Conexión y uso básico

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mi_negocio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clienteSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// Crear un cliente
const nuevoCliente = new Cliente({ nombre: 'Ana', telefono: '1234567890' });
nuevoCliente.save();
```

---

### 2. Conectar desde Python (con PyMongo)

#### Instalación de PyMongo

```bash
pip install pymongo
```

#### Conexión y uso básico

```python
from pymongo import MongoClient

cliente = MongoClient("mongodb://localhost:27017/")
db = cliente["mi_negocio"]
coleccion = db["clientes"]

coleccion.insert_one({ "nombre": "Carlos", "telefono": "9876543210" })

for cliente in coleccion.find():
    print(cliente)
```

---

### 3. Crear APIs REST con Express + MongoDB

#### Ejemplo básico de API con Express y Mongoose

```bash
npm install express mongoose
```

```js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mi_negocio');

const Cliente = mongoose.model('Cliente', new mongoose.Schema({
  nombre: String,
  telefono: String
}));

// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

// Crear un cliente
app.post('/clientes', async (req, res) => {
  const nuevo = new Cliente(req.body);
  await nuevo.save();
  res.status(201).send(nuevo);
});

app.listen(3000, () => console.log('API activa en http://localhost:3000'));
```

---

### 4. Crear una interfaz web o móvil con los datos

#### Web: Usando HTML + JS + Fetch API

```html
<script>
fetch("http://localhost:3000/clientes")
  .then(res => res.json())
  .then(clientes => {
    clientes.forEach(c => {
      const div = document.createElement('div');
      div.innerText = `${c.nombre} - ${c.telefono}`;
      document.body.appendChild(div);
    });
  });
</script>
```

#### Móvil: Usando React Native o Flutter

- Con React Native puedes usar `axios` o `fetch` para consumir la API.
- Con Flutter, puedes usar `http.get()` para conectarte a tu backend Express.

---

✅ **Siguientes pasos sugeridos**:

- Implementar autenticación (JWT).
- Validar entradas con middleware.
- Desplegar tu API y base de datos en servicios como Render, Vercel o MongoDB Atlas.

---

## 10. MongoDB en Producción

Implementar MongoDB en producción requiere buenas prácticas de respaldo, rendimiento, seguridad y monitoreo para garantizar disponibilidad y eficiencia.

---

### 1. Respaldos (Backups)

#### Usando `mongodump` (exportar)

```bash
mongodump --db=mi_negocio --out=/respaldo/mongodump
```

> Esto crea una copia binaria de toda la base de datos.

#### Usando `mongorestore` (importar)

```bash
mongorestore --db=mi_negocio /respaldo/mongodump/mi_negocio
```

> Útil para restaurar datos en caso de fallo o para migrar entornos.

---

### 2. Replicación y Clusters

#### Replica Set

Una réplica mantiene varias copias de los datos en distintos servidores.

- Ventajas:
  - Alta disponibilidad.
  - Tolerancia a fallos.
  - Lecturas escalables (usando réplicas secundarias).

```bash
mongod --replSet rs0 --port 27017 --dbpath /data/db1
```

```js
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]
});
```

#### Sharding (Cluster de Fragmentación)

- Divide los datos horizontalmente en varios servidores.
- Ideal para colecciones muy grandes.
- Usa `mongos` como router y requiere múltiples shards.

---

### 3. Buenas Prácticas de Rendimiento

- **Usar índices adecuados** (especialmente en campos de búsqueda).
- **Evitar documentos demasiado grandes** (>16MB).
- **Desnormalizar si es necesario** para reducir joins.
- **Evitar búsquedas sin filtro** en producción (`find({})`).
- **Limitar resultados** (`.limit(n)`) cuando sea posible.

---

### 4. Monitoreo con Atlas o Compass

#### MongoDB Atlas

- Plataforma en la nube con:
  - Panel de monitoreo en tiempo real.
  - Alertas, backups automáticos y escalabilidad.
  - Seguridad integrada y acceso IP controlado.

#### MongoDB Compass

- Cliente gráfico para escritorio.
- Permite:
  - Explorar datos y colecciones.
  - Ver índices, rendimiento y consultas lentas.
  - Monitorear tamaño y uso de la base.

---

✅ **Consejos Finales**:

- Programa respaldos automáticos.
- Usa entornos separados para desarrollo, pruebas y producción.
- Activa autenticación y roles personalizados.
- Audita regularmente el rendimiento y espacio en disco.
- Usa registros (`logs`) para detectar anomalías.

---
