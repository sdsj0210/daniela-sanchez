<?php

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'error' => 'Método no permitido'
    ]);

    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!is_array($input)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'error' => 'JSON inválido'
    ]);

    exit;
}

$nombre = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$telefono = trim($input['phone'] ?? '');
$fecha = trim($input['date'] ?? '');
$hora = trim($input['hour'] ?? '');
$personas = (int) ($input['guests'] ?? 0);
$mensaje = trim($input['message'] ?? '');

$errors = [];

/*
|--------------------------------------------------------------------------
| Validaciones
|--------------------------------------------------------------------------
*/

if ($nombre === '') {
    $errors['name'] = 'Nombre obligatorio';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Email inválido';
}

if ($telefono === '') {
    $errors['phone'] = 'Teléfono obligatorio';
}

if ($fecha === '') {
    $errors['date'] = 'Fecha obligatoria';
} else {
    $fechaObj = DateTime::createFromFormat('Y-m-d', $fecha);

    if (
        !$fechaObj ||
        $fechaObj->format('Y-m-d') !== $fecha
    ) {
        $errors['date'] = 'Fecha inválida';
    } elseif ($fecha < date('Y-m-d')) {
        $errors['date'] = 'La fecha no puede ser anterior a hoy';
    }
}

if ($hora === '') {
    $errors['hour'] = 'Hora obligatoria';
}

if ($personas < 1 || $personas > 10) {
    $errors['guests'] = 'Debe ser entre 1 y 10 personas';
}

if ($mensaje === '') {
    $errors['message'] = 'Mensaje obligatorio';
}

if (!empty($errors)) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'errors' => $errors
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Normalizar hora
|--------------------------------------------------------------------------
*/

$horaObj = DateTime::createFromFormat('H:i', $hora);

if (!$horaObj) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'errors' => [
            'hour' => 'Hora inválida'
        ]
    ]);

    exit;
}

$horaSql = $horaObj->format('H:i:s');

/*
|--------------------------------------------------------------------------
| Comprobar disponibilidad y guardar reserva
|--------------------------------------------------------------------------
*/

try {
    $pdo->beginTransaction();

    /*
     * Bloqueamos la fila de la franja mientras comprobamos el aforo.
     *
     * Esto evita que dos reservas simultáneas puedan superar
     * la capacidad máxima.
     */
    $stmtFranja = $pdo->prepare("
        SELECT id, capacidad_maxima
        FROM franjas_reserva
        WHERE hora = :hora
          AND activo = 1
        FOR UPDATE
    ");

    $stmtFranja->execute([
        ':hora' => $horaSql
    ]);

    $franja = $stmtFranja->fetch();

    if (!$franja) {
        $pdo->rollBack();

        http_response_code(422);

        echo json_encode([
            'success' => false,
            'errors' => [
                'hour' => 'La hora seleccionada no está disponible'
            ]
        ]);

        exit;
    }

    /*
     * Sumamos únicamente reservas que todavía ocupan aforo.
     *
     * Las canceladas y completadas no cuentan.
     */
    $stmtAforo = $pdo->prepare("
        SELECT COALESCE(SUM(personas), 0) AS personas_reservadas
        FROM reservas
        WHERE fecha = :fecha
          AND hora = :hora
          AND estado IN ('pendiente', 'confirmada')
    ");

    $stmtAforo->execute([
        ':fecha' => $fecha,
        ':hora' => $horaSql
    ]);

    $resultado = $stmtAforo->fetch();

    $personasReservadas = (int) $resultado['personas_reservadas'];
    $capacidadMaxima = (int) $franja['capacidad_maxima'];

    $disponibles = $capacidadMaxima - $personasReservadas;

    /*
     * Comprobamos si caben las personas solicitadas.
     */
    if ($personas > $disponibles) {
        $pdo->rollBack();

        http_response_code(409);

        echo json_encode([
            'success' => false,
            'error' => 'No hay disponibilidad suficiente para esa fecha y hora',
            'disponibles' => max(0, $disponibles)
        ]);

        exit;
    }

    /*
     * Guardamos la reserva.
     */
    $stmtReserva = $pdo->prepare("
        INSERT INTO reservas (
            usuario_id,
            nombre,
            email,
            telefono,
            fecha,
            hora,
            personas,
            mensaje
        )
        VALUES (
            NULL,
            :nombre,
            :email,
            :telefono,
            :fecha,
            :hora,
            :personas,
            :mensaje
        )
    ");

    $stmtReserva->execute([
        ':nombre' => $nombre,
        ':email' => $email,
        ':telefono' => $telefono,
        ':fecha' => $fecha,
        ':hora' => $horaSql,
        ':personas' => $personas,
        ':mensaje' => $mensaje
    ]);

    $reservationId = $pdo->lastInsertId();

    $pdo->commit();

    http_response_code(201);

    echo json_encode([
        'success' => true,
        'message' => 'Reserva creada correctamente',
        'reservation_id' => $reservationId,
        'aforo' => [
            'capacidad' => $capacidadMaxima,
            'ocupadas' => $personasReservadas + $personas,
            'disponibles' => $capacidadMaxima
                - ($personasReservadas + $personas)
        ]
    ]);

} catch (PDOException $e) {

    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'error' => 'No se pudo crear la reserva'
    ]);
}