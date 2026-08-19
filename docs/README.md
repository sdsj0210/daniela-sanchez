# Proyecto IFCD0210 - Publicación web con Docker y Cloudflare Tunnel

## Descripción del proyecto

Este proyecto corresponde a la práctica del módulo IFCD0210.

El objetivo es desarrollar y publicar una aplicación web utilizando Docker, Apache y PHP, trabajando progresivamente con servicios web, dominios, Cloudflare Tunnel, XML, bases de datos y medidas básicas de seguridad.

Durante las diferentes jornadas se ha preparado el entorno de trabajo, creado y configurado la aplicación, publicado mediante un túnel de Cloudflare, conectado con un servicio distribuido y añadido una base de datos con control de usuarios y permisos.

## Subdominio utilizado

Subdominio público del proyecto:

`https://daniela.cip-curso-ifcd0210.uk`

## Entorno utilizado

* Sistema operativo: Windows 11
* WSL2 con Ubuntu
* Docker Desktop
* Docker Compose
* Apache
* PHP
* MySQL
* phpMyAdmin
* Cloudflare Tunnel

---

# Trabajo realizado por días

## Día 1 — Instalación del entorno

Durante el primer día se preparó el entorno necesario para realizar el proyecto.

Se instaló y configuró WSL2 con Ubuntu para disponer de un entorno Linux desde Windows. Posteriormente se instaló Docker Desktop y se habilitó su integración con Ubuntu mediante WSL.

Una vez instalado Docker, se comprobó que funcionaba correctamente mediante los comandos de versión de Docker y Docker Compose, además de ejecutar `docker run hello-world`.

También se creó la estructura inicial del proyecto dentro de Ubuntu, incluyendo la carpeta `src/`, donde se almacenarían los archivos de la aplicación.

Finalmente se creó el archivo `docker-compose.yml`, se levantó el contenedor y se comprobó su funcionamiento mediante `docker compose ps`.

La aplicación se verificó desde el navegador utilizando:

`http://localhost:8080`

### Incidencias

Después de instalar Docker Desktop, Ubuntu no aparecía inicialmente disponible para Docker. Se solucionó activando la integración con WSL desde la configuración de Docker Desktop.

También fue necesario iniciar el contenedor antes de poder acceder correctamente a la aplicación desde el navegador.

---

## Día 2 — HTTP, DNS y ámbitos de acceso

Durante esta jornada se trabajó con el funcionamiento de las peticiones HTTP y la resolución de nombres mediante DNS.

Se realizaron peticiones utilizando `curl` tanto contra un sitio externo como contra el propio contenedor del proyecto en `localhost:8080`. Esto permitió comprobar las cabeceras y el código de respuesta del servidor.

También se utilizaron las herramientas de desarrollador del navegador para observar las peticiones realizadas por la aplicación y consultar sus cabeceras HTTP.

Para comprender el funcionamiento del DNS se utilizaron las herramientas `nslookup` y `dig`, comprobando cómo un dominio se relaciona con una dirección IP.

Por último, se clasificaron las diferentes partes de un proyecto de restaurante según los ámbitos de **Internet, Intranet y Extranet**:

* Internet: página pública, menú, información, reservas y pedidos.
* Intranet: herramientas internas para empleados.
* Extranet: acceso controlado para clientes, proveedores y servicios externos.

### Incidencias

Fue necesario instalar las herramientas `nslookup` y `dig`, ya que no estaban disponibles inicialmente en Ubuntu.

---

## Día 3 — Túnel Cloudflare

Durante este día se configuró la publicación de la aplicación mediante un túnel de Cloudflare.

Se instaló `cloudflared` en Ubuntu WSL y se comprobó que la instalación funcionaba correctamente.

Posteriormente se configuró el túnel utilizando el archivo de credenciales proporcionado y se creó el archivo `config.yml`, donde se indicó el subdominio utilizado y el servicio local al que debía dirigirse:

`http://localhost:8080`

Una vez configurado el túnel, se comprobó que la aplicación podía ser accesible desde Internet mediante el subdominio público.

También se realizó una prueba desde un dispositivo móvil utilizando datos móviles, comprobando que el acceso funcionaba fuera de la red local.

### Incidencias

Inicialmente `cloudflared` no estaba instalado y el comando devolvía `command not found`.

También fue necesario corregir la ruta del archivo de credenciales indicada en `config.yml`.

Una vez corregida la configuración, el túnel funcionó correctamente.

---

## Día 4 — Virtual Host de Apache

Durante esta jornada se configuró un **Virtual Host** para Apache.

Se creó el archivo:

`apache-config/vhost.conf`

En él se configuró el dominio del proyecto y el directorio desde el que Apache debía servir la aplicación.

Después se comprobó el funcionamiento del host virtual desde el entorno local y se verificó que la misma aplicación podía visualizarse mediante el dominio público a través del túnel de Cloudflare.

También se creó el archivo `README.md` para comenzar a documentar el proyecto y los pasos realizados hasta ese momento.

### Resultado

La aplicación quedó funcionando tanto en local como mediante el dominio público:

`http://localhost:8080`

`https://daniela.cip-curso-ifcd0210.uk`

---

## Día 5 — Cierre de la primera unidad

Durante esta jornada se revisaron y recopilaron las evidencias correspondientes al trabajo realizado durante los días anteriores.

Se comprobó nuevamente la estructura del proyecto, incluyendo `docker-compose.yml` y la carpeta `src/`.

