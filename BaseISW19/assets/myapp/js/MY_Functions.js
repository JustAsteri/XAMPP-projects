/* START - CONTROLLER: Session */
function verifyenterkeypressed(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 13){
        validateuserlogin();
    }
}

function validateuserlogin(){
    var url = myBase_url+"index.php/Session/validatelogin";
    var user = $('#user').val();
    var pass = $('#password').val();
    $('#fountainTextG').show();
    $.post(url,
            {
                user:user,  
                pass: pass
            }, function(data){
                sendresponsetouser(data);
    });
}

function ResetUserLogin(){

    var userreset = $("#userreset").val();
    var passreset = $("#passwordreset").val();

    if (userreset != ""  && passreset != "") {

        $.ajax({
            url:myBase_url+"index.php/Session/ResetLogin",
            type:'POST',
            data:{userreset:userreset,passreset:passreset},
            async: true,
            success:function(datos){
                var response = JSON.parse(datos);

                if (response == "UWOA") {

                    swal("Error","Usuario sin acceso a esta aplicación","error");
     
                }else if(response == "IUOP"){

                    swal("Error","Usuario o contraseña incorecta","error");
                }else{

                    swal({   
                        title: "Exito",
                        text: "Se ha reseteado la sesion con exito",   
                        type: "success",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "No, Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){   
                         
                         location.href = "";  
                    });
                 }

            },
            error:function(){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
            }
        });
    
    }else{

        swal("Cuidado", "Aun quedan campos vacios", "warning")
    }

}

function sendresponsetouser(data){
    var dato = data.trim();  
    if(dato.substring(0,3) === "OK-"){
        openurl(dato);
    }else if(dato.substring(0,4)==="UWOA"){
        displaymessage("Usuario sin acceso a esta aplicación" );
    }else if(dato.substring(0,4)==="IUOP"){
        displaymessage("Usuario y/o contraseña incorrectos");
    } else if(dato.substring(0,4)==="UWAS"){
        displaymessage("Usuario ya cuenta con una sesion activa");
    } else{
        displaymessage(data);
    }
}

function openurl(str){
    $('#fountainTextG').hide();
    var sp = str.split("-");
    var url = myBase_url+"index.php/"+sp[1];
    window.location.href = url;
}

function displaymessage(message){
    $('#fountainTextG').hide();
    var msg = '<div class="alert alert-danger alert-dismissable fade in">\n\
                    <button type="button" class="close close-sm" data-dismiss="alert" >\n\
                    <i class="md md-close"></i>\n\
                    </button>\n\
                    <strong>¡Error!</strong>&nbsp;'+message+'&nbsp;\n\
               </div>';
    $('#displayUserErrors').html(msg);
    setTimeout(closeresponsetouser, 10000);
}

function closeresponsetouser(){
    $('#displayUserErrors').children().fadeToggle(500,function(){
        $('#displayUserErrors').empty();
    });

} 

function LogOut(){

    $.ajax({
        url:myBase_url+"index.php/Session/logout",
        type:'GET',
        async: true,
        success:function(datos){
            swal({   
                title: "Error",
                text: "La sesion ha caducado, porfavor inicia sesion de nuevo",   
                type: "error",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "Cancelar",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = myBase_url+"index.php/Session";       
            });     
        }
    });   
}


function CheckUActivo(){

    $.ajax({
        url:myBase_url+"index.php/Session/EstadoU",
        type:'GET',
        async: true,
        success:function(datos){
            var obj = JSON.parse(datos);

            if(obj != ""){
                console.log("OK");
            }else{
                $.ajax({
                    url:myBase_url+"index.php/Session/logout",
                    type:'GET',
                    async: true,
                    success:function(datos){
                        swal({   
                            title: "Error",
                            text: "Tu cuenta ha sido eliminada, para mayor informacion acude con el administrador",   
                            type: "error",   
                            showCancelButton: false,   
                            confirmButtonColor: "#DD6B55",   
                            confirmButtonText: "OK",   
                            cancelButtonText: "Cancelar",   
                            closeOnConfirm: false,   
                            closeOnCancel: false 
                        }, function(isConfirm){ 
                                location.href = myBase_url+"index.php/Session";       
                        }); 
                    }
                });
            }  
        }
    });

} 


/* END - CONTROLLER: Session */

/* =============================================================================================================================================================================================================================== */

/*START CONTROLLER USUARIOS*/
function VerificaUsuario(){
 var usuario = $('#username').val();

 if(usuario!=""){   

    $.ajax({
        url:myBase_url+"index.php/Usuarios/CheckUsuarioExistente",
        type:'POST',
        data:{usuario:usuario},
        async: true,
        success:function(datos){

            var obj = JSON.parse(datos);

            if(obj!=""){
                swal("Error","El nombre del usuario ya existe en el sistema,porfavor intentelo de nuevo","error");
                $('#usename').val("");
            }
        },
        error:function (){
            swal("Error","Ha ocurrido un error intentelo de nuevo","error");
        }
    });

 }else{
     swal("Alerta","El campo de usuario esta vacio","warning");
 }

}

