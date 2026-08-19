# Plan de pruebas funcionales

## CP-01 — Carga de la aplicación principal

**Prioridad:** Alta

### Pasos

1. Levantar los contenedores del proyecto:

   ```bash
   docker compose up -d
   ```

2. Comprobar que los contenedores están funcionando:

   ```bash
   docker compose ps
   ```

3. Acceder a la aplicación desde la red local mediante:

   `http://localhost:8080`

4. Acceder a la aplicación mediante el subdominio configurado a través del túnel de Cloudflare.

5. Comprobar que en ambos accesos se muestra correctamente la página principal del restaurante y que no aparecen errores visibles.

### Resultado esperado

Los contenedores necesarios deben encontrarse en estado `Up`. La aplicación debe cargar correctamente tanto desde `http://localhost:8080` como desde el subdominio configurado, mostrando la página principal del restaurante sin errores.

### Resultado obtenido

Los contenedores `web`, `db` y `phpmyadmin` se encuentran en estado `Up`. La aplicación carga correctamente desde `http://localhost:8080` y también desde el subdominio configurado mediante Cloudflare. En ambos casos se muestra correctamente la página principal del restaurante sin errores visibles.

### Estado

**OK**

## CP-02 — Conexión con la base de datos MySQL

**Prioridad:** Alta

### Pasos

1. Comprobar que el contenedor MySQL está en funcionamiento mediante:

   ```bash
   docker compose ps
   ```

2. Acceder a la base de datos `daniela_proyecto` mediante MySQL Workbench.

3. Acceder al endpoint:

   `http://localhost:8080/api/productos.php`

4. Comprobar que PHP devuelve en formato JSON los productos almacenados en MySQL.

5. Acceder a la página:

   `http://localhost:8080/menu`

6. Comprobar que React muestra los productos obtenidos desde el endpoint PHP.

7. Modificar temporalmente en MySQL el precio del producto `Mandioca frita` de `4.00` a `4.25`, utilizando su clave primaria.

8. Recargar la página del menú.

9. Comprobar que el nuevo precio aparece en la aplicación sin modificar el código ni volver a compilar React.

10. Restaurar el precio original de `4.00`.

### Resultado esperado

PHP debe conectarse correctamente a la base de datos `daniela_proyecto` mediante PDO y devolver los productos almacenados en MySQL. React debe consumir estos datos mediante el endpoint `/api/productos.php`.

Cualquier modificación realizada directamente en la base de datos debe reflejarse en la página del menú al recargarla.

### Resultado obtenido

La conexión PHP–MySQL funcionó correctamente y el endpoint `/api/productos.php` devolvió los productos almacenados en la base de datos en formato JSON.

La página de menú de React consumió correctamente el endpoint PHP. Al modificar temporalmente el precio de `Mandioca frita` de `4.00` a `4.25` en MySQL, el nuevo precio apareció en la página del menú al recargarla, sin modificar el código ni volver a compilar la aplicación.

Posteriormente se restauró el precio original.

### Estado

**OK**

## CP-03 — Consumo del servicio distribuido

**Prioridad:** Alta

### Pasos

1. Acceder al servicio distribuido XML de Tajy mediante:

   `http://localhost:8080/api/catalogo_tajy.xml`

2. Comprobar que el documento XML contiene productos reales del restaurante.

3. Contar el número de elementos `<item>` devueltos por el servicio mediante:

   ```bash
   curl -s http://localhost:8080/api/catalogo_tajy.xml | grep -o "<item>" | wc -l
   ```

4. Ejecutar desde el contenedor PHP la función `obtenerCatalogo()` definida en `servicio_central.php`:

   ```bash
   docker exec -it daniela_container php -r '
   require "/var/www/app/servicio_central.php";
   $config = require "/var/www/config/config.php";
   $catalogo = obtenerCatalogo($config["servicio_central_url"]);
   print_r($catalogo);
   '
   ```

5. Comparar el número de productos del XML con el número de productos obtenidos por PHP.

6. Comprobar que los datos recibidos coinciden en nombre, precio, categoría, condición vegana y nivel de picante.

### Resultado esperado

El servicio distribuido debe devolver un XML válido con productos de Tajy.

La función `obtenerCatalogo()` debe poder consumir dicho XML y transformar cada elemento `<item>` en datos utilizables por PHP.

El número de productos obtenidos por PHP debe coincidir con el número de elementos `<item>` presentes en el XML.

### Resultado obtenido

El servicio XML devolvió correctamente 5 elementos `<item>` correspondientes a productos de Tajy.

El comando de comprobación devolvió:

```text
5
```

La función `obtenerCatalogo()` consumió correctamente el servicio distribuido y devolvió también 5 productos:

- Mandioca frita
- Yuca con mojo cubano
- Ropa Vieja
- Vori Vori
- Flan de la Abuela