También se revisó la clasificación de Internet, Intranet y Extranet y la configuración del túnel de Cloudflare.

Se comprobó la existencia de los archivos de configuración del túnel dentro de `~/.cloudflared` y se revisó el contenido de `config.yml`.

Finalmente se actualizó el `README.md` con la descripción del proyecto y los pasos realizados hasta ese momento.

### Incidencias

El túnel ya había sido creado anteriormente, por lo que no se volvió a ejecutar el comando de creación para evitar generar un túnel diferente. Como evidencia se utilizaron los archivos de credenciales y configuración del túnel ya existente.

---

# Actividad EXTRA 1.5 — Página de error 404 personalizada

Como actividad complementaria se creó una página de error 404 personalizada para el proyecto.

Se creó una página HTML dentro de la carpeta pública de la aplicación para mostrar un mensaje propio cuando se solicitara una dirección que no existiera.

También se modificó la configuración del Virtual Host de Apache utilizando la directiva `ErrorDocument 404`, indicando qué página debía mostrar Apache cuando se produjera este error.

Finalmente se realizó una prueba accediendo a una dirección inexistente y se comprobó que Apache mostraba la página personalizada en lugar de la página de error predeterminada.

### Incidencias

Durante las primeras pruebas los cambios de la página no se mostraban correctamente debido a la caché del navegador. Se solucionó borrando la caché y volviendo a cargar la página.

---

## Día 6 — Servicio distribuido

Durante esta jornada se comenzó a trabajar con el servicio distribuido proporcionado para la práctica.

Se realizó una consulta al servicio central utilizando `curl` y se comprobó que la respuesta se recibía correctamente en formato XML.

Después se reorganizó la estructura del proyecto para separar mejor sus diferentes partes.

Se crearon las carpetas:

`src/public`

`src/app`

`src/config`

Esta organización permite separar los archivos públicos de la aplicación, la lógica interna y los archivos de configuración.

También se creó:

`src/config/config.php`

para almacenar la URL del servicio central.

Finalmente se comprobó que la aplicación continuaba funcionando correctamente después de realizar la reorganización.

---

## Día 7 — Integración de la base de datos

Durante esta jornada se incorporó una base de datos al proyecto.

Se añadieron los servicios de **MySQL** y **phpMyAdmin** al archivo `docker-compose.yml`, junto con el servicio web que ya existía.

Después se comprobó mediante `docker compose ps` que los tres servicios estaban funcionando correctamente.

Desde phpMyAdmin se accedió a la base de datos del proyecto y se creó la tabla:

`items`

También se añadieron varios datos de prueba.

Para conectar PHP con la base de datos se configuraron las credenciales en `config.php` y se creó `db.php`, utilizando una conexión mediante PDO.

Finalmente se modificó la aplicación para leer los datos de la tabla y mostrarlos en la página web.

### Incidencias

Inicialmente PHP no disponía del controlador necesario para utilizar `pdo_mysql`. Para solucionarlo fue necesario crear un `Dockerfile` que permitiera instalar el controlador y reconstruir el entorno de la aplicación.

Después de realizar el cambio, la conexión con MySQL funcionó correctamente y los datos pudieron mostrarse en la página.

---

## Día 8 — Usuarios y permisos

Durante esta jornada se trabajó en la seguridad básica de la aplicación mediante permisos de archivos, privilegios de base de datos y control de acceso por roles.

Se revisaron los permisos del archivo de configuración `config.php` y se restringió su acceso para evitar que otros usuarios pudieran modificar o consultar información de configuración.

El archivo quedó con permisos:

`640`

También se revisaron los privilegios del usuario de base de datos:

`app_user`

siguiendo el principio de mínimo privilegio. El usuario dispone únicamente de los permisos necesarios para trabajar con los datos de la aplicación.

Por último, se añadió un control de acceso basado en roles. Se realizaron pruebas simulando diferentes usuarios y se comprobó que las opciones disponibles en la aplicación cambiaban dependiendo del rol asignado.

### Incidencias

Durante la configuración de los privilegios de la base de datos también fue necesario revisar y adaptar las sentencias SQL al nombre de la base de datos y al usuario utilizados en el proyecto.

---

# Comandos principales utilizados

Iniciar los servicios:

`docker compose up -d`

Comprobar los contenedores:

`docker compose ps`

Detener los servicios:

`docker compose down`

Comprobar Docker:

`docker --version`

Comprobar Docker Compose:

`docker compose version`

Ejecutar el túnel de Cloudflare:

`cloudflared tunnel run`

Comprobar Cloudflared:

`cloudflared --version`

---

# Estado actual del proyecto

Actualmente el proyecto dispone de una aplicación web ejecutándose mediante Docker y Apache, publicada mediante Cloudflare Tunnel y conectada a una base de datos MySQL.

La aplicación permite:

* Ejecutarse en el entorno local.
* Publicarse mediante un subdominio propio.
* Utilizar Apache y PHP.
* Consumir información de un servicio central mediante XML.
* Conectarse a una base de datos MySQL.
* Mostrar datos almacenados en la base de datos.
* Utilizar usuarios con diferentes privilegios.
* Aplicar un control básico de acceso mediante roles.
* Mostrar una página 404 personalizada.

### Acceso local

`http://localhost:8080`

### Acceso público

`https://daniela.cip-curso-ifcd0210.uk`
