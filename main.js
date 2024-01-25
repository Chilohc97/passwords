

document.addEventListener('DOMContentLoaded', function () {
    
    let claveGuardada = localStorage.getItem('clave');


    let acceso = document.getElementById('acceso');
    let inputClave = document.getElementById('clave');


    if (!claveGuardada) {
        acceso.addEventListener('submit', function (event) {
            event.preventDefault();

         
            let claveIntroducida = inputClave.value;

           
            localStorage.setItem('clave', claveIntroducida);

          
            window.location.href = 'interfaz.html';
        });

 
        document.querySelector('label[for="clave"]').textContent = 'Crear clave:';
        document.querySelector('button').textContent = 'Crear';
    } else {

        acceso.addEventListener('submit', function (event) {
            event.preventDefault();

         
            let claveIntroducida = inputClave.value;

    
            if (claveIntroducida === claveGuardada) {
                
                window.location.href = 'interfaz.html';
            } else {
             
                alert('Clave incorrecta. Prueba de nuevo.');
            }
        });
    }
});




  
