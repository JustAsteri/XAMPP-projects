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

/* START - CONTROLLER: Dashboard */

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
  var ocupacion = $('#ocupacion').val();

  if (nombre != "" &&
  ocupacion != "" &&
  username != "" &&
  password != "" &&
  apaterno != "" &&
  amaterno != "" &&
  telefono != "" &&
  email != "")
  {
    $.ajax({
        url:myBase_url+"index.php/Dashboard/SaveUser",
        type:'POST',
        data:
          {
            nombre:nombre,
            apaterno:apaterno,
            amaterno:amaterno,
            email:email,
            telefono:telefono,
            ocupacion:ocupacion,
            username:username,
            password:password
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

/* END - CONTROLLER: Dashboard */

/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */
