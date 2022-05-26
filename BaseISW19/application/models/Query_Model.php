<?php

class Query_Model extends CI_Model{

 /* =============================================================================================================================================================================================================================== */

 /* START - CONTROLLER: Usuarios */

function InsertUsuario($datosusuario)
{
  $this->db->insert('usuarios', $datosusuario);
}

function DatosUsuario()
{
  $this->db->select('*');
  $this->db->from('usuarios');
  $this->db->where("(rol= 'A' OR rol = 'SU' OR rol = 'E')",NULL,FALSE);
  $query = $this->db->get();
  return $query->result();

}

function GetUserById($id)
{
  $this->db->select('*');
  $this->db->from('usuarios');
  $this->db->where('id_usuario', $id);
  $query = $this->db->get();
  return $query->result();
}

 /* END - CONTROLLER: Usuarios */

/* =============================================================================================================================================================================================================================== */


/* =============================================================================================================================================================================================================================== */



/* START - CONTROLLER: Dashboard */

/* END - CONTROLLER: Dashboard */


}
