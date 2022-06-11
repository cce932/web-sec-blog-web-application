<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
header('Access-Control-Allow-Origin: http://mid.dena.software');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Method, Content-type, Authorization');
header('Access-Control-Expose-Headers: Origin, Method, Content-type, Content-Disposition');

$method = $_SERVER['REQUEST_METHOD'];


if ('GET' === $method && isset($_GET)) {
    $db_connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if (!$db_connection->set_charset("utf8")) {
        echo die(json_encode(["errors" => $db_connection->error]));
    }

    if (!$db_connection->connect_errno) {
        if (isset($_GET["message_id"])) {
            $message_id = $db_connection->real_escape_string(strip_tags($_GET['message_id'], ENT_QUOTES));

            $query = "
              SELECT `type`, `name`, `size`, `content`
              FROM `files`
              WHERE `message_id` = '{$message_id}'";

            $result = $db_connection->query($query);
            
            if ($result->num_rows == 1) {
                http_response_code(200);
                $row = mysqli_fetch_assoc($result);
 
                header("Content-Type: ". $row['type']);
                header("Content-Length: ". $row['size']);
                header("Content-Disposition: attachment; filename=". $row['name']);
 
                echo $row['content'];
            } else {
                http_response_code(400);
                echo json_encode(["errors" => "Sorry, get message failed, please retry."]);
            }
        }
    }
    $db_connection->close();
}
?>

