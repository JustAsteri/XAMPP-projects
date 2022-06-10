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

/*START CONTROLLER HORARIO */

function AgregarHorario()
{
    var cliente = $('#cliente').val();
    var fecha1 = $('#fecha1').val();
    var fecha2 = $('#fecha2').val();
    var anio = $('#anio').val();

    if(cliente != "" && fecha1 != "" && fecha2 != "" && anio != "")
    {
        $.ajax({
            url:myBase_url+"index.php/Horarios/ConsultaHorarios",
            type:'POST',
            data:{id:id,nombre:nombre,apaterno:apaterno,amaterno:amaterno,telefono:telefono,email:email,estado:estado,empresa:empresa},
            async: true,
            success:function(datos){

            },    error: function(){
                    swal("Error","Ha ocurrido un error","error");
                }
            });

    }
    else
    {
        swal("Cuidado","Aun quedan campos vacios");
    }
}

function RellenaHorarioFunciones(){

    var cliente   = $('#clientes').val();
    var fecha1    = $('#fecha1').val();
    var fecha2    = $('#fecha2').val();
    var anio      = $('#anio').val();

    if(cliente != "" && fecha1 != "" && fecha2 != "" && anio != "")
    {
        $.ajax({
                url:myBase_url+"index.php/Clientes/ClientePorID",
                type:'POST',
                data:{id:cliente},
                async: true,
                success:function(datos){

                    var obj = JSON.parse(datos);
                    console.log(obj);
                    alert(id);

                    if (obj != "")
                    {
                        var id = obj[0].id_cliente;
                        alert(id);
                        var nombre = obj[0].nombre;
                        var apaterno = obj[0].apaterno;
                        var amaterno = obj[0].amaterno;

                        var nombrecompleto = nombre + ' ' + apaterno + ' ' + amaterno;
                        $("#t1").val(nombrecompleto);
                        $("#id_c").val(id);
                    }
                },
                error: function(){
                    swal("Error","Ha ocurrido un error","error");
                }
            });
        $.ajax({
                url:myBase_url+"index.php/Calendario/HorariosCliente",
                type:'POST',
                data:{
                    cliente:cliente,
                    fecha1:fecha1,
                    fecha2:fecha2,
                    anio:anio
                },
                async: true,
                success:function(datos){

                    var obj = JSON.parse(datos);

                    if (obj != "")
                    {
                        $('#calendario').show();

                        $("#l2").empty();
                        $("#ma2").empty();
                        $("#mi2").empty();
                        $("#j2").empty();
                        $("#v2").empty();
                        $("#s2").empty();

                        $("#l3").empty();
                        $("#ma3").empty();
                        $("#mi3").empty();
                        $("#j3").empty();
                        $("#v3").empty();
                        $("#s3").empty();

                        $("#l4").empty();
                        $("#ma4").empty();
                        $("#mi4").empty();
                        $("#j4").empty();
                        $("#v4").empty();
                        $("#s4").empty();

                        $("#l5").empty();
                        $("#ma5").empty();
                        $("#mi5").empty();
                        $("#j5").empty();
                        $("#v5").empty();
                        $("#s5").empty();

                        $("#l6").empty();
                        $("#ma6").empty();
                        $("#mi6").empty();
                        $("#j6").empty();
                        $("#v6").empty();
                        $("#s6").empty();

                        $("#l7").empty();
                        $("#ma7").empty();
                        $("#mi7").empty();
                        $("#j7").empty();
                        $("#v7").empty();
                        $("#s7").empty();

                        $("#l8").empty();
                        $("#ma8").empty();
                        $("#mi8").empty();
                        $("#j8").empty();
                        $("#v8").empty();
                        $("#s8").empty();

                        $("#l9").empty();
                        $("#ma9").empty();
                        $("#mi9").empty();
                        $("#j9").empty();
                        $("#v9").empty();
                        $("#s9").empty();

                        $("#l10").empty();
                        $("#ma10").empty();
                        $("#mi10").empty();
                        $("#j10").empty();
                        $("#v10").empty();
                        $("#s10").empty();

                        $("#l11").empty();
                        $("#ma11").empty();
                        $("#mi11").empty();
                        $("#j11").empty();
                        $("#v11").empty();
                        $("#s11").empty();

                        $("#l12").empty();
                        $("#ma12").empty();
                        $("#mi12").empty();
                        $("#j12").empty();
                        $("#v12").empty();
                        $("#s12").empty();

                        $("#l13").empty();
                        $("#ma13").empty();
                        $("#mi13").empty();
                        $("#j13").empty();
                        $("#v13").empty();
                        $("#s13").empty();

                        for (var i = 0; i < obj.length; i++) {
                          var id = obj[i].cliente;
                          var nombre = obj[i].nombre;
                          var apaterno = obj[i].apaterno;
                          var amaterno = obj[i].amaterno;
                          var dia = obj[i].dia_visita;
                          var hora = obj[i].hora_visita;
                          var motivo = obj[i].motivo_visita;

                          var nombrecompleto = nombre + ' ' + apaterno + ' ' + amaterno;

                          switch (dia) {

                            //Lunes
                            case 'Lunes':

                            switch (hora) {
                              case '8a-9a':

                               $("#l2").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '9a-10a':

                               $("#l3").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '10a-11a':

                               $("#l4").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '11a-12p':

                               $("#l5").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '12p-1p':

                               $("#l6").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '1p-2p':

                               $("#l7").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '2p-3p':

                               $("#l8").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '3p-4p':

                               $("#l9").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '4p-5p':

                               $("#l10").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '5p-6p':

                               $("#l11").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '6p-7p':

                               $("#l12").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '7p-8p':

                               $("#l13").html(nombrecompleto + '<br>' + motivo);

                              break;

                            }

                            break;

                            //Martes
                            case 'Martes':

                            switch (hora) {
                              case '8a-9a':

                               $("#ma2").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '9a-10a':

                               $("#ma3").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '10a-11a':

                               $("#ma4").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '11a-12p':

                               $("#ma5").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '12p-1p':

                               $("#ma6").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '1p-2p':

                               $("#ma7").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '2p-3p':

                               $("#ma8").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '3p-4p':

                               $("#ma9").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '4p-5p':

                               $("#ma10").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '5p-6p':

                               $("#ma11").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '6p-7p':

                               $("#ma12").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '7p-8p':

                               $("#ma13").html(nombrecompleto + '<br>' + motivo);

                              break;

                            }

                            break;

                            //Miercoles
                            case 'Miercoles':

                            switch (hora) {
                              case '8a-9a':

                               $("#mi2").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '9a-10a':

                               $("#mi3").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '10a-11a':

                               $("#mi4").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '11a-12p':

                               $("#mi5").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '12p-1p':

                               $("#mi6").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '1p-2p':

                               $("#mi7").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '2p-3p':

                               $("#mi8").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '3p-4p':

                               $("#mi9").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '4p-5p':

                               $("#mi10").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '5p-6p':

                               $("#mi11").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '6p-7p':

                               $("#mi12").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '7p-8p':

                               $("#mi13").html(nombrecompleto + '<br>' + motivo);

                              break;

                            }

                            break;

                            //Jueves
                            case 'Jueves':

                            switch (hora) {
                              case '8a-9a':

                               $("#j2").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '9a-10a':

                               $("#j3").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '10a-11a':

                               $("#j4").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '11a-12p':

                               $("#j5").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '12p-1p':

                               $("#j6").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '1p-2p':

                               $("#j7").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '2p-3p':

                               $("#j8").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '3p-4p':

                               $("#j9").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '4p-5p':

                               $("#j10").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '5p-6p':

                               $("#j11").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '6p-7p':

                               $("#j12").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '7p-8p':

                               $("#j13").html(nombrecompleto + '<br>' + motivo);

                              break;

                            }

                            break;

                            //Viernes
                            case 'Viernes':

                            switch (hora) {
                              case '8a-9a':

                               $("#v2").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '9a-10a':

                               $("#v3").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '10a-11a':

                               $("#v4").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '11a-12p':

                               $("#v5").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '12p-1p':

                               $("#v6").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '1p-2p':

                               $("#v7").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '2p-3p':

                               $("#v8").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '3p-4p':

                               $("#v9").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '4p-5p':

                               $("#v10").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '5p-6p':

                               $("#v11").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '6p-7p':

                               $("#v12").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '7p-8p':

                               $("#v13").html(nombrecompleto + '<br>' + motivo);

                              break;

                            }

                            break;

                            //Sabado
                            case 'Sabado':

                            switch (hora) {
                              case '8a-9a':

                               $("#s2").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '9a-10a':

                               $("#s3").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '10a-11a':

                               $("#s4").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '11a-12p':

                               $("#s5").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '12p-1p':

                               $("#s6").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '1p-2p':

                               $("#s7").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '2p-3p':

                               $("#s8").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '3p-4p':

                               $("#s9").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '4p-5p':

                               $("#s10").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '5p-6p':

                               $("#s11").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '6p-7p':

                               $("#s12").html(nombrecompleto + '<br>' + motivo);

                              break;

                              case '7p-8p':

                               $("#s13").html(nombrecompleto + '<br>' + motivo);

                              break;

                            }

                            break;

                          }

                        }
                    }
                    else
                    {
                        swal("Error","No existen datos para el rango de fechas seleccionado","error");
                    }

                },
                error: function(){
                    swal("Error","Ha ocurrido un error","error");
                }
            });
        }
    }

/*END CONTROLLER CLIENTES */

/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */

