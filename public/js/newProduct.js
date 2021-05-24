const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const textArea = document.querySelectorAll("#form textarea")
const reset = document.getElementById("reset")

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
    imagen: false,
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
            validateDescription(expressions.description, e.target, "description")
        break;
        case "imagen" :
            validateImagen()
            validateImagenExtension()
        break;
        case "category" :
            validateCategory()
        break;
        case "quantity" :
            validateQuantity()
        break;
        case "price" :
            validatePrice()
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

const validateDescription = () => {
    const description = document.getElementById("description")
    
    if (description.value.length > 20) {
        document.getElementById("group-description").classList.add("is-valid")
        document.getElementById("group-description").classList.remove("alert-danger")
        labels["description"] = true
    } else {
        document.getElementById("group-description").classList.add("alert-danger")
        document.getElementById("group-description").classList.remove("is-valid")
        labels["description"] = false
    }
}

const validateCategory = () => {
    const category = document.getElementById("category")
    if (category.value.length === 0) {
        document.getElementById("group-category").classList.add("alert-danger")
        document.getElementById("group-category").classList.remove("is-valid")
        labels["category"] = false
    } else {
        document.getElementById("group-category").classList.add("is-valid")
        document.getElementById("group-category").classList.remove("alert-danger")
        labels["category"] = true
    }
}

const validateQuantity = () => {
    const quantity = document.getElementById("quantity")
    if (quantity.value === "0" || quantity.value.length === 0) {
        document.getElementById("group-quantity").classList.add("alert-danger")
        document.getElementById("group-quantity").classList.remove("is-valid")
        labels["quantity"] = false
    } else {
        document.getElementById("group-quantity").classList.add("is-valid")
        document.getElementById("group-quantity").classList.remove("alert-danger")
        labels["quantity"] = true
    }
}

const validatePrice = () => {
    const price = document.getElementById("price")
    if (price.value === "0" || price.value.length === 0) {
        document.getElementById("group-price").classList.add("alert-danger")
        document.getElementById("group-price").classList.remove("is-valid")
        labels["price"] = false
    } else {
        document.getElementById("group-price").classList.add("is-valid")
        document.getElementById("group-price").classList.remove("alert-danger")
        labels["price"] = true
    }
}

const validateImagen = () => {
    const imagen = document.getElementById("imagen");

    if (imagen.value.length == 0) {
        document.getElementById("group-imagen").classList.add("alert-danger")
        document.getElementById("group-imagen").classList.remove("is-valid")
        labels["imagen"] = false
    } else {
        document.getElementById("group-imagen").classList.add("is-valid")
        document.getElementById("group-imagen").classList.remove("alert-danger")
        labels["imagen"] = true
    }
}

const validateImagenExtension = () => {
    const imagen = document.getElementById("imagen");
    const acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png'];
    const parts = imagen.value.split('.');
    const extension = parts[parts.length-1];
    if (!acceptedExtensions.includes(extension)){
        document.getElementById("group-imagen").classList.add("alert-danger")
        document.getElementById("group-imagen").classList.remove("is-valid")
        labels["imagen"] = false 
    } else {
        document.getElementById("group-imagen").classList.add("is-valid")
        document.getElementById("group-imagen").classList.remove("alert-danger")
        labels["imagen"] = true
    }
}

inputs.forEach ((input) => {
    input.addEventListener('keyup', validateForm)
    input.addEventListener('blur', validateForm)
})

textArea.forEach((textarea) => {
    textarea.addEventListener('keyup', validateForm)
    textarea.addEventListener('blur', validateForm)
})

reset.addEventListener ('click', function () {
    document.getElementById("group-name").classList.remove('is-valid')
    document.getElementById("group-name").classList.remove('alert-danger')
    document.getElementById("group-description").classList.remove('is-valid')
    document.getElementById("group-description").classList.remove('alert-danger')
    document.getElementById("group-imagen").classList.remove('is-valid')
    document.getElementById("group-imagen").classList.remove('alert-danger')
    document.getElementById("group-category").classList.remove('is-valid')
    document.getElementById("group-category").classList.remove('alert-danger')
    document.getElementById("group-quantity").classList.remove('is-valid')
    document.getElementById("group-quantity").classList.remove('alert-danger')
    document.getElementById("group-price").classList.remove('is-valid')
    document.getElementById("group-price").classList.remove('alert-danger')
})



form.addEventListener('submit', (e) => {

    if (labels.name == true && labels.description == true && labels.imagen && labels.category == true && labels.quantity == true && labels.price == true) {
          form.submit();
        } else {
            e.preventDefault()
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Hay errores en el formulario',
                showConfirmButton: true,
                timer: 3000
              })
        }
    })