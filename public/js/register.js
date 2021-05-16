const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input")

const expressions = {
	firstname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	lastname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const labels = {
    first_name: false,
    last_name: false,
    phone: false,
    email: false,
    password: false
}

const validateForm = (e) => {
    switch (e.target.name) {
        case "first_name" :
            validateLabel(expressions.firstname, e.target, "firstname")
        break;
        case "last_name" :
            validateLabel(expressions.lastname, e.target, "lastname")
        break;
        case "phone" :
            validateLabel(expressions.phone, e.target, "phone")
        break;
        case "email" :
            validateLabel(expressions.email, e.target, "email")
        break;
        case "password" :
            validateLabel(expressions.password, e.target, "password")
            validatePassword2()
        break;
        case "password2" :
            validatePassword2()
        break;
    }

}

const validateLabel = (expression, input, label) => {
    if (expression.test(input.value)) {
        document.getElementById(`group-${label}`).classList.add("is-valid")
        document.getElementById(`group-${label}`).classList.remove("alert-danger")
        document.querySelector(`group-${label} i`).classList.add("fa-tree")
        document.querySelector(`group-${label} i`).classList.remove("fa-free-code-camp")
        labels[label] = true
    } else {
        document.getElementById(`group-${label}`).classList.add("alert-danger")
        document.getElementById(`group-${label}`).classList.remove("is-valid")
        document.querySelector(`group-${label} i`).classList.add("fa-free-code-camp")
        document.querySelector(`group-${label} i`).classList.remove("fa-tree")
        labels[label] = false
    }
}

const validatePassword2 = () => {
    const inputPassword = document.getElementById("password")
    const inputPassword2 = document.getElementById("password2")

    if (inputPassword.value != inputPassword2.value) {
        document.getElementById("group-password2").classList.add("alert-danger")
        document.getElementById("group-password2").classList.remove("is-valid")
        document.querySelector("group-password2 i").classList.add("fa-free-code-camp")
        document.querySelector("group-password2 i").classList.remove("fa-tree")
        labels["password"] = false
    } else {
        document.getElementById("group-password2").classList.add("is-valid")
        document.getElementById("group-password2").classList.remove("alert-danger")
        document.querySelector("group-password2 i").classList.add("fa-tree")
        document.querySelector("group-password2 i").classList.remove("fa-free-code-camp")
        labels["password"] = true
    }
}

inputs.forEach ((input) => {
    input.addEventListener('keyup', validateForm)
    input.addEventListener('blur', validateForm)
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const terms = document.getElementById("terms")

    if (labels.firstname && labels.lastname && labels.phone && labels.email && labels.password && terms.checked) {

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Su Usuario se ha creado Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        
          res.redirect ("/")
    } else {
        e.preventDefault();

        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ingrese los datos correctamente',
            showConfirmButton: true,
            timer: 1500
          })
    }
})
