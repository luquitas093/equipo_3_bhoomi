const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const reset = document.getElementById("reset")


const expressions = {
	first_name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	last_name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
    phone: /^\d{10,16}$/, // 10 a 16 numeros.
	password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/, // 8 a 12 digitos.	
}

const labels = {
    first_name: false,
    last_name: false,
    date: false,
    phone: false,
    avatar: false,
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
        case "date" :
            validateDate()
        break;
        case "phone" :
            validateLabel(expressions.phone, e.target, "phone")
        break;
        case "avatar" :
            validateAvatar()
            validateAvatarExtension()
        break;
        case "password" :
            validateLabel(expressions.password, e.target, "password")
            validatePassword2()
        break;
        case "password2" :
            validateLabel(expressions.password, e.target, "password2")
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

const validateDate = () => {
    const date = document.getElementById("date")
    if (date.value.length === 0) {
        document.getElementById("group-date").classList.add("alert-danger")
        document.getElementById("group-date").classList.remove("is-valid")
        labels["date"] = false
    } else {
        document.getElementById("group-date").classList.add("is-valid")
        document.getElementById("group-date").classList.remove("alert-danger")
        labels["date"] = true
    }
}

const validateAvatar = () => {
    const avatar = document.getElementById("avatar");

    if (avatar.value.length == 0) {
        document.getElementById("group-avatar").classList.add("alert-danger")
        document.getElementById("group-avatar").classList.remove("is-valid")
        labels["avatar"] = false
    } else {
        document.getElementById("group-avatar").classList.add("is-valid")
        document.getElementById("group-avatar").classList.remove("alert-danger")
        labels["avatar"] = true
    }
}

const validateAvatarExtension = () => {
    const avatar = document.getElementById("avatar");
    const acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png'];
    const parts = avatar.value.split('.');
    const extension = parts[parts.length-1];
    if (!acceptedExtensions.includes(extension)){
        document.getElementById("group-avatar").classList.add("alert-danger")
        document.getElementById("group-avatar").classList.remove("is-valid")
        labels["avatar"] = false 
    } else {
        document.getElementById("group-avatar").classList.add("is-valid")
        document.getElementById("group-avatar").classList.remove("alert-danger")
        labels["avatar"] = true
    }
}

inputs.forEach ((input) => {
    input.addEventListener('keyup', validateForm)
    input.addEventListener('blur', validateForm)
})

reset.addEventListener ('click', function () {
    document.getElementById("group-first_name").classList.remove('is-valid')
    document.getElementById("group-first_name").classList.remove('alert-danger')
    document.getElementById("group-last_name").classList.remove('is-valid')
    document.getElementById("group-last_name").classList.remove('alert-danger')
    document.getElementById("group-date").classList.remove('is-valid')
    document.getElementById("group-date").classList.remove('alert-danger')
    document.getElementById("group-phone").classList.remove('is-valid')
    document.getElementById("group-phone").classList.remove('alert-danger')
    document.getElementById("group-avatar").classList.remove('is-valid')
    document.getElementById("group-avatar").classList.remove('alert-danger')
    document.getElementById("group-password").classList.remove('is-valid')
    document.getElementById("group-password").classList.remove('alert-danger')
    document.getElementById("group-password2").classList.remove('is-valid')
    document.getElementById("group-password2").classList.remove('alert-danger')
})

form.addEventListener('submit', function(e) {
    const terms = document.getElementById("terms")

    if (labels.first_name === true && labels.last_name === true && labels.date ===true && labels.phone === true && labels.avatar === true && labels.password === true) {
        form.submit()
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