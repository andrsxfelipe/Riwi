/*
Crea una interfaz en HTML que contenga:
•    Un campo de entrada de texto (input) para escribir nuevas tareas.
•    Un botón para agregar la tarea a la lista.
•    Una sección (ul o div) donde se mostrarán las tareas.
Usando JavaScript:
•    Al hacer clic en el botón, la tarea escrita en el input debe agregarse a la lista.
•    Cada tarea debe mostrarse con:
•    El texto de la tarea.
•    Un botón para marcarla como “completada” (cambia su estilo, por ejemplo, tachado).
•    Un botón para eliminarla de la lista.
Agrega validaciones para:
•    No permitir agregar tareas vacías.
•    Eliminar correctamente la tarea al hacer clic en el botón correspondiente.

Extras (opcional):
    •    Permite presionar Enter para agregar tareas.
    •    Guarda las tareas en localStorage para que se mantengan al recargar la página.
    •    Muestra cuántas tareas hay pendientes.
*/

// Cambio de estado para las tareas pendiente ------------------------------------
document.querySelector('.lista').addEventListener('change', function(e) {
    if (e.target.matches('input[type="checkbox"]') && e.target.checked) {
        const li = e.target.parentElement;
        document.querySelector('.lista_completed').appendChild(li);
    }
});

// Cambio de estado para las tareas hechas -----------------------------------------
document.querySelector('.lista_completed').addEventListener('change', function(e) {
    if (e.target.matches('input[type="checkbox"]') && !e.target.checked) {
        const li = e.target.parentElement;
        document.querySelector('.lista').appendChild(li);
    }
});

// Eliminar tarea -----------------------------------------------------------------
document.querySelector('.lista').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) { // Comentario 1
        e.target.closest('li').remove();
    }
});

document.querySelector('.lista_completed').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) { // Comentario 1
        e.target.closest('li').remove();
    }
});

    /* 
    Comentario 1:
    Esto asegura que solo se ejecute el código de eliminar cuando se hace 
    clic en el botón de eliminar, y no cuando se hace clic en otros 
    elementos del <li> (como el checkbox o el texto).
    */

// Agregar tarea -------------------------------------------------------------------
document.getElementById("form_tarea").addEventListener("submit", (event) => {
    event.preventDefault();
    

    const li = document.createElement("li");
    // checkbox
    const inp = document.createElement("input")
    inp.type = "checkbox" // inp.setAttribute("type", "checkbox") (otra forma de hacerlo)

    // texto
    tarea = document.getElementById("tarea").value;
    if (tarea == "") return
    const texto = document.createTextNode(tarea);

    // boton
    const boton = document.createElement("button");
    boton.innerHTML = "🗑️";
    boton.className = "btn-delete";
    // boton.type = "button";

    li.appendChild(inp);
    li.appendChild(texto);
    li.appendChild(boton);
    console.log(li);

    document.querySelector(".lista").appendChild(li);
    document.getElementById("tarea").value = "" ;
})