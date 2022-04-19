<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
require_once("../config/header.php");

// load the login class
require_once("classes/Login.php");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// print "=====$rest_json";

if ($_POST){
  // create a login object. when this object is created, it will do all login/logout stuff automatically
  // so this single line handles the entire login process. in consequence, you can simply ...
  $login = new Login();

  // print "==== empty in login";
  if (isset($login)) {
    if ($login->errors) {
        http_response_code(400);
        foreach ($login->errors as $error) {
            echo die(json_encode(["error" => $error]));
        }
        // exit();
    }
    if ($login->messages) {
        http_response_code(200);
        foreach ($login->messages as $message) {
            echo json_encode(["message" => $message, "data" => $login->data]);
        }
    }
  }
}
