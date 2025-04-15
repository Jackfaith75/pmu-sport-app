-- Création des tables pour l'application d'activités sportives PMU

-- Table des catégories d'activités
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des activités
CREATE TABLE IF NOT EXISTS activites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  description TEXT,
  date_activite DATE NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME,
  lieu TEXT NOT NULL,
  max_participants INTEGER NOT NULL,
  categorie_id INTEGER,
  organisateur TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

-- Table des inscriptions
CREATE TABLE IF NOT EXISTS inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  activite_id INTEGER NOT NULL,
  nom_participant TEXT NOT NULL,
  email_participant TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activite_id) REFERENCES activites(id)
);

-- Insertion de quelques catégories par défaut
INSERT INTO categories (nom) VALUES 
  ('Course à pied'),
  ('Football'),
  ('Yoga'),
  ('Cyclisme'),
  ('Natation'),
  ('Randonnée');
