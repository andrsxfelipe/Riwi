
let operaciones = [];
let valorAct = ""

document.querySelectorAll(".num").forEach(button =>{
    button.addEventListener( "click", () => {
        event.preventDefault();
        const value = button.getAttribute("data-value");
        if(value == "+" || value == "*" || value == "/" || value == "-"){
            operaciones.push(valorAct)
            operaciones.push(value)
            valorAct =""
            console.log(operaciones)
            document.getElementById("operation").value +=value;
            return  
        }
        if (value == "="){
            operaciones.push(valorAct)
            console.log(operaciones)
            return
        }
        valorAct += value;
        console.log(operaciones)
        document.getElementById("operation").value +=value;
    })
})


    

/* let result = document.getElementById("form")

result.addEventListener("submit", function(event){ // result of the operation
    
    let input = document.getElementById("operation").value
    console.log(input)
    
}) 
 */
