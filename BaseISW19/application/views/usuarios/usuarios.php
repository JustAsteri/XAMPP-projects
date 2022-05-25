    <!-- Content Wrapper. Contains page content -->

    <?php
     /* Dependencias requeridas para el funcionamiento de la DataTable */
    /* ==============================================================
            <---  CSS TEMPLATE  --->
            ============================================================== */

            echo link_tag('assets/darktemplate/plugins/bootstrap-sweetalert/sweet-alert.css');

    /* ==============================================================
            <---  JS TEMPLATE  --->
            ============================================================== */

            echo script_tag("assets/darktemplate/plugins/bootstrap-sweetalert/sweet-alert.js");
            echo script_tag("assets/darktemplate/pages/jquery.sweet-alert.init.js");

    /* ==============================================================
            <---  JS MYAPP  --->
            ============================================================== */
             echo script_tag("assets/myapp/js/MY_Functions.js");
            ?>


<html>
    <head>
        <meta charset="utf-8">

    </head>

    <script>
        var resizefunc = [];

        $(document).ready(function() {


        });


    </script>


    <body class="fixed-left">

        <!-- Begin page -->
        <div id="wrapper">

            <!-- ============================================================== -->
            <!-- Start right Content here -->
            <!-- ============================================================== -->
            <div class="content-page">
                <!-- Start content -->
                <div class="content">
                    <div class="container">

                        <!-- Page-Title -->
                        <div class="row">
                            <div class="col-sm-12">
                                <h4 class="page-title">Inicio</h4>

                            </div>
                        </div>

                        <br>

                         <div class="col-lg-12">
                          <div class="panel panel-border panel-info">
                              <div class="panel-heading">
                                  <h3 class="panel-title">Titulo</h3>
                              </div>
                              <div class="table-responsive">
                                <div class="panel-body">

                                  <div class="card-box">
                                    <div class="box-body col-xs-4">

                                      <div class="form-group">
                                          <div class="col-xs-12">
                                              <input class="form-control" type="text" required="" id="nombre" onkeypress="return verifyenterkeypressed(event)"
                                              placeholder="Nombre">
                                          </div>
                                      </div>

                                      <div class="form-group">
                                          <div class="col-xs-12">
                                              <input class="form-control" type="text" required="" id="apaterno" onkeypress="return verifyenterkeypressed(event)"
                                              placeholder="Apellido paterno">
                                          </div>
                                      </div>

                                      <div class="form-group">
                                          <div class="col-xs-12">
                                              <input class="form-control" type="text" required="" id="amaterno" onkeypress="return verifyenterkeypressed(event)"
                                              placeholder="Apellido materno">
                                          </div>
                                      </div>

                                      <div class="form-group">
                                          <div class="col-xs-12">
                                              <input class="form-control" type="text" required="" id="telefono" onkeypress="return verifyenterkeypressed(event)"
                                              placeholder="Telefono">
                                          </div>
                                      </div>

                                      <div class="form-group">
                                          <div class="col-xs-12">
                                              <input class="form-control" type="text" required="" id="email" onkeypress="return verifyenterkeypressed(event)"
                                              placeholder="Correo Eléctronico">
                                          </div>
                                      </div>

                                      <div class="form-group">
                                          <div class="col-xs-12">
                                              <input class="form-control" type="text" required="" id="username" onkeypress="return verifyenterkeypressed(event)"
                                              placeholder="Nombre de Usuario">
                                          </div>
                                      </div>

                                      <div class="form-group">
                                          <div class="col-xs-12">
                                              <input class="form-control" type="password" required="" id="password" onkeypress="return verifyenterkeypressed(event)"
                                              placeholder="Contraseña">
                                          </div>
                                      </div>

                                      <div class="form-group ">
                                          <select id="rol" name ="rol" class="form-control" style="">
                                              <option value ="">Elige un rol</option>
                                              <option value ="A">Administrador</option>
                                              <option value ="E">Empleado</option>
                                          </select>
                                        </div>
                                      <br>
                                      <br>
                                      <br>


                                      <div align="center">
                                        <button class="btn btn-primary waves-effect waves-light" onClick="guardar_usuario();">Guardar</button>
                                      </div>

                                    </div>
                                    <div class="box-body col-xs-8">

                                    <div class="panel panel-border panel-info">
                                          <div class="panel-heading">
                                              <h3 class="panel-title">Listado de Usuarios</h3>
                                          </div>
                                          <div class="table-responsive">
                                            <div class="panel-body">
                                              <table id="datatable1" class="table table-striped table-bordered table-responsive">
                                                <thead>
                                                  <tr>
                                                    <th>Nombre Completo</th>
                                                    <th>Ocupacion</th>
                                                    <th>Estatus</th>
                                                    <th>Editar</th>
                                                    <th>Borrar</th>
                                                  </tr>
                                                </thead>

                                                <tbody> 

                                                  <?php

                                                  $valores = count($usuarios);
                                                  for ($i=0; $i < $valores ; $i++) { 
                                                    $res = $usuarios[$i];
                                                    $id = $res -> id_usuario;
                                                    $nombre = $res -> nombre;
                                                    $apaterno= $res -> apaterno;
                                                    $amaterno = $res -> amaterno;
                                                    $estatus = $res -> estado; 
                                                    $ocupacion = $res -> ocupacion; 

                                                    $nombre_completo = $nombre . ' ' .$apaterno. ' ' .$amaterno;
                                                    // $contacto_emergencia = $contacto . ' - ' . $numero;

                                                    echo "
                                                    <tr>
                                                      <td>$nombre_completo</td>
                                                      <td>$ocupacion</td>";

                                                      if($estatus == 1) {
                                                        echo "<td><span class='label label-success'>Activo</span></td>";
                                                      }else{
                                                        echo "<td><span class='label label-danger'>Inactivo</span></td>";
                                                      }

                                                      echo "<td>";
                                                      echo "<a href='#' id='Editar' onclick='EditarUsuario($id)'><i class='fa fa-pencil'></i> </a>
                                                      </td>";

                                                      echo "<td>";
                                                      echo "<a href='#' id='Borrar' onclick='BorrarUsuario($id)'><i class='md md-close'></i> </a>
                                                      </td>";
                                                     
                                                    echo "</tr>";
                                                  }
                                                ?> 

                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                  </div>
                                    </div>
                                    
                                   <!--  <div class="box-body col-xs-7">
                                        <table class="table">
                                          <thead>
                                            <title>Lista de usuarios</title>
                                            <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Nombre</th>
                                              <th scope="col">Contacto de Emergencia</th>
                                              <th scope="col">Referidor</th>
                                              <th scope='col'>Sucursal</th>
                                              <th scope='col'>Fecha de valoracion</th>
                                              <th scope='col'>Fecha de revaloracion</th>
                                              <th scope='col'>Fecha de nacimiento</th>
                                              <th scope='col'>Escuela</th>
                                              <th scope='col'>Codigo</th>
                                              <th scope='col'>Estatus</th>
                                              <th scope='col'>Editar</th>
                                              <th scope='col'>Borrar</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <th scope="row">1</th>
                                              <td>Mark</td>
                                              <td>Otto</td>
                                              <td>@mdo</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">2</th>
                                              <td>Jacob</td>
                                              <td>Thornton</td>
                                              <td>@fat</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">3</th>
                                              <td colspan="2">Larry the Bird</td>
                                              <td>@twitter</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                    </div>
                                </div> -->

                            </div>
                          </div>
                        </div>
                        </div>

                    </div> <!-- container -->
                </div> <!-- content -->

                <footer class="footer">
                     <?= date('Y')?> &copy;
                </footer>

            </div>
            <!-- ============================================================== -->
            <!-- End Right content here -->
            <!-- ============================================================== -->



        </div>
        <!-- END wrapper -->

    </body>
</html>