Los datos obtenidos por PHP coincidieron con los contenidos en el XML, incluyendo nombre, precio, categoría, condición vegana y nivel de picante.

### Estado

**OK**

## CP-04 — Control de acceso por rol

**Prioridad:** Alta

### Pasos

1. Crear dos usuarios de prueba en la tabla `usuarios`:
   - Un usuario con rol `cliente`.
   - Un usuario con rol `admin`.

2. Almacenar las contraseñas utilizando `password_hash()`.

3. Iniciar sesión con el usuario de rol `cliente` mediante:

   ```bash
   curl -i \
   -c cookies.txt \
   -H "Content-Type: application/json" \
   -d '{"email":"cliente@tajy.test","password":"cliente123"}' \
   http://localhost:8080/api/login.php
   ```

4. Utilizar la sesión creada para intentar acceder al endpoint protegido:

   ```bash
   curl -i \
   -b cookies.txt \
   http://localhost:8080/api/admin.php
   ```

5. Eliminar la cookie de sesión anterior:

   ```bash
   rm cookies.txt
   ```

6. Iniciar sesión con el usuario de rol `admin`:

   ```bash
   curl -i \
   -c cookies.txt \
   -H "Content-Type: application/json" \
   -d '{"email":"admin@tajy.test","password":"admin123"}' \
   http://localhost:8080/api/login.php
   ```

7. Utilizar la sesión del administrador para acceder al mismo endpoint protegido:

   ```bash
   curl -i \
   -b cookies.txt \
   http://localhost:8080/api/admin.php
   ```

### Resultado esperado

Ambos usuarios deben poder iniciar sesión si sus credenciales son correctas.

El usuario con rol `cliente` no debe poder acceder al recurso reservado para administradores y debe recibir una respuesta HTTP `403 Forbidden`.

El usuario con rol `admin` debe poder acceder correctamente al recurso protegido y recibir una respuesta HTTP `200 OK`.

### Resultado obtenido

El usuario `cliente@tajy.test` inició sesión correctamente y recibió una sesión PHP válida.

Al intentar acceder a `/api/admin.php`, el servidor respondió:

```text
HTTP/1.1 403 Forbidden
```

con la respuesta:

```json
{ "error": "Acceso denegado" }
```

Posteriormente se inició sesión con `admin@tajy.test`.

Al acceder al mismo endpoint protegido, el servidor respondió:

```text
HTTP/1.1 200 OK
```

con la respuesta:

```json
{
  "message": "Acceso permitido",
  "usuario": {
    "id": 2,
    "nombre": "Admin Prueba",
    "email": "admin@tajy.test",
    "rol": "admin"
  }
}
```

Esto confirma que el sistema diferencia correctamente los roles y restringe el acceso administrativo a los usuarios autorizados.

### Estado

**OK**

## CP-05 — Comportamiento ante datos incorrectos o vacíos

**Prioridad:** Media

### Pasos

1. Enviar una solicitud de inicio de sesión con un usuario válido pero una contraseña incorrecta:

   ```bash
   curl -i \
   -H "Content-Type: application/json" \
   -d '{"email":"cliente@tajy.test","password":"incorrecta"}' \
   http://localhost:8080/api/login.php
   ```

2. Comprobar el código HTTP recibido.

3. Consultar la respuesta del servidor:

   ```bash
   curl -s \
   -H "Content-Type: application/json" \
   -d '{"email":"cliente@tajy.test","password":"incorrecta"}' \
   http://localhost:8080/api/login.php
   ```

4. Enviar una segunda solicitud dejando vacíos los campos `email` y `password`:

   ```bash
   curl -i \
   -H "Content-Type: application/json" \
   -d '{"email":"","password":""}' \
   http://localhost:8080/api/login.php
   ```

5. Comprobar que la aplicación responde de forma controlada y no muestra errores internos de PHP.

### Resultado esperado

Cuando las credenciales sean incorrectas, la API debe rechazar el inicio de sesión mediante un código HTTP `401 Unauthorized` y devolver un mensaje de error controlado.

Cuando los campos obligatorios estén vacíos, la API debe responder con un código HTTP `400 Bad Request`.

En ninguno de los dos casos deben aparecer errores fatales, warnings de PHP ni información interna del servidor.

### Resultado obtenido

Al utilizar una contraseña incorrecta, el servidor respondió:

```text
HTTP/1.1 401 Unauthorized
```

y devolvió:

```json
{ "error": "Credenciales incorrectas" }
```

Al enviar el email y la contraseña vacíos, el servidor respondió:

```text
HTTP/1.1 400 Bad Request
```

y devolvió:

```json
{ "error": "Email y contraseña son obligatorios" }
```

En ambos casos la aplicación gestionó el error de forma controlada, sin mostrar errores internos de PHP.

### Estado

**OK**
