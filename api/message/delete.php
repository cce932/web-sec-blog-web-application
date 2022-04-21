<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
require_once("../config/header.php");

$method = $_SERVER['REQUEST_METHOD'];

if ('DELETE' === $method && isset($_GET["id"])) {
  $db_connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  
  
  if (!$db_connection->set_charset("utf8")) {
      echo die(json_encode(["errors" => $db_connection->error]));
  }
  
  
  if (!$db_connection->connect_errno) {
  
    $id = $db_connection->real_escape_string(strip_tags($_GET['id'], ENT_QUOTES));
    $user_id = $db_connection->real_escape_string(strip_tags($_SERVER['HTTP_AUTHORIZATION'], ENT_QUOTES));
  
    $sql = "DELETE messages , files  FROM messages LEFT JOIN files ON `messages`.`id` = `files`.`message_id` WHERE `messages`.`id` = '" . $id . "' AND `messages`.`user_id` = '" . $user_id ."';";

    $query_delete_user = $db_connection->query($sql);

    if ($db_connection->affected_rows === 0) {
      http_response_code(404);
      echo die(json_encode(["errors" => "Sorry, You are only allowed to delete your message."]));
    }
    
    if ($query_delete_user) {
        http_response_code(200);
        echo json_encode(["messages" => "The message has been deleted successfully."]);
    } else {
        http_response_code(400);
        echo json_encode(["errors" => "Sorry, deleting message failed. Please go back and try again."]);
    }
  
  }
  
  $db_connection->close();
}
?>