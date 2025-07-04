# Sistema de Información de Perros

Este proyecto es una aplicación web sencilla que permite a los usuarios gestionar una lista de perros. Los usuarios pueden agregar, editar y eliminar registros de perros, así como visualizar la lista de perros en una interfaz amigable.

## Estructura del Proyecto

El proyecto consta de los siguientes archivos:

- **index.html**: Contiene la estructura HTML de la aplicación. Incluye secciones para mostrar la lista de perros y formularios para agregar, editar y eliminar mascotas.
- **script.js**: Contiene el código JavaScript que maneja la funcionalidad de la aplicación. Incluye funciones para validar la información, obtener datos del servidor, agregar, editar, eliminar mascotas y mostrar la lista en el DOM.
- **style.css**: Contiene los estilos de la aplicación, definiendo la apariencia visual de los elementos HTML.
- **db.json**: Sirve como base de datos simulada, con un arreglo de objetos perro, cada uno con propiedades como id, nombre, raza, tamaño y si es agresivo o no.

## Funcionalidades

- **Agregar perro**: Permite agregar un nuevo perro completando un formulario con nombre, raza, tamaño y si es agresivo.
- **Editar perro**: Permite modificar los datos de un perro existente ingresando su ID y la nueva información.
- **Eliminar perro**: Permite eliminar un perro de la lista ingresando su ID.
- **Ver perros**: Permite visualizar la lista de todos los perros registrados en el sistema.

## Uso

1. Abre `index.html` en un navegador web para acceder a la aplicación.
2. Utiliza los formularios para agregar, editar o eliminar perros.
3. Haz clic en el botón "Mostrar perros" para visualizar la lista de perros.

## Requisitos

- Un servidor local ejecutándose en `http://localhost:3000` para manejar las peticiones API de agregar, editar y eliminar perros.