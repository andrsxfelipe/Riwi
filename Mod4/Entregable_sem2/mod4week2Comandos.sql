CREATE DATABASE gestion_academica_universidad;

USE gestion_academica_universidad;

CREATE TABLE estudiantes (
id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
nombre_completo VARCHAR(50) NOT NULL,
correo_electronico VARCHAR(50) NOT NULL,
genero VARCHAR(10),
identificacion VARCHAR(20) UNIQUE NOT NULL,
carrera VARCHAR(100),
fecha_nacimiento DATE,
fecha_ingreso DATE
);

CREATE TABLE docentes (
id_docente INT PRIMARY KEY AUTO_INCREMENT,
nombre_completo VARCHAR(50) NOT NULL,
correo_institucional VARCHAR(50) UNIQUE NOT NULL,
departamento_academico VARCHAR(100) NOT NULL,
anios_experiencia INT,
CHECK (anios_experiencia >= 0)
);

CREATE TABLE cursos (
id_curso INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL,
codigo VARCHAR(20) UNIQUE NOT NULL,
creditos INT,
semestre INT,
id_docente INT,
FOREIGN KEY (id_docente) REFERENCES docentes(id_docente)
);

CREATE TABLE inscripciones (
id_inscripcion INT PRIMARY KEY AUTO_INCREMENT,
id_estudiante INT,
FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
id_curso INT,
FOREIGN KEY (id_curso) REFERENCES cursos(id_curso),
fecha_inscripcion DATE,
calificacion_final DECIMAL(10,2)
);

INSERT INTO estudiantes (nombre_completo, correo_electronico, genero, identificacion, carrera, fecha_nacimiento, fecha_ingreso) VALUES
('Andres Felipe Londono', 'aflondonol@eafit.edu.co', 'Masculino', '1000291777', 'Ingenieria', '2002-01-30', '2019-01-20'),
('Pablo Jimenez Mora', 'pajimora@eafit.edu.co', 'Masculino', '1000123456', 'Ingenieria', '2001-04-15', '2018-01-20'),
('Santiago Giraldo Herrera', 'ansangi@eafit.edu.co', 'Masculino', '1000234567', 'Mercadeo', '1998-05-15', '2018-01-20'),
('Alba Mery Londono', 'albalondono@eafit.edu.co', 'Femenino', '43625491', 'Administracion', '1984-03-06', '2025-06-20'),
('Helen Sanchez Londono', 'helensanz@eafit.edu.co', 'Femenino', '1000345678', 'Lenguajes', '2005-03-10', '2025-06-20');

INSERT INTO docentes (nombre_completo, correo_institucional, departamento_academico, anios_experiencia) VALUES 
('Juan Felipe Restrepo', 'jfrestrepo@eafit.edu.co','Ciencias Aplicadas e Ingenieria',20),
('Maria Isabel Hernandez','mphernandez@eafit.edu.co','Ciencias Aplicadas e Ingenieria', 20),
('Juan Carlos Perez','jcperez@eafit.edu.co','Administracion y Finanzas',10); 

INSERT INTO cursos (nombre, codigo, creditos, semestre, id_docente) VALUES
('Big Data y Bioinformatica', '01', 4, 5, 1),
('Fisiologia Vegetal', '02', 4, 4, 2),
('Agricultura de precision', '03', 4, 7, 1),
('Administracion Estrategica', '04', 4, 6, 3);

INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES
(1,1,'2025-07-29',5),
(1,2,'2025-07-29',4.6),
(1,3,'2025-07-29',4.0),
(2,1,'2025-07-29',3.5),
(3,4,'2025-07-29',1.9),
(4,4,'2025-07-29',4.5),
(5,4,'2025-07-29',3.5),
(2,3,'2025-07-29',4.8);

