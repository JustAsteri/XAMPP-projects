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

/* START - CONTROLLER: Usuario */

function guardar_usuario()
{
  //traer informacion
  var nombre = $('#nombre').val();    //.val() -> Get the current value of the first element in the set of matched elements or set the value of every matched element.
  var apaterno = $('#apaterno').val();
  var amaterno = $('#amaterno').val();
  var telefono = $('#telefono').val();
  var email = $('#email').val();
  var username = $('#username').val();
  var password = $('#password').val();
  var rol = $('#rol').val();

  if (nombre != "" &&
  username != "" &&
  password != "" &&
  apaterno != "" &&
  amaterno != "" &&
  telefono != "" &&
  email != "" &&
  rol != "")
  {
    guardar_usuario_server();
  }
  else
  {
    swal("Error 2","Aun existen campos vacios","error");
  }
}

function guardar_usuario_server()
{
    var nombre = $('#nombre').val();    //.val() -> Get the current value of the first element in the set of matched elements or set the value of every matched element.
  var apaterno = $('#apaterno').val();
  var amaterno = $('#amaterno').val();
  var telefono = $('#telefono').val();
  var email = $('#email').val();
  var username = $('#username').val();
  var password = $('#password').val();
  var rol = $('#rol').val();

  if (nombre != "" &&
  username != "" &&
  password != "" &&
  apaterno != "" &&
  amaterno != "" &&
  telefono != "" &&
  email != "" &&
  rol != "")
  {
    $.ajax({
        url:myBase_url+"index.php/Usuarios/SaveUser",
        type:'POST',
        data:
          {
            nombre:nombre,
            apaterno:apaterno,
            amaterno:amaterno,
            email:email,
            telefono:telefono,
            username:username,
            password:password,
            rol:rol
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

function EditarUsuario($id)
{
    var id = $id;

    $.ajax({
        url:myBase_url+"index.php/Usuarios/UsuarioPorID",
        type:'POST',
        data:{id:id},
        async: true,
        success:function(datos){
            var obj       = JSON.parse(datos);

            var id = obj[0].if;
            var nombre    = obj[0].nombre;
            var apaterno  = obj[0].apaterno;
            var amaterno  = obj[0].amaterno;
            var telefono  = obj[0].telefono;
            var email     = obj[0].email;
            var username  = obj[0].username;
            var password  = obj[0].password;
            var ocupacion = obj[0].ocupacion;
            var rol       = obj[0].rol;
            var estado    = obj[0].estado;
            $('#password').attr('disabled',true);
            $('#boton_guardar').hide();
            $('#boton_actualizar').show();

            $('#id_user').val(id);
            $('#nombre').val(nombre);    //.val() -> Get the current value of the first element in the set of matched elements or set the value of every matched element.
            $('#apaterno').val(apaterno);
            $('#amaterno').val(amaterno);
            $('#telefono').val(telefono);
            $('#email').val(email);
            $('#username').val(username);
            $('#password').val(password);
            $('#rol').val(rol);
            
        },
        error: function(){
          swal("Error 1","Aun existen campos vacios","error");
        }
    });
}

function update_usuario()
{
    var id = $('#id_user').val();
    var nombre = $('#nombre').val();    //.val() -> Get the current value of the first element in the set of matched elements or set the value of every matched element.
    var apaterno = $('#apaterno').val();
    var amaterno = $('#amaterno').val();
    var telefono = $('#telefono').val();
    var email = $('#email').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var rol = $('#rol').val();

    if (nombre != "" &&
    username != "" &&
    password != "" &&
    apaterno != "" &&
    amaterno != "" &&
    telefono != "" &&
    email != "" &&
    rol != "" &&
    id != "")
    {
        
    }
}

/* END - CONTROLLER: Usuario */

/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */
