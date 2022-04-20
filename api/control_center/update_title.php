<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
require_once("../config/header.php");

$method = $_SERVER['REQUEST_METHOD'];

$rest_json = file_get_contents("php://input");
$_PUT = json_decode($rest_json, true);

if ('PUT' === $method && isset($_PUT["title"])) {
  $db_connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  
  
  if (!$db_connection->set_charset("utf8")) {
      echo die(json_encode(["errors" => $db_connection->error]));
  }
  
  
  if (!$db_connection->connect_errno) {
  
    $title = $db_connection->real_escape_string(strip_tags($_PUT['title'], ENT_QUOTES));
    
    $sql = "UPDATE website_config SET value='" . $title . "' WHERE item='title';";
    
    $query_delete_user = $db_connection->query($sql);
    
    if ($query_delete_user) {
        http_response_code(200);
        echo json_encode(["messages" => "The title updated successfully."]);
    } else {
        http_response_code(400);
        echo json_encode(["errors" => "Sorry, update title failed. Please go back and try again."]);
    }
  
  }
  
  $db_connection->close();
}
?>