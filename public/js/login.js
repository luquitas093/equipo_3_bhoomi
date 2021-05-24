window.addEventListener('load',function(){
    const form = document.getElementById("form");
    const inputs = document.querySelectorAll("#form input");
    
    const expressions = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/, // 8 a 12 digitos.	
    }

    const labels = {
        email: false,
        password: false
    }

    const validateForm = (e) => {
        switch (e.target.name) {
            case "email" :
                validateLabel(expressions.email, e.target, "email")
            break;
            case "password" :
                validateLabel(expressions.password, e.target, "password")
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
    
        if (labels.email && labels.password) {
            form.submit();
            } else {
                e.preventDefault()
                form.reset()
                document.getElementById("group-email").classList.remove('is-valid')
                document.getElementById("group-email").classList.remove('alert-danger')
                document.getElementById("group-password").classList.remove('is-valid')
                document.getElementById("group-password").classList.remove('alert-danger')
            }
        })
})