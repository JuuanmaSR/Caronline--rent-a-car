# Caronline--rent-a-car
 Software para la gestion de  alquileres de autos online.
---
## Introduccion
CRUD / ABM implementado en Node.js para añadir, ver, actualizar y eliminar autos. Utiliza entre otros módulos:

- [multer](https://www.npmjs.com/package/multer) para opcionalmente insertar fotos de cada auto.
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) para gestionar base de datos de SQLite.
- [jest](https://www.npmjs.com/package/jest) para pruebas unitarias.
- [eslint](https://www.npmjs.com/package/eslint) y [prettier](https://www.npmjs.com/package/prettier) en conjunto para analizar potenciales errores y darle formato al código.

## Como instalar y ejecutar este proyecto
 - El proyecto se instala con `npm install`

 - Crear un archivo `.env` en la raíz del proyecto, guiandose por el archivo `.env.dist` en la misma ubicación.

 - Para iniciar el proyecto en modo desarrollo ejecutar `npm run dev`, este comando inicializa la aplicacion mediante Nodemon.

 - Ir a la dirección indicada en la consola, por defecto `http://localhost:8080/admin/home/rents`.
## Diagrama C4
<img src= "https://github.com/JuuanmaSR/Caronline--rent-a-car/blob/rents-module/public/images/Caronline-L1.png" title= "Diagrama-C4-level-1">
<img src= "https://github.com/JuuanmaSR/Caronline--rent-a-car/blob/rents-module/public/images/Caronline-L2.png" title= "Diagrama-C4-level-2">
<img src= "https://github.com/JuuanmaSR/Caronline--rent-a-car/blob/rents-module/public/images/Caronline-L3.png" title= "Diagrama-C4-level-3">

