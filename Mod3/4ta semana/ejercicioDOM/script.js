function cambiar_title() {
    if (document.getElementById('titulo').textContent == "Adios") {
        document.getElementById('titulo').textContent = "Hola"
    } else {
        document.getElementById('titulo').textContent = "Adios"
    }
}

var contar = 0;

function contador() {
    let count = 0;
    return function () {
        count++;
        return count
    };
}

const miContador = contador()

const add_something = () => {
    
    nuevo_li = document.createElement('li')
    nuevo_li.textContent = `Casa ${miContador()}`
    document.getElementById('lista').appendChild(nuevo_li)
}