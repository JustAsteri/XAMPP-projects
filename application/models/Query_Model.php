<?php

class Query_Model extends CI_Model{

 /* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */



/* START - CONTROLLER: Dashboard */



/* END - CONTROLLER: Dashboard */

/* START - CONTROLLER: Usuarios */

function InsertUsuario($datosusuario){
    $this->db->insert('usuarios',$datosusuario);
}
function GetUserByName($usuario){
    $this->db->select('*');
    $this->db->from('usuarios');
    $this->db->where('username',$usuario);
    $query = $this->db->get();
    return $query->result();
}

function DatosUsuario(){

    $this->db->select('*');
    $this->db->from('usuarios');
    $this->db->where("(rol= 'A' OR rol = 'E')",NULL,FALSE);
    $query = $this->db->get();
    return $query->result();
}

function GetUserById($id){

    $this->db->select('*');
    $this->db->from('usuarios');
    $this->db->where('id_usuario',$id);
    $query = $this->db->get();
    return $query->result();

}

function UpdateUsuario($id,$datosusuario){

    $this->db->where('id_usuario',$id);
    $this->db->update('usuarios',$datosusuario);

}


/* END - CONTROLLER: Usuarios */

// ------------------------------------------------------------------------------------------------------

/* START - CONTROLLER: Clientes */

function DatosCliente(){

    $this->db->select('*');
    $this->db->from('clientes');
    $query = $this->db->get();
    return $query->result();
}

function InsertCliente($datosusuario){
    $this->db->insert('clientes',$datosusuario);
}
function GetClienteByName($usuario){
    $this->db->select('*');
    $this->db->from('cliente');
    $this->db->where('username',$usuario);
    $query = $this->db->get();
    return $query->result();
}

// function DatosUsuario(){

//     $this->db->select('*');
//     $this->db->from('usuarios');
//     $this->db->where("(rol= 'A' OR rol = 'E')",NULL,FALSE);
//     $query = $this->db->get();
//     return $query->result();
// }

function GetClienteById($id){

    $this->db->select('*');
    $this->db->from('clientes');
    $this->db->where('id_cliente',$id);
    $query = $this->db->get();
    return $query->result();
}

function UpdateCliente($id,$datosusuario){

    $this->db->where('id_cliente',$id);
    $this->db->update('clientes',$datosusuario);

}


/* END - CONTROLLER: Usuarios */

//==============================================================================

/* START - CONTROLLER: CALENDARIO */

function DatosClientesActivos()
{
    $this->db->select('*');
    $this->db->from('clientes');
    $this->db->where('estado',1);
    $query = $this->db->get();
    return $query->result();  
  }



/* END - CONTROLLER: CALENDARIO */

//==============================================================================

/* START - CONTROLLER: HORARIO */

function HorariosPorCliente($cliente,$fecha1,$fecha2,$anio){

    $query= $this->db->query("SELECT horarios.id_horario, horarios.cliente, horarios.dia_visita, horarios.hora_visita, horarios.motivo_visita, clientes.id_cliente,
      clientes.nombre, clientes.apaterno, clientes.amaterno FROM horarios JOIN clientes ON clientes.id_cliente = horarios.cliente WHERE horarios.cliente = '$cliente'
      AND DATE(horarios.fecha_operacion) BETWEEN '$fecha1' AND '$fecha2' AND horarios.numero_anio = '$anio'");
    return $query->result();

}

function CheckHorarioDisponible($id, $dia, $semana, $hora, $anio){

  $this->db->select('*');
  $this->db->from('horarios');
  $this->db->where('cliente',$id);
  $this->db->where('hora_visita',$hora);
  $this->db->where('dia_visita',$dia);
  $this->db->where('numero_semana',$semana);
  $this->db->where('numero_anio',$anio);
  $query = $this->db->get();
  return $query->result();

}

/* START - CONTROLLER: HORARIO */
}