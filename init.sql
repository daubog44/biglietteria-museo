CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descrizione VARCHAR(255),
    sconto FLOAT DEFAULT 0.0
);

CREATE TABLE esposizione (
    codice INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(255),
    inizio DATE,
    fine DATE,
    tariffa FLOAT
);

CREATE TABLE biglietto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_doc VARCHAR(255) DEFAULT 'carta di identità',
    giorno_acquisto DATE,
    is_base TINYINT,
    esposizione INT,
    categoria INT,
    FOREIGN KEY (esposizione) REFERENCES esposizione(codice),
    FOREIGN KEY (categoria) REFERENCES categoria(id)
);

CREATE TABLE visita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(255),
    tariffa FLOAT DEFAULT 30.0,
    biglietto INT,
    FOREIGN KEY (biglietto) REFERENCES biglietto(id)
);


INSERT INTO categoria (descrizione, sconto)
VALUES
    ('adulto', 0.0),
    ('bambino', 50.0),
    ('donna incinta', 60.0);


INSERT INTO esposizione (titolo, tariffa, inizio, fine)
VALUES
    ('esposizione incredibile', 100.0, "2000-03-21", "2000-05-21"),
    ('barocca', 50.0, "2021-05-01", "2021-07-01"),
    ('esposizione info', 70.0, "2024-02-24", "2024-05-20");