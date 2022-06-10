<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Calendario extends MY_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index(){
        $data['tabTitle'] = "Plantilla Base - Inicio";
        $data['pagecontent'] = "calendario/calendario";


       $data['clientes'] = $this->Query_Model->DatosClientesActivos();
        $this->loadpageintotemplate($data);

   }

   public function HorariosCliente(){
       $cliente = $this->input->post("clientes");
       $fecha1 = $this->input->post("fecha1");
       $fecha2 = $this->input->post("fecha2");
       $anio = $this->input->post("anio");

       $res = $this->Query_Model->HorariosPorCliente($cliente, $fecha1, $fecha2, $anio);
       echo json_encode($res);
       //hola
   }

   public function SaveHorario(){

     $id = $this->input->post('id');
     $tempo = $this->input->post('fecha');
     $hora = $this->input->post('hora');
     $motivo = $this->input->post('motivo');
     $dia;

     $fecha = new DateTime($tempo);
     $tempodia = $fecha->format("l");
     $semana = $fecha->format("W");
     $anio = $fecha->format("Y");

     switch ($tempodia) {
       case 'Monday':

       $dia = 'Lunes';

       break;

       case 'Tuesday':

       $dia = 'Martes';

       break;

       case 'Wednesday':

       $dia = 'Miercoles';

       break;

       case 'Thursday':

       $dia = 'Jueves';

       break;

       case 'Friday':

       $dia = 'Viernes';

       break;

       case 'Saturday':

       $dia = 'Sabado';

       break;
     }

     $msg;

     $res = $this->Query_Model->CheckHorarioDisponible($id, $dia, $semana, $hora, $anio);

     if ($res != NULL) {

       $msg = "TRUE";
       echo json_encode($msg);

     }else {

       $msg = "FALSE";
       echo json_encode($msg);

     }

   }

}