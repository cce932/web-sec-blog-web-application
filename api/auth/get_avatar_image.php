<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
require_once("../config/header.php");

require_once("classes/ImageUploader.php");

$method = $_SERVER['REQUEST_METHOD'];

if ('GET' === $method) {
  $user_id = $_SERVER['HTTP_AUTHORIZATION'];
  
  if (isset($user_id)) {
    $imageUploader = new ImageUploader("../uploads", "my_application_specific_salt");
    $avatar = $imageUploader->serve($user_id);

    http_response_code(200);
    print_r($avatar);
  }
}
?>

