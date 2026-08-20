<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../services/servicio_central.php';

$xmlPath = __DIR__ . '/../data/catalogo_tajy.xml';

$catalogo = obtenerCatalogo($xmlPath);

if (empty($catalogo)) {
    http_response_code(422);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'El catálogo no está disponible porque el XML no cumple el esquema XSD.'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

    exit;
}

echo json_encode([
    'ok' => true,
    'catalogo' => $catalogo
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);