function fizzbuzz (){
    let insercion;
    for (var i = 1; i<101; i++){
        if (i%3 == 0 && i%5 == 0){
            insercion = "FizzBuzz"
        } else if (i%3 == 0){
            insercion = ("Fizz")
        } else if (i%5 == 0){
            insercion = ("Buzz")
        } else {
            insercion = (i)
        }
        document.getElementById("FizzBuzz").textContent += insercion + "\n"
    }
}
fizzbuzz()