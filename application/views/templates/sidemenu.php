<!-- ========== Left Sidebar Start ========== -->

            <?php $rol = ($this->session->userdata('tipo_user'));

            echo "<script languaje='JavaScript'>
                
                $( document ).ready(function() {
                var roles= '$rol';

                switch(roles) {

                    case 'SU':

                        break;
                        
                    case 'A':

                        
                    
                        break;

                    case 'E':

                    break;
                        
                }
                
            });
                             
            </script>";
            ?>
        
            <div class="left side-menu" id="master" >
                <div class="sidebar-inner slimscrollleft">
                    <!--- Divider -->
                    <div id="sidebar-menu" >
                        <ul id="todo">
                            <li class="text-muted menu-title" style="color:black;">Menu</li>

                            <li class="has_sub" id="home">
                                <a href="<?= base_url('index.php/Dashboard/');?>" class="waves-effect waves-light" style="color:black;"><i class="fa fa-home "></i><span> Inicio</span> </a>
                            </li>
                            
                            <li class="has_sub" id="usuarios">
                                <a href="<?= base_url('index.php/Usuarios/');?>" class="waves-effect waves-light" style="color:black;"><i class="fa fa-user "></i><span> Usuarios</span> </a>
                            </li>
                            <li class="has_sub" id="calendario">
                                <a href="<?= base_url('index.php/Calendario/');?>" class="waves-effect waves-light" style="color:black;"><i class="fa fa-calendar "></i><span> Calendario</span> </a>
                            </li>
                            <li class="has_sub" id="clientes">
                                <a href="<?= base_url('index.php/Clientes/');?>" class="waves-effect waves-light" style="color:black;"><i class="fa fa-money "></i><span> Clientes</span> </a>
                            </li>


                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <!-- Left Sidebar End -->