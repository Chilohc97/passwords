document.addEventListener('DOMContentLoaded', function() {
    let opcionesForm = document.getElementById('opciones');
    let inputOpcion = document.getElementById('opción');
    let webForm = document.getElementById('website');
    let inputWeb = document.getElementById('sitioWeb');
    let userForm = document.getElementById('user');
    let inputUser = document.getElementById('usuario');
    let passwordForm = document.getElementById('password');
    let inputPassword = document.getElementById('contraseña');
    let valorForm = document.getElementById('valor');
    let inputValor = document.getElementById('editar');
    let claveForm = document.getElementById('clave');
    let inputClave = document.getElementById('nuevaClave');
    let opcionContraseñaForm = document.getElementById('opcionContraseña');
    let inputGenerador = document.getElementById('generador');
    let longitudForm = document.getElementById('longitud');
    let inputLongitud = document.getElementById('clongitud');
    let excluirForm = document.getElementById('excluir');
    let inputExcluir = document.getElementById('cexcluir');
    function generador (longitud, excluir) {
        const alfabeto = "º1234567890'¡qwertyuiop`+asdfghjklñçzxcvbnm,.-ª!·$%&/()=?¿QWERTYUIOP^*ASDFGHJKLÑ¨ÇZXCVBNM;:_";
        let arr_contraseña = [];
        for (let i = 0; i < longitud; i++) {
            let found = false;
            let rand = Math.floor(Math.random()*alfabeto.length);
            for (let i = 0; i < excluir.length; i++) {
                if (alfabeto[rand] == excluir[i]) {
                    found = true;
                }
            }
            if (found == false) {
                arr_contraseña.push(alfabeto[rand]);
            }
        }
        
        return arr_contraseña.join('');
    
    }
    opcionesForm.addEventListener('submit', function(event){
        event.preventDefault();
        let opcionIntroducida = inputOpcion.value;
        opcionesForm.style.display = "none";
        switch(opcionIntroducida) {
            case 'crear':
                webForm.style.display = "block";

                let entrada = {
                    web: '',
                    usuario: '',
                    contraseña: ''
                }
                webForm.addEventListener('submit', function web(event){
                    event.preventDefault();
                    let webIntroducido = inputWeb.value;
                    entrada.web = webIntroducido;
                    alert("sitio web añadido: " + entrada.web);
                    event.target.removeEventListener('submit', web) 
                    inputWeb.value = '';
                    webForm.style.display = "none";
                    userForm.style.display = "block";
                })
              
               userForm.addEventListener('submit', function user(event){
                    event.preventDefault();
                    let usuarioIntroducido = inputUser.value;
                    entrada.usuario = usuarioIntroducido;
                    alert("usuario añadido: "+ entrada.usuario);
                    event.target.removeEventListener('submit', user);
                    inputUser.value = '';
                    userForm.style.display = "none";
                    opcionContraseñaForm.style.display = "block";
                })
                opcionContraseñaForm.addEventListener('submit', function cgenerador(event) {
                    event.preventDefault();
                    let opcionIntroducida = inputGenerador.value;
                    event.target.removeEventListener('submit', cgenerador);
                    opcionContraseñaForm.style.display = "none";
                    if (opcionIntroducida === 'manual') {
                        
                        passwordForm.style.display = "block";
                        passwordForm.addEventListener('submit', function password(event) {
                        event.preventDefault();
                        let contraseñaIntroducida = inputPassword.value;
                        entrada.contraseña = contraseñaIntroducida;
                        alert('contraseña añadida');
                        event.target.removeEventListener('submit', password);
                        passwordForm.style.display = "none";
                        let stringifiedEntrada = JSON.stringify(entrada);
                        localStorage.setItem(entrada.web + '/' + entrada.usuario, stringifiedEntrada);
                        opcionesForm.style.display = "block";
                        opcionIntroducida = '';
                        })
                    } else if (opcionIntroducida === 'generador') {
                        longitudForm.style.display = "block";
                        let li;
                        let ex;
                        longitudForm.addEventListener('submit', function long(event) {
                            event.preventDefault();
                            let longitudIntroducida = inputLongitud.value;
                            li = longitudIntroducida;
                            event.target.removeEventListener('submit', long);
                            longitudForm.style.display = "none";
                            excluirForm.style.display = "block";

                        })
                        excluirForm.addEventListener('submit', function exc(event) {
                            event.preventDefault();
                            let excluirIntro = inputExcluir.value;
                            ex = excluirIntro;
                            let contraseñaGenerada = generador(li, ex);
                            entrada.contraseña = contraseñaGenerada;
                            event.target.removeEventListener('submit', exc);
                            alert('Contraseña añadida');
                            excluirForm.style.display = "none";
                            let stringifiedEntrada = JSON.stringify(entrada);
                            localStorage.setItem(entrada.web + '/' + entrada.usuario, stringifiedEntrada);
                            window.location.reload();
                        })

                    } else {
                        alert('Introduce una opción válida.');
                        window.location.reload();
                    }
                })
                
                
                
                break;
            case 'obtener':
                let cuenta;
                let cuentaParse;
                let sitio;
                let usuario;
                webForm.style.display = "block";
                webForm.addEventListener('submit', function web(event) {
                    event.preventDefault();
                    sitio = inputWeb.value;
                    event.target.removeEventListener('submit', web);
                    webForm.style.display = "none";
                    userForm.style.display = "block";
                })
                userForm.addEventListener('submit', function user(event) {
                    event.preventDefault();
                    usuario = inputUser.value;
                    event.target.removeEventListener('submit', user);
                    cuenta = localStorage.getItem(sitio + '/' + usuario);
                    if (!cuenta) {
                        alert('No existe esta cuenta. Inténtalo de nuevo.')
                        window.location.reload();
                    } else {
                      cuentaParse = JSON.parse(cuenta);
                    alert('sitio web: ' + cuentaParse.web + ' - usuario: ' + cuentaParse.usuario + ' - contraseña: ' + cuentaParse.contraseña);
                    window.location.reload();  
                    }
                    
                })
                break;
            case 'eliminar':
                let nombre;
                let pagina;
                webForm.style.display = "block";
                webForm.addEventListener('submit', function web(event){
                    event.preventDefault();
                    let sitioIntroducido = inputWeb.value;
                    pagina = sitioIntroducido;
                    event.target.removeEventListener('submit', web);
                    webForm.style.display = "none";
                    userForm.style.display = "block";

                })
                userForm.addEventListener('submit', function user(event){
                    event.preventDefault();
                    let usuarioIntroducido = inputUser.value;
                    nombre = usuarioIntroducido;
                    event.target.removeEventListener('submit', user);
                    let cuentaEliminar = localStorage.getItem(pagina + '/' + nombre);
                    if (!cuentaEliminar) {
                        alert('No existe esta cuenta. Inténtalo de nuevo.');
                        window.location.reload();
                    } else {
                        localStorage.removeItem(pagina + '/' + nombre);
                        alert('página eliminada: ' + pagina);
                        userForm.style.display = "none";
                        window.location.reload();
                    }
                    
                })
                break;
            case 'editar':
                    let webs;
                    let valor;
                    let us;
                    webForm.style.display = "block";
                    webForm.addEventListener('submit', function web(event) {
                        event.preventDefault();
                        let sitioIntroducido = inputWeb.value;
                        webs = sitioIntroducido;
                        event.target.removeEventListener('submit', web);
                        webForm.style.display = "none";
                        
                        userForm.style.display = "block";
                 
                    })
                    userForm.addEventListener('submit', function user(event) {
                        event.preventDefault();
                        
                        let antiguoUsuario = inputUser.value;
                        us = antiguoUsuario;
                        
                        event.target.removeEventListener('submit', user);
                        let cuentaEditar = localStorage.getItem(webs + '/' + us);
                        if (!cuentaEditar) {
                            alert('No existe esta cuenta. Inténtalo de nuevo.');
                            window.location.reload();
                        } 
                            userForm.style.display = "none";
                        
                            valorForm.style.display = "block"; 
                        
                        
                    })

                    valorForm.addEventListener('submit', function edit(event) {
                        event.preventDefault();
                        let valorIntroducido = inputValor.value;
                        valor = valorIntroducido;
                      
                        event.target.removeEventListener('submit', edit);
                        valorForm.style.display = "none";
                        if (valor === 'usuario') {
                            userForm.style.display = "block";
                            userForm.addEventListener('submit', function user(event) {
                                event.preventDefault();
                                
                                let nuevoIntroducido = inputUser.value;
                          
                                let objeto = localStorage.getItem(webs + '/' + us);
                               
                                let objetoParse = JSON.parse(objeto);
                                localStorage.removeItem(webs + '/' + us);
                                let nuevaEntrada = {
                                    web: webs,
                                    usuario: nuevoIntroducido,
                                    contraseña: objetoParse.contraseña
                                }
                                let objetoString = JSON.stringify(nuevaEntrada);
                                localStorage.setItem(webs + '/' + nuevoIntroducido, objetoString);
                    
                                event.target.removeEventListener('submit', user);
                                alert('cuenta editada.');
                                userForm.style.display = "none";
                                window.location.reload();
                            })
                        } else if (valor === 'contraseña') {
                            opcionContraseñaForm.style.display = "block";
                            opcionContraseñaForm.addEventListener('submit', function cgenerador(event) {
                                event.preventDefault();
                                let opcionIntroducida = inputGenerador.value;
                                event.target.removeEventListener('submit', cgenerador);
                                opcionContraseñaForm.style.display = "none";
                                if (opcionIntroducida === 'manual') {
                                    passwordForm.style.display = "block";
                                    passwordForm.addEventListener('submit', function password(event) {
                                    event.preventDefault();
                                    let nuevaIntroducida = inputPassword.value;
                                    let object = localStorage.getItem(webs + '/' + us);
                                    let objectParse = JSON.parse(object);
                                    localStorage.removeItem(webs + '/' + us);
                                    let nuevaEntrada = {
                                    web: webs,
                                    usuario: objectParse.usuario,
                                    contraseña: nuevaIntroducida
                                     }
                                    let objectString = JSON.stringify(nuevaEntrada);
                                    localStorage.setItem(webs + '/' + us, objectString);
                                    event.target.removeEventListener('submit', password);
                                    alert('cuenta editada.');
                                    passwordForm.style.display = "none";
                                    window.location.reload();
                                    })
                                    
                                } else if (opcionIntroducida === 'generador') {
                                    longitudForm.style.display = "block";
                                    let li;
                                    let ex;
                                    longitudForm.addEventListener('submit', function long(event) {
                                        event.preventDefault();
                                        let longitudIntroducida = inputLongitud.value;
                                        li = longitudIntroducida;
                                        event.target.removeEventListener('submit', long);
                                        longitudForm.style.display = "none";
                                        excluirForm.style.display = "block";
            
                                    })
                                    excluirForm.addEventListener('submit', function exc(event) {
                                        event.preventDefault();
                                        let excluirIntro = inputExcluir.value;
                                        ex = excluirIntro;
                                        let contraseñaGenerada = generador(li, ex);
                                        let object = localStorage.getItem(webs + '/' + us);
                                        let objectParse = JSON.parse(object);
                                        localStorage.removeItem(webs + '/' + us);
                                        let nuevaEntrada = {
                                        web: webs,
                                        usuario: objectParse.usuario,
                                        contraseña: contraseñaGenerada
                                        }
                                        let objectString = JSON.stringify(nuevaEntrada);
                                        localStorage.setItem(webs + '/' + us, objectString);
                                        event.target.removeEventListener('submit', exc);
                                        alert('cuenta editada.');
                                        excluirForm.style.display = "none";
                                        window.location.reload();
                                       
                                        
                                    })
            
                                } else {
                                    alert('Introduce una opción válida.');
                                    window.location.reload();
                                }
                            })
                            
                        } else {
                            alert('Introduce una opción válida.');
                            window.location.reload();
                        }
                      
                        
                     
                    })

                    
                    
                       
                    
                break;
                  
            case 'editar clave maestra':
                claveForm.style.display = "block";
                claveForm.addEventListener('submit', function clav(event) {
                    event.preventDefault();
                    let nueva = inputClave.value;
                    localStorage.setItem('clave', nueva);
                    event.target.removeEventListener('submit', clav);
                    claveForm.style.display = "none";
                    alert('clave actualizada');
                    window.location.reload();
                })
                break;
                

            default:
                alert('Introduce una opción correcta.');
             
                window.location.reload();
            
                break;
        }
    })


});