function GuardaUsuario(){

        var nombre = $('#nombre').val();
        var apaterno = $('#apaterno').val();
        var amaterno = $('#amaterno').val();
        var telefono = $('#telefono').val();
        var email = $('#email').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var rol = $('#rol').val();
        var ocupacion = $('#ocupacion').val();

    if(nombre !="" && apaterno !="" && amaterno !="" && telefono !="" && email !="" && username !="" && password !="" && rol !="" && ocupacion !=""){
       
       
       
        $.ajax({
            url:myBase_url+"index.php/Usuarios/SaveUsuario",
            type:'POST',
            data:{nombre:nombre,apaterno:apaterno,amaterno:amaterno,telefono:telefono,email:email,username:username,password:password,rol:rol,ocupacion:ocupacion},
            async: true,
            success:function(datos){
                swal({   
                    title: "Exito",
                    text: "Se ha guardado usuario sesion con exito ",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "No, Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        location.href = "";       
                }); 
            },
            error:function (){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
            }
        });
        
    }else {
        swal("Alerta","Aun existen campos vacios","warning");
    }

}

function EditarUsuario($id){
        
       
    var id = $id;
    $.ajax({
        url:myBase_url+"index.php/Usuarios/UsuarioPorID",
        type:'POST',
        data:{id:id},
        async: true,
        success:function(datos){

            var obj = JSON.parse(datos);
            console.log(obj);

           var id = obj [0].id_usuario;
           var nombre = obj [0].nombre;
           var apaterno = obj [0].apaterno;
           var amaterno = obj [0].amaterno;
           var telefono = obj [0].telefono;
           var email = obj [0].email;
           var username = obj [0].username;
           var password = obj [0].password;
           var ocupacion = obj [0].ocupacion;
           var rol = obj [0].rol;
           var estado = obj [0].estado;

           $('#username').attr('disabled',true);
           $('#password').attr('disabled',true);
           $('#botonguardar').hide();
           $('#botonactualizar').show();
           $('#divestado').show();
           $('#id_user').val(id);
           $('#nombre').val(nombre);
           $('#apaterno').val(apaterno);
           $('#amaterno').val(amaterno);
           $('#telefono').val(telefono);
           $('#email').val(email);
           $('#username').val(username);
           $('#password').val(password);
           $('#rol').val(rol);
           $('#ocupacion').val(ocupacion);
           $('#estado').val(estado);


         }, error:function (){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
            }
});
           

}


function UpdateUsuario(){


    var id = $('#id_user').val();
    alert(id);
    var nombre = $('#nombre').val();
    var apaterno = $('#apaterno').val();
    var amaterno = $('#amaterno').val();
    var telefono = $('#telefono').val();
    var email = $('#email').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var rol = $('#rol').val();
    var ocupacion = $('#ocupacion').val();
    var estado = $('#estado').val();


    if(id !="" && nombre !="" && apaterno !="" && amaterno !="" && telefono !="" && email !="" && rol !="" && ocupacion !="" && estado !=""&& username!=""&& password!=""){
    
        $.ajax({
            url:myBase_url+"index.php/Usuarios/UpdateUser",
            type:'POST',
            data:{id:id,nombre:nombre,apaterno:apaterno,amaterno:amaterno,telefono:telefono,email:email,ocupacion:ocupacion,rol:rol,estado:estado,username:username,password:password},
            async: true,
            success:function(datos){

                swal({   
                    title: "Exito",
                    text: "Se ha actualizado el usuario con exito ",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "No, Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        location.href = "";       
                }); 

                
            },error:function (){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
            }
        });
    
    
    
    }

}






 /*END CONTROLLER USUARIOS */

// ==============================================================================================================

 /*START CONTROLLER CLIENTES*/

 function RellenaHorarioFunciones(){
     var id = $('cliente').val();

     $.ajax({
        url:myBase_url+"index.php/Calendario/HorariosCliente",
        type:'POST',
        data:{id:id},
        async: true,
        success:function(datos){

            swal({   
                title: "Exito",
                text: "Se ha actualizado el usuario con exito ",   
                type: "success",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "No, Cancelar",   
                closeOnConfirm: true,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = "";       
            }); 

            
        },error:function (){
            swal("Error","Ha ocurrido un error intentelo de nuevo","error");
        }
    });
 }

