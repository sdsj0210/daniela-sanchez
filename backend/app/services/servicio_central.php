<?php

function obtenerCatalogo($url) {
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