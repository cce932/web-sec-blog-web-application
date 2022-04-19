<?php
// include the configs / constants for the database connection
require_once("../config/db.php");
require_once("../config/header.php");

// load the registration class
require_once("classes/Registration.php");
require_once("classes/ImageUploader.php");

// create the registration object. when this object is created, it will do all registration stuff automatically
// so this single line handles the entire registration process.

// 因為是傳入form data所以不用轉json
// $rest_json = file_get_contents("php://input");
// $_POST = json_decode($rest_json, true);

$registration = new Registration();
$res = array();
$isSuccess = true;

try {
// upload image
    $imageUploader = new ImageUploader();
    $imageUploader->setPath("../uploads");   // The directory where images will be uploaded
    // The rest are optional
    $imageUploader->setSalt("my_application_specific_salt");  // It is used while hashing image names
    $imageUploader->setMinFileSize(0);
    $imageUploader->setMaxFileSize(200000);

    if ($_POST["upload_avatar_method"] === "imageLink") {
        $imageUploader->uploadImageLink($_POST["avatar"], $_POST["user_name"]);
    } else { // imageFile
        $imageUploader->uploadImageFile($_FILES["avatar"], $_POST["user_name"]);
    }

    // get image
    // $result = $imageUploader->serve($_POST["user_name"]);
    // print_r(json_encode($result));
} catch (Exception $e) {
    $isSuccess = false;
    $res = array_merge($res, array("error" => "Avatar Upload Error: " . $e->getMessage()));
} finally {
    if ($isSuccess) $res = array_merge($res, array("message" => "Avatar Upload " . "Success")); // haven't used by frontend
}


if (isset($registration)) {
  if ($registration->errors) {
      $isSuccess = false;
      foreach ($registration->errors as $error) {
          $res = array_merge($res, array("error" => "Register Error: " . $error));
      }
  }
  if ($registration->messages) {
      foreach ($registration->messages as $message) {
        $res = array_merge($res, array("message" => "Register " . $message));
      }
  }
}
if ($isSuccess) http_response_code(201);
else http_response_code(400);

echo json_encode($res);

?>