function GuardaCliente()
{
  //traer informacion
  var nombre      = $('#nombre').val();    //.val() -> Get the current value of the first element in the set of matched elements or set the value of every matched element.
  var apaterno    = $('#apaterno').val();
  var amaterno    = $('#amaterno').val();
  var telefono    = $('#telefono').val();
  var email       = $('#email').val();
  // var username = $('#username').val();
  // var password = $('#password').val();
  // var rol      = $('#rol').val();
  var empresa     = $('#empresa').val();
  var token       = $('#token').val();

  if (nombre != "" &&
  apaterno != "" &&
  amaterno != "" &&
  telefono != "" &&
  email != "" &&
  empresa != "" &&
  token != "")
  {
    guardar_cliente_server();
  }
  else
  {
    swal("Error 2","Aun existen campos vacios","error");
  }
}

function guardar_cliente_server()
{
   var nombre = $('#nombre').val();    //.val() -> Get the current value of the first element in the set of matched elements or set the value of every matched element.
  var apaterno = $('#apaterno').val();
  var amaterno = $('#amaterno').val();
  var telefono = $('#telefono').val();
  var email = $('#email').val();
  // var username = $('#username').val();
  // var password = $('#password').val();
  // var rol = $('#rol').val();
  var empresa = $('#empresa').val();
  var token = $('#token').val();

  if (nombre != "" &&
  apaterno != "" &&
  amaterno != "" &&
  telefono != "" &&
  email != "" &&
  empresa != "" &&
  token != "")
  {
    $.ajax({
        url:myBase_url+"index.php/Clientes/SaveClient",
        type:'POST',
        data:
          {
            nombre:nombre,
            apaterno:apaterno,
            amaterno:amaterno,
            email:email,
            telefono:telefono,
            // username:username,
            // password:password,
            // rol:rol
            empresa:empresa,
            token:token
          }, //
        async: true,
        success:function(datos){
          swal({
              title: "Exito",
              text: "Se ha guardado la sesion con exito",
              type: "Sucess",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              cancelButtonText: "Cancelar",
              closeOnConfirm: false,
              closeOnCancel: false
          }, function(isConfirm){
                  location.href = "";
          });
        },
        error: function(){
          swal("Error 1","Aun existen campos vacios","error");
        }
      });
  }
  else
  {
    swal("Error 2","Aun existen campos vacios","error");
  }
}

function EditarCliente($id){
       
    var id = $id;
    $.ajax({
        url:myBase_url+"index.php/Clientes/ClientePorID",
        type:'POST',
        data:{id:id},
        async: true,
        success:function(datos){

            var obj = JSON.parse(datos);
            console.log(obj);

           var id           = obj [0].id_cliente;
           var nombre       = obj [0].nombre;
           var apaterno     = obj [0].apaterno;
           var amaterno     = obj [0].amaterno;
           var telefono     = obj [0].telefono;
           var email        = obj [0].email;
           // var username  = obj [0].username;
           // var password  = obj [0].password;
           // var ocupacion = obj [0].ocupacion;
           // var rol       = obj [0].rol;
           var estado       = obj [0].estado;
           var empresa = obj[0].empresa;
           var token = obj[0].token;

           // $('#username').attr('disabled',true);
           // $('#password').attr('disabled',true);
           $('#botonguardar').hide();
           $('#botonactualizar').show();
           $('#divestado').show();
           $('#id_client').val(id);
           $('#nombre').val(nombre);
           $('#apaterno').val(apaterno);
           $('#amaterno').val(amaterno);
           $('#telefono').val(telefono);
           $('#email').val(email);
           // $('#username').val(username);
           // $('#password').val(password);
           // $('#rol').val(rol);
           // $('#ocupacion').val(ocupacion);
           $('#estado').val(estado);
           $('#empresa').val(empresa);
           $('#token').val(token);



         }, error:function (){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
            }
    });         
}


function UpdateCliente(){

    var id           = $('#id_client').val();
    alert(id);
    var nombre       = $('#nombre').val();
    var apaterno     = $('#apaterno').val();
    var amaterno     = $('#amaterno').val();
    var telefono     = $('#telefono').val();
    var email        = $('#email').val();
    // var username  = $('#username').val();
    // var password  = $('#password').val();
    // var rol       = $('#rol').val();
    // var ocupacion = $('#ocupacion').val();
    var empresa      = $('#empresa').val();
    // var token        = $('#token').val();
    var estado       = $('#estado').val();


    if(id !="" && nombre !="" && apaterno !="" && amaterno !="" && telefono !="" && email !="" && estado !=""&& empresa != ""){
    
        $.ajax({
            url:myBase_url+"index.php/Clientes/UpdateCliente",
            type:'POST',
            data:{id:id,nombre:nombre,apaterno:apaterno,amaterno:amaterno,telefono:telefono,email:email,estado:estado,empresa:empresa},
            async: true,
            success:function(datos){

                swal({   
                    title: "Exito",
                    text: "Se ha actualizado el usuario con exito ",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "No, Cancelar",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        location.href = "";       
                }); 

                
            },error:function (){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
            }
        });
    
    
    
    }

}

/*END CONTROLLER CLIENTES */




/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */

