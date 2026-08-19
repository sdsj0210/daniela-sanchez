<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode([
        'error' => 'Email y contraseña son obligatorios'
    ]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT id, nombre, email, password_hash, rol
    FROM usuarios
    WHERE email = ?
      AND activo = 1
    LIMIT 1
");

$stmt->execute([$email]);

$usuario = $stmt->fetch();

if (!$usuario || !password_verify($password, $usuario['password_hash'])) {
    http_response_code(401);
    echo json_encode([
        'error' => 'Credenciales incorrectas'
    ]);
    exit;
}

$_SESSION['usuario'] = [
    'id' => $usuario['id'],
    'nombre' => $usuario['nombre'],
    'email' => $usuario['email'],
    'rol' => $usuario['rol']
];

echo json_encode([
    'message' => 'Login correcto',
    'usuario' => $_SESSION['usuario']
]);