function getDuplicatedValues(productsObject,productsSet){
    let objectCount = Object.keys(productsObject).length;
    let setCount = productsSet.size;
    
    if (objectCount === setCount) {
        console.log("No hay productos repetidos");
    }
    else{
        const productNames = Object.values(productsObject).map(product => product.name)
        let productAmounts = {}
        for (const i of productNames){
            productAmounts[i] = (productAmounts[i] || 0) + 1
        }
        for (const [j,k] of Object.entries(productAmounts)){
            if (k>1){
                console.log(`El Producto ${j}, se encuentra ${k} veces`);
            }
        }
    }
}

function addCategories(productsSet){
    const categories = []
    for (const i of productsSet){
        let category = prompt(`Ingrese una categoría para ${i}`);
        categories.push(category);
    }
    mapProducts = new Map(
        [...productsSet].map((product,i) => [product,categories[i]])
    );
    return mapProducts
}

function iterateAndValidateData(objectProducts, mapProducts, setProducts){
    console.log("Validación a partir de Objeto: ");
    for (i in objectProducts){
        prod_name = objectProducts[i].name
        prod_price = objectProducts[i].price
        console.log(`id del objeto: ${i}, propiedades: Nombre: ${prod_name}, precio: ${prod_price}`);
        if (!(+prod_price) || !(parseFloat(prod_price))) {
            console.log("   ↑↑ Corregir precio de este producto");
        }
    }

    console.log("Validacion de lista de productos a partir del set: ");
    for (j of [...setProducts]){
        console.log(j);
        if (!j){
            console.log("   ↑↑ El nombre de este producto no es válido");
        }
    }
    
    console.log("Validacion a partir del map: ");
    mapProducts.forEach((category, prod) => {
        console.log(`Producto: ${prod}, Categoria: ${category}`);
    })
}

let productsById = {
    1:{name:"TV",price:210},
    2:{name:"Laptop",price:400},
    3:{name:"Mouse",price:true},
    4:{name:"Laptop",price:450}
}
let products_set = new Set(Object.values(productsById).map(i => i.name));
let products_map = addCategories(products_set);
getDuplicatedValues(productsById,products_set);
iterateAndValidateData(productsById, products_map, products_set);