// Validate information
function productValidation(pet) {
    return (
        !!pet.name &&
        !!pet.breed &&
        !!pet.size &&
        pet.aggressive !== undefined
    );
}

// Show pets in the document, inside the ul
function getMethod(){
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(data => {
            let lista = document.querySelector(".listaPerros");
            lista.innerHTML="";
            data.forEach(element => {
                mostrar(element.name, element.id,element.breed, element.size, element.aggressive)
            });
        })
        .catch(error => console.log(error));
    }

// When the formAdd (Form to add pets) is sent, calls to the postMethod function
document.getElementById("formAdd").addEventListener('submit', function(event){
    event.preventDefault();
    const name = this.querySelector('input[placeholder="Pet Name"]').value;
    const breed = this.querySelector("input[placeholder='Breed']").value;
    const isAggressive = this.querySelector('select[id=aggressive]').value;
    const size = this.querySelector('select[id=size]').value;
    newPet = {
        name:name,
        breed:breed,
        size:size,
        aggressive:isAggressive
    };
    if (!productValidation(newPet)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }
    postMethod(newPet);
})

// Add new information. It receives an object as pharameter
function postMethod(nuevoPerro) {
    fetch('http://localhost:3000/dogs', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(nuevoPerro)
    })
    .then(response => response.json())
    .then(data => console.log("Perro agregado: ",data))
    .catch(error => console.log("Error: ", error))
}

// When the formEdit form is sent, get the information and then calls the putMethod function
document.getElementById("formEdit").addEventListener('submit', function(event){
    event.preventDefault();
    const id = this.querySelector('input[placeholder="Pet ID"]').value;
    const name = this.querySelector('input[placeholder="Pet Name"]').value;
    const breed = this.querySelector("input[placeholder='Breed']").value;
    const isAggressive = this.querySelector('select[id=aggressive]').value;
    const size = this.querySelector('select[id=size]').value;
    editedPet = {
        name:name,
        breed:breed,
        size:size,
        aggressive:isAggressive
    };
    if (!productValidation(editedPet)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }
    putMethod(editedPet,id);
})

// This function edits the information. Receives "num" for the pet id and "petToAdd" is the new information
function putMethod(petToAdd,num) {
    fetch(`http://localhost:3000/dogs/${num}`,{
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(petToAdd)
    })
    .then(response => {
        if (!response.ok) {
            alert("No se encontró un perro con ese ID para editar.");
            throw new Error("ID no encontrado");
        }
        return response.json();
    })
    .then(data => console.log("Perro editado: ",data))
    .catch(error => console.log("Error: ", error))
}

// When the formDelete form is sent, calls deletMethod function
document.getElementById("formDelete").addEventListener('submit', function(event){
    event.preventDefault();
    const id = this.querySelector('input[placeholder="Pet ID"]').value
    deleteMethod(id)
})

//It deletes a dog with num as ID and validates if the ID is right
function deleteMethod(num) {
    fetch(`http://localhost:3000/dogs/${num}`, {method: 'DELETE'})
    .then( response => {
        if (!response.ok) {
            alert("No se encontró un perro con ese ID para eliminar.");
            throw new Error("ID no encontrado");
        }
        console.log('Producto eliminado');
    })
    .catch(error => console.error('Error al eliminar producto: ',error))
}

// This function add the whole information that receives as pharameters and shows it in the DOM creating new Elements
function mostrar(name, id, breed, size, isAggressive){
    let lista = document.querySelector(".listaPerros");
    let li = document.createElement("li");
    let  tituloElement = document.createElement("h2")
    tituloElement.textContent = `${name} (Id: ${id})`
    let razaElement = document.createElement("p")
    razaElement.textContent = breed
    let infoElement = document.createElement("p")
    infoElement.textContent = `Size: ${size}, ${isAggressive ? 'Aggressive' : 'No aggressive'}`
    lista.appendChild(li)
    li.appendChild(tituloElement)
    li.appendChild(razaElement)
    li.appendChild(infoElement)
}