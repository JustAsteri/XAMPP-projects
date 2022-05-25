<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuarios extends MY_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index(){
        $data['tabTitle'] = "Plantilla Base - Usuarios";
        $data['pagecontent'] = "usuarios/usuarios";
        $data['usuarios'] = $this->Query_Model->DatosUsuario();

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

   public function UsuarioPorID()
   {
        $id = $this->input->post('id');
        $res = $this->Query_Model->GetUserById($id);
        echo json_encode($res);
   }

}
