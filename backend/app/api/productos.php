<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

require __DIR__ . '/../db.php';

try {
    $sql = "
        SELECT
            p.id,
            p.nombre,
            p.precio,
            p.vegano,
            p.picante,
            c.id AS categoria_id,
            c.nombre AS categoria,
            c.imagen
        FROM productos p
        INNER JOIN categorias c
            ON c.id = p.categoria_id
        WHERE p.activo = 1
          AND c.activo = 1
        ORDER BY c.id, p.id
    ";

    $stmt = $pdo->query($sql);

    $productos = $stmt->fetchAll();

    echo json_encode(
        $productos,
        JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        'error' => 'No se pudieron cargar los productos'
    ]);
}