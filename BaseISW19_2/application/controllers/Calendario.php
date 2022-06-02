<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Calendario extends MY_Controller {
        
    public function __construct() {
        parent::__construct();
    }

    public function index(){
        $data['tabTitle'] = "Plantilla Base - Inicio";
        $data['pagecontent'] = "calendario/calendario";


       $data['clientes'] = $this->Query_Model->DatosClientes();
        $this->loadpageintotemplate($data);
       
   }

   public function HorariosCliente(){
       $id = $this->input->post("id");
       $res = $this->Query_Model->HorariosPorCliente($id);;
       echo json_encode($res);
   }


}