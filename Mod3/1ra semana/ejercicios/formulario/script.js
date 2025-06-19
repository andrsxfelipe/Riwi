document.getElementById("formNotas").addEventListener("submit", function (e) {
    e.preventDefault();

    const notas = []
    for (let el of this.elements) {
        if (el.tagName == "INPUT") {
            let nota = Number(el.value)
            notas.push(nota)
        }
    }
    const suma = notas.reduce((i, j) => i + j, 0)
    promedio = suma / notas.length
    console.log(promedio)
});

// function promedio (event){
//     event.preventDefault(event);

// }
