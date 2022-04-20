<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
header('Access-Control-Allow-Origin: http://mid.dena.software');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Method, Content-type, Authorization');
header('Access-Control-Expose-Headers: Origin, Method, Content-type');
header('Access-Control-Allow-Credentials: true');

require_once("classes/ImageUploader.php");

$method = $_SERVER['REQUEST_METHOD'];

if ('GET' === $method) {
  $user_id = $_SERVER['HTTP_AUTHORIZATION'];
  
  if (isset($user_id)) {
    $imageUploader = new ImageUploader("../uploads", "my_application_specific_salt");
    $avatar = $imageUploader->serve($user_id);
    
    http_response_code(200);
    echo $avatar;
  }
}
?>

