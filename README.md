# Descripción

E commerce Tipo Tesla en Next.js



## Correr en dev

    # Fast Instructions:

        1. Clonar el repositorio.
        2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
        3. Instalar dependencias ```npm install```
        4.Levantar la base de datos ```docker compose up -d```
        5.Correr las migraciones de Primsa ```npx prisma migrate dev```
        6. Ejecutar seed ```npm run seed``` (no tiene ordenes creadas)
        7. Correr el proyecto ```npm run dev```.
        8. Limpiar el localStorage del navegador.

# detail intructions:

1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos (desde el inicio)
    - crear y configurar archivo  docker-compose.yml
    - crear y configurar .env para las variables de entorno
    - abrir Docker app y actualizarlo de ser necesario
    -  en la consola correr```docker compose up -d```
           esto crea la carpeta de postgress (donde se alojara la data)
    - colocar en .gitignore .env y /postgres/
5. abrir Tableplus(Tp)  y actualizar de ser necesario
    - crear nueva tabla  en + y cargar los datos de la variable de enetorno, host 127.0.0.1 port 5432 ...
6. configurar Prisma https://www.prisma.io/
    - npx prisma
    - npx prisma init: 
        - crear y cargar manualmente  el archivo ```schema.prisma``` que contiene el esquema prisma con tus modelos de esquema y variables para la conexion de la base de datos
        - agrega en .env DATABASE_URL el cual debe ser cargado con los valores de las variables de alli
    -  En schema.prisma se carga los enumeraciones para Gender y Size (objetos con valores constantes  en Postgres) y modelos (tablas a relacionar en postgres) segun como esta en el seed (semilla), las enumeraciones se realizan para los Sizes y Gender mientras que para las imagenes se hace otro modelo aparte, primerose hacen 2 modelos uno para categorias (Category) y otro para el producto (Product) para crear relaciones entre ellas
    - ``` importante ``` se ejecuta ```npx prisma migrate dev --name init``` para impactar la BD que se puede visualizar en Table plus.
    - cada vez que haga una modificacion (agregar o quitar model)del schema.prisma   debo ejecutar ```npx prisma migrate dev --name init `
    - se carga otro modelo ProductImage que se relaciona con el Modelo  Product y luego se ejecuta nuevamente ```npx prisma migrate dev --n ```m de ser necesario recargar la app, cancelar la consola y volver a correr ``` npm run dev ```
7. Correr las migraciones  de Primsa ```npx prisma migrate dev```
8. Procedimiento seed - semilla(cargar data desde el seed.js la 
   base de datos):
    - en ./seed crear un archivo seed-database.ts
    - correr npm i -D ts-node (para poder correr un archivo ts en Node).
    - en package.json generar un script ``` "seed":"ts-node src/seed/seed-database.ts" ```
    - para solventar el error al correr npm run seed (not module foud):
        - en la terminal aplicar cd src/seed/
        - ejecutar npx tsc --init (esto genera alli  el archivo tsconfig.json)

        - 
    - ejecutar ```npm run seed```
9. limpiar el local storage
10. En caso de querer Borrar contenido de tablas prexistentes
   (se tiene una base de datos de teting con data basura):
    - ```npx prisma generate```
    - en src crear una carpeta lib con  prisma.ts: src/lib/prisma.ts
    - cargar alli:
         import { PrismaClient } from '@prisma/client'
         const prisma = new PrismaClient()
         ``` mas todo el codigo de prisma```
         que incluye modo Singeton en caso de estar en produccion
    - volver a seed-database.ts e iniciar este procedimiento:
        1. borrar las tablas con  await prisma.productImage.deleteMany()...
        2. insertar categorias que vienen del seed.ts con:  await prisma.productany()...
        3. crear relacion productos -  categorias con el Type
        4. insertar productos (sin el type ni las images)
        5. insertar ProductImages con la relacion productId igual para cada producto que tenga diferentes images



11. Correr el proyecto ```npm run dev```


# configurar PayPal

1. ingresar al https://developer.paypal.com/dashboard y configurar en sandbox las variables de entorno publicas y privadas.
2. configurar el merchant y el buyer.
3. instalar ``` npm install @paypal/react-paypal-js```
4. configurar el Provider en providers.
5. configurar los botones.
    - Scheleton
    - trasaction Id

6. probar en Postman usando el transactiion ID
    # POST
        PAYPAL_OAUTH_URL=https://api-m.sandbox.paypal.com/v1/oauth2/token

    - agregar en auth => basic auth, el userName: clientId publica. password: key privada
    - "error": "unsupported_grant_type" => agregar en el body, ulrendode  grant_type, Key:grant_type,                  
        value:client_credentials


    usa el     "access_token"   aca: 
    # GET
        PAYPAL_ORDERS_URL=https://api.sandbox.paypal.com/v2/checkout/orders/"transactionId"
        bearer token : el valor del access token anterior
    - esto arrroja el resultdo entre otras el status y el amount








## Correr en prod
-