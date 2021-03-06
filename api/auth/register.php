<?php
require_once("../config/db.php");
require_once("../config/header.php");

require_once("classes/Registration.php");
require_once("classes/ImageUploader.php");

$registration = new Registration();
$res = array();
$isSuccess = true;

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

try {
    // upload image
    $imageUploader = new ImageUploader();
    $imageUploader->setPath("../uploads");
    // The rest are optional
    $imageUploader->setSalt("my_application_specific_salt");
    $imageUploader->setMinFileSize(0);
    $imageUploader->setMaxFileSize(2000000);

    if ($_POST["upload_avatar_method"] === "imageLink") {
        $imageUploader->uploadImageLink($_POST["avatar"], $_POST["user_name"]);
    } else { // imageFile
        $imageUploader->uploadImageFile($_FILES["avatar"], $registration->new_user_id);
    }
} catch (Exception $e) {
    $isSuccess = false;
    $res = array_merge($res, array("error" => "Avatar Upload Error: " . $e->getMessage()));
} finally {
    if ($isSuccess) $res = array_merge($res, array("message" => "Avatar Upload " . "Success")); // haven't used by frontend
}

if ($isSuccess) http_response_code(201);
else http_response_code(400);

echo json_encode($res);

?>