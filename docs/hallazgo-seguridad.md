# Hallazgo de seguridad corregido

## Hallazgo detectado

Durante la revisión de seguridad del servidor Apache se comprobó que la aplicación no incluía una cabecera HTTP propia para impedir que el navegador interpretara el contenido con un tipo MIME diferente al declarado.

## Riesgo

La ausencia de esta protección puede permitir comportamientos no deseados relacionados con la interpretación automática del contenido por parte del navegador.

## Corrección aplicada

Se añadió en la configuración de Apache la siguiente cabecera:

```apache
Header always set X-Content-Type-Options "nosniff"
```

La configuración se encuentra en:

```text
apache-config/vhost.conf
```

## Verificación

La corrección se comprobó ejecutando:

```bash
curl -I http://localhost:8080
```

La respuesta del servidor incluye:

```text
X-Content-Type-Options: nosniff
```

Por tanto, el hallazgo quedó corregido y verificado correctamente.
