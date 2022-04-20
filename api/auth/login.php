<?php
require_once("../config/db.php");
require_once("../config/header.php");

require_once("classes/Login.php");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if ($_POST){
  $login = new Login();  

  if (isset($login)) {
    if ($login->errors) {
      http_response_code(400);
      foreach ($login->errors as $error) {
          echo die(json_encode(["error" => $error]));
      }
    }
    if ($login->messages) {
      http_response_code(200);
      foreach ($login->messages as $message) {
          echo json_encode(["message" => $message, "data" => $login->data]);
      }
    }
  }
}
