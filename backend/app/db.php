<?php

$config = require __DIR__ . '/../config/config.php';

$dsn = "mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8mb4";

try {
    $pdo = new PDO(
        $dsn,
        $config['db_user'],
        $config['db_pass'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    die('Error de conexión con la base de datos.');
}

?>