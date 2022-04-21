<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
require_once("../config/header.php");

$method = $_SERVER['REQUEST_METHOD'];

if ('GET' === $method && isset($_GET)) {
    $db_connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if (!$db_connection->set_charset("utf8")) {
        echo die(json_encode(["errors" => $db_connection->error]));
    }

    if (!$db_connection->connect_errno) {
        if (isset($_GET["id"])) {
            $id = $db_connection->real_escape_string(strip_tags($_GET['id'], ENT_QUOTES));

            $sql = "SELECT messages.id, message, username, user_id, created_time, name, type, size, saved_date, message_id 
                    FROM `messages` LEFT JOIN `files` ON `messages`.`id` = `files`.`message_id` WHERE messages.id= '" . $id . "';";

            $result_of_message_by_id = $db_connection->query($sql);
            
            if ($result_of_message_by_id->num_rows == 1) {
                http_response_code(200);
                echo json_encode($result_of_message_by_id->fetch_object());
            } else {
                http_response_code(400);
                echo json_encode(["errors" => "Sorry, get message failed, please retry."]);
            }
        } else {
            $sql = "SELECT messages.id, message, username, user_id, created_time, name, type, size, saved_date, message_id 
                    FROM `messages` LEFT JOIN `files` ON `messages`.`id` = `files`.`message_id`;";

            $result_of_messages = $db_connection->query($sql);
            
            if ($result_of_messages) {
                http_response_code(200);
                echo json_encode($result_of_messages->fetch_all(MYSQLI_ASSOC));
            } else {
                http_response_code(400);
                echo json_encode(["errors" => "Sorry, get messages failed, please retry."]);
            }
        }

    }
    $db_connection->close();
}
?>

