// const ciudad = "Copacabana"
// const apiKey = ""

// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(`Temperatura en ${data.name}: ${data.main.temp}°C`);
//         console.log(`Clima: ${data.weather[0].description}`);
//     })
//     .catch(error => console.error("Error al obtener el clima: ", error));

const contra = "Aqui va la key";

document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const ciudad = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.textContent = "Consultando...";
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${contra}&units=metric&lang=es`)
        .then(response => {
            if (!response.ok) throw new Error("Ciudad no encontrada");
            return response.json();
        })
        .then(data => {
            const iconCode = data.weather[0].icon; 
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
            document.getElementById('weather-icon').src = iconUrl;
            resultDiv.innerHTML = `
                <strong>Ciudad:</strong> ${data.name}<br>
                <strong>Temperatura:</strong> ${data.main.temp}°C<br>
                <strong>Clima:</strong> ${data.weather[0].description}
            `;
        })
        .catch(error => {
            resultDiv.textContent = "Error: " + error.message;
        });
});