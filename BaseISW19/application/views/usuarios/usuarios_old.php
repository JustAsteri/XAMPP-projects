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
                                  <!-- <form role="form" method="POST" id="formMaterial"> -->
                                    <div class="box-body col-xs-4">
                                        <div class="col-xs-12">
                                            <input class="form-control" type="text" required="" id="nombre" placeholder="Nombre">
                                        </div>
                                        <div class="col-xs-12">
                                            <input class="form-control" type="text" required="" id="apaterno" placeholder="Apellido paterno">
                                        </div>
                                        <div class="col-xs-12">
                                            <input class="form-control" type="text" required="" id="amaterno" placeholder="Apellido Materno">
                                        </div>
                                        <div class="col-xs-12">
                                            <input class="form-control" type="text" required="" id="telefono" placeholder="Telefono">
                                        </div>
                                        <div class="col-xs-12">
                                            <input class="form-control" type="text" required="" id="email" placeholder="Email">
                                        </div>
                                        <div class="col-xs-12">
                                            <input class="form-control" type="text" required="" id="username" placeholder="Usuario">
                                        </div>
                                        <div class="col-xs-12">
                                            <input class="form-control" type="password" required="" id="password" placeholder="Contraseña">
                                        </div>
                                        <div class="col-xs-12">
                                            <select name="rol" id="rol">
                                                <option value="" disabled>Elije un Rol</option>
                                                <option value="A">Administrador</option>
                                                <option value="E">Empleado</option>
                                            </select>
                                        </div>
                                        <div align="center">
                                          <button class="btn btn-primary waves-effect waves-light" onClick="guardar_usuario();">Guardar</button>
                                        </div>
                                      </div>
                                    </div>
                                  <!-- </form> -->

                                  <!-- Table -->
                                    <div class="box-body col-xs-7">
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
                                </div>
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
