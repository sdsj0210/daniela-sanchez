<?php

function validarXml($url, $xsdPath) {
    libxml_use_internal_errors(true);

    $doc = new DOMDocument();

    if (!$doc->load($url)) {
        foreach (libxml_get_errors() as $error) {
            error_log('Error cargando XML: ' . $error->message);
        }

        libxml_clear_errors();
        return false;
    }

    $valido = $doc->schemaValidate($xsdPath);

    if (!$valido) {
        foreach (libxml_get_errors() as $error) {
            error_log('XML inválido: ' . $error->message);
        }
    }

    libxml_clear_errors();

    return $valido;
}

function obtenerCatalogo($url) {
    $xsdPath = __DIR__ . '/../data/catalogo_tajy.xsd';

    if (!validarXml($url, $xsdPath)) {
        return [];
    }

    $xml = simplexml_load_file($url);

    if ($xml === false) {
        return [];
    }

    $items = [];

    foreach ($xml->item as $item) {
        $items[] = [
            'nombre' => (string) $item->nombre,
            'precio' => (string) $item->precio,
            'categoria' => (string) $item->categoria,
            'vegano' => (string) $item->vegano,
            'picante' => (int) $item->picante,
        ];
    }

    return $items;
}
?>