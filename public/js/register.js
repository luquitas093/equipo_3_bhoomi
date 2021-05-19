const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const terms = document.getElementById("terms");

const expressions = {
	firstname: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	lastname: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
    date: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
	password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/, // 8 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{10,16}$/ // 10 a 16 numeros.
}

const labels = {
    first_name: false,
    last_name: false,
    date: false,
    phone: false,
    avatar: false,
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
        case "date" :
            validateLabel(expressions.date, e.target, "date")
        case "phone" :
            validateLabel(expressions.phone, e.target, "phone")
        break;
        case "avatar" :
            validateAvatar()
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

const validateAvatar = () => {
    if (avatar.value == "") {
        document.getElementById(`group-${label}`).classList.add("alert-danger")
        document.getElementById(`group-${label}`).classList.remove("is-valid")
        labels["avatar"] = false
    } else {
        document.getElementById(`group-${label}`).classList.add("is-valid")
        document.getElementById(`group-${label}`).classList.remove("alert-danger")
        labels["avatar"] = true
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

    if (labels.first_name && labels.last_name && labels.phone && labels.email && labels.password && terms.checked) {

        inputs.forEach ((input) => {
            input.classList.remove ("is-valid")
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su Usuario se ha creado Correctamente',
            showConfirmButton: false,
            timer: 2500
          })
    } else {
        e.preventDefault();
        
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ingrese los datos correctamente',
            showConfirmButton: true,
            timer: 2500
          })
    }
})