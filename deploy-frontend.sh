#!/bin/bash

set -e

cd frontend/tajyrestaurante

echo "Compilando frontend..."
npm run build

echo "Limpiando build anterior..."
ssh daniela@ssh.cip-curso-ifcd0210.uk \
  "rm -rf /home/daniela/produccion/alumnos/daniela-sanchez/frontend/tajyrestaurante/build/*"

echo "Subiendo build nuevo..."
scp -r build/* \
  daniela@ssh.cip-curso-ifcd0210.uk:/home/daniela/produccion/alumnos/daniela-sanchez/frontend/tajyrestaurante/build/

echo "Frontend actualizado correctamente."