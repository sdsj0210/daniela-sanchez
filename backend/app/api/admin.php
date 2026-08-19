<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../auth.php';

if (!isset($_SESSION['usuario'])) {
    http_response_code(401);

    echo json_encode([
        'error' => 'No autenticado'
    ]);

    exit;
}

if (!esAdmin($_SESSION['usuario']['rol'])) {
    http_response_code(403);

    echo json_encode([
        'error' => 'Acceso denegado'
    ]);

    exit;
}

echo json_encode([
    'message' => 'Acceso permitido',
    'usuario' => $_SESSION['usuario']
]);