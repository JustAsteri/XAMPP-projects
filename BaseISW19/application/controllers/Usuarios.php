<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuarios extends MY_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index(){
        $data['tabTitle'] = "Plantilla Base - Usuarios";
        $data['pagecontent'] = "usuarios/usuarios";

        $this->loadpageintotemplate($data);

   }

   public function SaveUser()
   {
     $nombre   = $this->input->post('nombre');
     $apaterno = $this->input->post('apaterno');
     $amaterno = $this->input->post('amaterno');
     $telefono = $this->input->post('telefono');
     $email    = $this->input->post('email');
     $username = $this->input->post('username');
     $password = $this->input->post('password');
     $rol      = $this->input->post('rol');

     if ($rol == 'A') 
     {
        $ocupacion = "Administrador";
     }
     else if ($rol == 'E') 
     {
         $ocupacion = "Empleado";
     }
     else
     {
        $ocupacion = "ERROR";
     }

     $datosusuario = array(
       'nombre'    => $nombre,
       'apaterno'  => $apaterno,
       'email'     => $email,
       'username'  => $username,
       'password'  => $password,
       'telefono'  => $telefono,
       'amaterno'  => $amaterno,
      'rol'        => $rol,
       'ocupacion' => $ocupacion,
       'estado'    => 1
     );

     $this->Query_Model->InsertUsuario($datosusuario);
   }

}
