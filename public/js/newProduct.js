const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{5,100}$/, // Letras y espacios, pueden llevar acentos.
    description: /^[a-zA-ZÀ-ÿ\s]{20,5000}$/, // Letras y espacios, pueden llevar acentos.
    category: /^\d{1,3}$/,
    quantity: /^\d{1,7}$/,
	price: /^\d{1,7}$/,	
}

const labels = {
    name: false,
    description: false,
    category: false,
    quantity: false,
    price: false
}

const validateForm = (e) => {
    switch (e.target.name) {
        case "name" :
            validateLabel(expressions.name, e.target, "name")
        break;
        case "description" :
            validateLabel(expressions.description, e.target, "description")
        break;
        case "category" :
            validateLabel(expressions.category, e.target, "category")
        break;
        case "quantity" :
            validateLabel(expressions.quantity, e.target, "quantity")
        break;
        case "price" :
            validateLabel(expressions.price, e.target, "price")
        break;
    }

}

const validateLabel = (expression, input, label) => {
    if (expression.test(input.value)) {
        document.getElementById(`group-${label}`).classList.add("is-valid")
        document.getElementById(`group-${label}`).classList.remove("alert-danger")
        labels[label] = true
    } else {
        document.getElementById(`group-${label}`).classList.add("alert-danger")
        document.getElementById(`group-${label}`).classList.remove("is-valid")
        labels[label] = false
    }
}

inputs.forEach ((input) => {
    input.addEventListener('keyup', validateForm)
    input.addEventListener('blur', validateForm)
})

form.addEventListener('submit', (e) => {

    if (labels.name == true && labels.description == true && labels.category == true && labels.quantity == true && labels.price == true) {
          form.submit();
        } else {
            e.preventDefault()
        }
    })