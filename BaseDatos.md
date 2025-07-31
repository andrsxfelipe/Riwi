## Base de datos relacional

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