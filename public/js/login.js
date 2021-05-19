window.addEventListener('load',function(){
    const form = document.getElementById('form');
    
    form.addEventListener('submit',function(e){
        
        if(!validations(e)){
            e.preventDefault();
        }else{
            formulario.submit();
        }    

        function validations(e){
        
          
          let {email, password} = form.elements;
          let errores = [];
          console.log(formulario.elements.email.value);
        
        let expressionEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   
        if(!expressionEmail.test(email.value)){
            errores.push('El email es inválido...');
            email.classList.add('is-invalid');   
            
        }else{
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        }
        
        let expressionPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        
        if(!expressionPassword.test(password.value)){
            errores.push('La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número');
            password.classList.add('is-invalid');   
            
        }else{
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        }

          
          let ulErrores = document.getElementById('errores');
          ulErrores.classList.add('alert-danger')
          if(errores.length > 0){
              
              evento.preventDefault();
              ulErrores.innerHTML = "";
              for (let i = 0 ; i < errores.length; i++){
                ulErrores.innerHTML += `<li> ${errores[i]} </li> `
              }
              errores = [];
          }else{
              return true;
          } 
        }
        
    })



})