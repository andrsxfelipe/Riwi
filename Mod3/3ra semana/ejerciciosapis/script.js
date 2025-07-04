function obtenerClima(ciudad){
    return new Promise((resolve,reject) =>{
        const apiKey = "df67b3d9d6624322cd9611293d7fc767";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
        fetch(url)
            .then(response => {
                if (!response.ok){
                    reject('Ciudad no encontrada');
                }
                return response.json();
            })
            .then (data => {
                resolve({
                    ciudad: data.name,
                    temperatura: data.main.temp,
                    descripcion: data.weather[0].description
                });
            })
            .catch(error => reject('Error de red: ', error));
    });
}
// obtenerClima('Medellin')
    // .then(info =>{
        // console.log(`Clima en ${info.ciudad}: ${info.temperatura}°C, ${info.descripcion}`);
    // })
    // .catch(error => {
        // console.log('Error', error);
    // })



function obtenerImagenes(objeto){
    return new Promise ((resolve,reject) =>{
        const apiKey = '51147775-d66a60b587198e9f674e4defd'
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${objeto}&lang=es`
        fetch(url)
            .then(response => {
                if (!response.ok){
                    reject('Búsqueda no encontrada')
                }
                return response.json();
            })
            .then(data => {
                resolve({
                    largo: data.hits[0].largeImageURL
                })
            })
            .catch(error => reject ('Error de red: ', error))
    })
}
// obtenerImagenes('Carros')
//     .then(info => {
//         console.log(info);
//         console.log(`Large url: ${info.largo}`)
//     })
//     .catch(error => {
//         console.log('Error', error);
//     })


function consultarLibro(libro){
    return new Promise((resolve,reject) => {
        url = `https://openlibrary.org/search.json?q=${libro.replace(/ /g,'+')}`
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok){
                    reject('BUsqueda no encontrada');
                }
                return response.json();
            })
            .then(data => {
                resolve({
                    informacion: data.docs[0]
                })
            })
            .catch(error => reject ('Error de red: ', error))
    })
}

// consultarLibro("Lord of rings")
//     .then(info=>{
//         console.log(info);
//     })
//     .catch(error =>{
//         console.log('Error',error);
//     })


function traerTrivia(numeroPreguntas){
    return new Promise((resolve,reject) => {
        url = `https://opentdb.com/api.php?amount=${numeroPreguntas}`
        fetch(url)
            .then(response => {
                if(!response.ok){
                    reject('Ha ocurrido un error')
                }
                return response.json();
            })
            .then(data => {
                resolve({
                    preguntas: data.results
                })
            })
            .catch(error => reject('Error: ',error))
    })
}

// traerTrivia(10)
//     .then(info=>{
//         console.log(info);
//     })
//     .catch(error => {
//         console.log(error);
//     })


function rickAndMorty(info){
    return new Promise((resolve,reject) => {
        url = `https://rickandmortyapi.com/api/${info}`
        fetch(url)
            .then(response => {
                if (!response.ok){
                    reject('HUbo un error')
                }
                return response.json();
            })
            .then(data =>{
                resolve({
                    info: data.results
                })
            })
            .catch(error => reject('Error', error))
    })
}

// rickAndMorty('character')
//     .then( info =>{
//         console.log(info);
//     })
//     .catch(error =>{
//         console.log('Error', error);
//     })

function otraApi(){
    return new Promise((resolve,reject) => {
        url = `` 
        fetch(url)
            .then(response => {
                if (!response.ok){
                    reject('Ha ocurrido un error')
                }
                return response.json();
            })
            .then(data => {
                resolve({
                info: data
            })
        })
            .catch(error => reject('Error: ',error))
    })
}

// otraApi()
//     .then(info =>{
//         console.log(info);
//     })
//     .catch(error =>{
//         console.log(error);
//     })



function chistes(categoria){
    return new Promise((resolve,reject) => {
        const url = `https://v2.jokeapi.dev/joke/${categoria}?lang=es`
        fetch(url)
            .then(response => {
                if (!response.ok){
                    reject('Hubo un error')
                }
                return response.json();
            })
            .then(data => {
                resolve({
                    chiste: data.joke,
                    pregunta: data.setup,
                    respuesta: data.delivery
                })
            })
            .catch(error => reject('Error: ',error))
    })
}

chistes('Dark') //Programming, misc, dark, pun, spooky, christmas
    .then(info => {
        console.log(info);
    })
    .catch(error => {
        console.log(error);
    })




































