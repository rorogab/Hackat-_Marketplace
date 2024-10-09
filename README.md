# Hackato_Marketplace

## API de Gestió d'Activitats

Aquest projecte és una API per gestionar usuaris i activitats. Permet el registre d'usuaris, la gestió d'activitats i la importació/exportació de dades d'activitats en format JSON.

## Taula de Continguts

- [Funcionalitats](#funcionalitats)
- [Tecnologies](#tecnologies)
- [Instal·lació](#instal·lació)
- [Creació de la Base de Dades](#creació-de-la-base-de-dades)
- [Creació Manual de la Base de Dades](#creació-manual-de-la-base-de-dades)
- [Ús de l'API amb Postman](#ús-de-lapi-amb-postman)
- [Endpoints de l'API](#endpoints-de-lapi)
  - [Endpoints d'Usuaris](#endpoints-dusuaris)
  - [Endpoints d'Activitats](#endpoints-dactivitats)

## Funcionalitats

- Registre i gestió d'usuaris
- Creació i gestió d'activitats
- Participació d'usuaris en activitats
- Importació d'activitats des de JSON
- Exportació d'activitats a JSON

## Tecnologies

- Node.js
- Express
- MySQL
- Postman per a proves

## Instal·lació

1. **Fork del repositori** a GitHub al teu compte.
2. **Clona el repositori forked** a la teva màquina local:

   ```bash
   git clone https://github.com/rorogab/Hackato_Marketplace.git
   cd Hackato_Marketplace
   ```

3. **Instal·la les dependències**
   ```bash
   npm install
   ```

## Creació de la base de dades

Per crear la base de dades i les taules, executa el fitxer SQL proporcionat `init_db.sql`.

1. Obre el teu client MySQL (com MySQL Workbench o línia de comandes).
2. Connecta't al teu servidor MySQL i crea una nova base de dades:

   ```bash
   CREATE DATABASE app_activitats;
   ```

3. Utilitza la nova base de dades:

   ```bash
   USE app_activitats;
   ```

4. Executa les ordres SQL de `init_db.sql` per configurar les taules requerides:
   ```bash
   SOURCE camí/a/init_db.sql;
   ```

## Creació Manual de la Base de Dades

Si l'execució automàtica no funciona, segueix aquests passos per crear la base de dades manualment.

1. Obre el teu client MySQL.
2. Crea la base de dades:

   ```bash
   CREATE DATABASE app_activitats;
   ```

3. Crea les taules `usuaris` i `activitats` amb les següents ordres SQL:

   ```bash
   CREATE TABLE usuaris (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nom VARCHAR(100) NOT NULL,
   correu VARCHAR(100) NOT NULL,
   contrasenya VARCHAR(100) NOT NULL,
   edat INT NOT NULL
   );

   CREATE TABLE activitats (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nom VARCHAR(100) NOT NULL,
   descripcio TEXT,
   capacitat_maxima INT NOT NULL
   );

   CREATE TABLE usuaris_activitats (
   usuari_id INT,
   activitat_id INT,
   FOREIGN KEY (usuari_id) REFERENCES usuaris(id),
   FOREIGN KEY (activitat_id) REFERENCES activitats(id)
   );
   ```

## Ús de l'API amb Postman

1. Obre Postman.
2. Crea una nova sol·licitud i selecciona el tipus de sol·licitud (GET, POST, etc.).
3. Introdueix l'URL del teu servidor local, per exemple:

   ```bash
   http://localhost:5000
   ```

4. Per a sol·licituds que requereixen un cos (com POST o PUT), selecciona la pestanya `Body` a Postman i tria `JSON`.

## Endpoints de l'API

### Endpoints d'Usuaris

- **Registrar un nou usuari**  
  `POST /usuaris`  
  Cos de la sol·licitud:

  ```bash
  {
  "nom": "Nom d'Usuari",
  "correu": "usuari@example.com",
  "contrasenya": "password123",
  "edat": 30
  }
  ```

- **Consultar un usuari per ID**  
  `GET /usuaris/:id` Sustitueix `:id` per l'id de l'usuari.

- **Actualitzar un usuari per ID**  
  `PUT /usuaris/:id`  
  Cos de la sol·licitud:

  ```bash
  {
  "nom": "Nou Nom",
  "correu": "noucorreu@example.com",
  "contrasenya": "novaContrasenya",
  "edat": 31
  }
  ```

- **Eliminar un usuari per ID**  
  `DELETE /usuaris/:id` Sustitueix `:id` per l'id de l'usuari.

### Endpoints d'Activitats

- **Crear una nova activitat**  
  `POST /activitats`  
  Cos de la sol·licitud:

  ```bash
  {
  "nom": "Nom de l'Activitat",
  "descripcio": "Descripció de l'activitat",
  "capacitat_maxima": 20
  }
  ```

- **Consultar totes les activitats**  
  `GET /activitats`

- **Apuntar un usuari a una activitat**  
  `POST /activitats/:id/join`  
  Cos de la sol·licitud:

  ```bash
  {
  "usuariId": 1
  }
  ```

- **Importar activitats des d'un arxiu JSON**  
  `POST /activitats/import`

- **Exportar activitats a un arxiu JSON**  
  `GET /activitats/export`
