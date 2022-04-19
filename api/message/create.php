<?php
require_once("../config/db.php");
require_once("../config/header.php");

$res = array();

if (isset($_POST)) {
  $db_connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  
  
  if (!$db_connection->set_charset("utf8")) {
      echo die(json_encode(["errors" => $db_connection->error]));
  }
  
  
  if (!$db_connection->connect_errno) {
  
    // Save message
    $message = $db_connection->real_escape_string(strip_tags($_POST['message'], ENT_QUOTES));
    $username = $db_connection->real_escape_string(strip_tags($_POST['username'], ENT_QUOTES));
    $user_id = $db_connection->real_escape_string(strip_tags($_SERVER['HTTP_AUTHORIZATION'], ENT_QUOTES));
  
    $insertMsgSql = "INSERT INTO messages (message, username, user_id, created_time)
            VALUES('" . $message . "', '" . $username . "', '" . $user_id ."' , NOW());";
    $query_new_message_insert = $db_connection->query($insertMsgSql);
    $message_id = $db_connection->insert_id;
  
    if ($query_new_message_insert) {
        http_response_code(200);
        $res = array_merge($res, ["msg_messages" => "Your message has been sent successfully.",  "id" => $message_id]);
    } else {
        http_response_code(400);
        echo die(json_encode(["errors" => "Sorry, creating message failed. Please go back and try again."]));
    }

    // Save file
    if (isset($_FILES['file'])) {
      $name = $db_connection->real_escape_string($_FILES['file']['name']);
      $type = $db_connection->real_escape_string($_FILES['file']['type']);
      $data = $db_connection->real_escape_string(file_get_contents($_FILES['file']['tmp_name']));
      $size = intval($_FILES['file']['size']);
  
      $insertFileSql = "
          INSERT INTO `files` (
              `name`, `type`, `size`, `content`, `saved_date`, `message_id`
          )
          VALUES (
              '{$name}', '{$type}', {$size}, '{$data}', NOW(), {$message_id}
          )";
  
      $result = $db_connection->query($insertFileSql);
  
      
      if($result) {
          http_response_code(200);
          echo json_encode(array_merge($res, ["file_messages" =>'Your file was successfully added!']));
      } else {
        http_response_code(400);
        echo die(json_encode(["errors" => "Sorry, save message file failed. Please go back and try again."]));
      }
    } else {
      http_response_code(200);
      echo json_encode($res);
    }
  }
  
  $db_connection->close();
}
?>