<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Method, Content-type, Authorization');
header('Access-Control-Expose-Headers: Origin, Method, Content-type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// ini_set('max_execution_time', 300);
// ini_set('max_input_time', 300);
// ini_set('memory_limit', '4G');
?>