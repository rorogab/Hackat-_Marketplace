-- Crea la base de dades si no existeix
CREATE DATABASE IF NOT EXISTS app_activitats;
USE app_activitats;

-- Creació de la taula dels usuaris
CREATE TABLE IF NOT EXISTS usuaris (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    correu VARCHAR(100) NOT NULL UNIQUE,
    contrasenya VARCHAR(255) NOT NULL,
    edat INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creació de la taula de les activitats
CREATE TABLE IF NOT EXISTS activitats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    descripcio TEXT,
    capacitat_maxima INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crea un taula conjunta de many to many
-- En aquesta taula es mostrará quins usuaris s'han apuntat a quina activitat
CREATE TABLE IF NOT EXISTS usuaris_activitats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuari_id INT,
    activitat_id INT,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuari_id) REFERENCES usuaris(id) ON DELETE CASCADE,
    FOREIGN KEY (activitat_id) REFERENCES activitats(id) ON DELETE CASCADE
);
