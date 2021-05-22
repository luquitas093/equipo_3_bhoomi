window.addEventListener ("load", function() {
const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const expressions = {
	first_name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	last_name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
    phone: /^\d{10,16}$/, // 10 a 16 numeros.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/, // 8 a 12 digitos.	
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
            validateLabel(expressions.first_name, e.target, "first_name")
        break;
        case "last_name" :
            validateLabel(expressions.last_name, e.target, "last_name")
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
        labels[label] = true
    } else {
        document.getElementById(`group-${label}`).classList.add("alert-danger")
        document.getElementById(`group-${label}`).classList.remove("is-valid")
        labels[label] = false
    }
}

const validatePassword2 = () => {
    const inputPassword = document.getElementById("password")
    const inputPassword2 = document.getElementById("password2")

    if (inputPassword.value != inputPassword2.value) {
        document.getElementById("group-password2").classList.add("alert-danger")
        document.getElementById("group-password2").classList.remove("is-valid")
        labels["password"] = false
    } else {
        document.getElementById("group-password2").classList.add("is-valid")
        document.getElementById("group-password2").classList.remove("alert-danger")
        labels["password"] = true
    }
}

inputs.forEach ((input) => {
    input.addEventListener('keyup', validateForm)
    input.addEventListener('blur', validateForm)
})

form.addEventListener('submit', (e) => {
    const terms = document.getElementById("terms")

    if (labels.first_name && labels.last_name && labels.phone && labels.email && labels.password && terms.checked) {
        form.reset();
        Swal.fire ({
            position: 'center',
            icon: 'success',
            title: 'Su Usuario se ha creado Correctamente',
            showConfirmButton: false,
            timer: 3000
          })
        } else {
            e.preventDefault()
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ingrese los datos correctamente',
                showConfirmButton: true,
                timer: 2500
          })
        }
    })
})