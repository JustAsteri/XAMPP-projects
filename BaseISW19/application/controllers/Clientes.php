<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Clientes extends MY_Controller {
        
    public function __construct() {
        parent::__construct();
    }

    public function index(){
        $data['tabTitle'] = "Plantilla Base - Clientes";
        $data['pagecontent'] = "clientes/clientes";
        $data['clientes'] = $this->Query_Model->DatosCliente();
        
        $this->loadpageintotemplate($data);
       
   }

   function CheckUsuarioExistente(){
       $usuario = $this->input->post('cliente');
       $res = $this->Query_Model->GetClienteByName($cliente);
       echo json_encode($res);
   }

   public function SaveClient(){
    $codigo = uniqid();

    $nombre   = $this->input->post('nombre');
    $apaterno = $this->input->post('apaterno');
    $amaterno = $this->input->post('amaterno');
    $telefono = $this->input->post('telefono');
    $email    = $this->input->post('email');
    // $username = $this->input->post('username');
    // $password = $this->input->post('password');
    $empresa = $this->input->post('empresa');
    $token   = $codigo;


   $datosusuario = array(
       'nombre'       => $nombre,
       'apaterno'     => $apaterno,
       'amaterno'     => $amaterno,
       'telefono'     => $telefono,
       'email'        => $email,
       // 'username'  => $username,
       // 'password'  => $password,
       // 'rol'       => $rol,
       // 'ocupacion' => $ocupacion,
       'empresa'      => $empresa,
       'token'        => $token,
       'estado'       => '1'
   );
   $this->Query_Model->InsertCliente($datosusuario);

}

public function ClientePorID(){
    $id = $this->input->post('id');
    $res = $this->Query_Model->GetClienteById($id);
    echo json_encode($res);
}

public function UpdateCliente(){

    $id       = $this->input->post('id');
    $nombre   = $this->input->post('nombre');
    $apaterno = $this->input->post('apaterno');
    $amaterno = $this->input->post('amaterno');
    $telefono = $this->input->post('telefono');
    $email    = $this->input->post('email');
    // $username = $this->input->post('username');
    // $password = $this->input->post('password');
    $empresa = $this->input->post('empresa');
    $estado  = $this->input->post('estado');

   $datosusuario = array(
       'nombre'    => $nombre,
       'apaterno'  => $apaterno,
       'amaterno'  => $amaterno,
       'telefono'  => $telefono,
       'email'     => $email,
       // 'username' => $username,
       // 'password' => $password,
       // 'rol'      => $rol,
       // 'token'    => $token,
       'estado'      => $estado
   );
   $this->Query_Model->UpdateCliente($id,$datosusuario);
}




}