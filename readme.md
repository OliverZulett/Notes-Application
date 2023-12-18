# Notes App

una aplicacion creada con Laravel y Vuejs

## requisitos

- docker
- nodejs

## Ejecutar proyecto

1. Ejecutar proyecto laravel API:

``` bash
cd notes-api/
```

``` bash
docker run --rm -v $(pwd):/app composer install
```
2. Start project
``` bash
./vendor/bin/sail up 
```
3. migrate database
``` bash
./vendor/bin/sail artisan migrate
```
4. seed database
``` bash
./vendor/bin/sail artisan db:seed 
```

2. Ejecutar Vuejs webapp

``` bash
cd notes-web-app/
```
``` bash
npm i
```
``` bash
npm run dev
```
La aplicacion se ejecuta en http://127.0.0.1:5174/

Crear un nuevo usuario para usar la aplicacion
