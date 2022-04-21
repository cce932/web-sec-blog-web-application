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
        
        $user_id = $db_connection->real_escape_string(strip_tags($_SERVER['HTTP_AUTHORIZATION'], ENT_QUOTES));
        $username = $db_connection->real_escape_string(strip_tags($_GET['username'], ENT_QUOTES));
        
        $sql = "SELECT (role) 
                FROM `users` WHERE id='" . $user_id . "' AND username = '" . $username . "';";

        $result_of_message_by_id = $db_connection->query($sql);
        
        if ($result_of_message_by_id->num_rows == 1) {
            http_response_code(200);
            echo json_encode($result_of_message_by_id->fetch_object());
        } else {
            http_response_code(400);
            echo json_encode(["errors" => "Sorry, get role failed, please retry."]);
        }
    }
    $db_connection->close();
}
?>