-- Obtener el listado de todos los estudiantes junto con sus inscripciones y cursos (JOIN).
SELECT e.nombre_completo AS Estudiante, c.nombre AS Curso
FROM estudiantes e
LEFT JOIN inscripciones m ON e.id_estudiante = m.id_estudiante
LEFT JOIN cursos c ON m.id_curso = c.id_curso;

-- Listar los cursos dictados por docentes con más de 5 años de experiencia.
SELECT c.nombre AS Curso, p.nombre_completo AS Docente, p.anios_experiencia AS Experiencia
FROM cursos c 
LEFT JOIN docentes p ON c.id_docente = p.id_docente 
WHERE p.anios_experiencia > 5;

-- Obtener el promedio de calificaciones por curso 
SELECT c.nombre AS Curso, AVG(calificacion_final) AS Promedio
FROM cursos c
JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.id_curso; 

-- Mostrar los estudiantes que están inscritos en más de un curso
SELECT e.nombre_completo, COUNT(i.id_curso) AS Inscripciones
FROM estudiantes e join inscripciones i ON e.id_estudiante = i.id_estudiante
GROUP BY e.id_estudiante
HAVING COUNT(i.id_curso)> 1;

-- Agregar una nueva columna estado_academico a la tabla estudiantes
ALTER TABLE estudiantes ADD estado_academico VARCHAR(20);

-- Eliminar un docente y observar el efecto en la tabla cursos
DELETE FROM docentes WHERE id_docente = 3; -- ERROR

-- Consultar los cursos en los que se han inscrito más de 2 estudiantes
SELECT c.nombre, COUNT(i.id_estudiante) AS Inscritos
FROM cursos c JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.id_curso
HAVING COUNT(i.id_estudiante) > 2;

-- Obtener los estudiantes cuya calificación promedio es superior al promedio general
SELECT nombre_completo
FROM estudiantes e
WHERE id_estudiante IN (
SELECT id_estudiante
FROM inscripciones
GROUP BY (id_estudiante) HAVING AVG(calificacion_final) >
(SELECT AVG(calificacion_final) FROM inscripciones)
);

-- Mostrar los nombres de las carreras con estudiantes inscritos en cursos del semestre 2 o posterior
SELECT DISTINCT carrera FROM estudiantes
WHERE id_estudiante IN (
SELECT id_estudiante
FROM inscripciones
JOIN cursos on inscripciones.id_curso = cursos.id_curso WHERE cursos.semestre > 5
);

-- Vista

CREATE VIEW vista_historial_academico AS
SELECT e.nombre_completo AS Nombre_del_estudiante,
c.nombre AS Nombre_del_curso,
d.nombre_completo AS Nombre_del_docente,
c.semestre AS Semestre,
i.calificacion_final AS Calificacion_final
FROM estudiantes e
JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
JOIN cursos c ON i.id_curso = c.id_curso
JOIN docentes d ON c.id_docente  = d.id_docente;

SELECT * FROM vista_historial_academico;

-- Asigna permisos de solo lectura a un rol llamado revisor_academico sobre la vista vista_historial_academico (GRANT SELECT)
CREATE ROLE revisor_academico;
GRANT SELECT ON vista_historial_academico TO revisor_academico;

-- Revoca los permisos de modificación de datos sobre la tabla inscripciones a este rol (REVOKE).
REVOKE INSERT, UPDATE, DELETE ON inscripciones FROM revisor_academico; -- AL CREAR UN ROL POR DEFECTO, SE CREA SIN NINGÚN PRIVILEGIO 

-- Simula una operación de actualización de calificaciones usando BEGIN, SAVEPOINT, ROLLBACK y COMMIT.
BEGIN;

UPDATE inscripciones
SET calificacion_final = 4.7
WHERE id_inscripcion = 1 AND id_curso = 3;

SAVEPOINT primer_cambio;

UPDATE inscripciones
SET calificacion_final = 4.4
WHERE id_inscripcion = 2 AND id_curso = 3;

SAVEPOINT segundo_cambio;

ROLLBACK TO primer_cambio;

COMMIT;





