import { D1Database } from '@cloudflare/workers-types';

export interface Categorie {
  id: number;
  nom: string;
  created_at: string;
}

export interface Activite {
  id: number;
  nom: string;
  description: string;
  date_activite: string;
  heure_debut: string;
  heure_fin: string | null;
  lieu: string;
  max_participants: number;
  categorie_id: number;
  organisateur: string;
  created_at: string;
  categorie_nom?: string;
  participants_inscrits?: number;
}

export interface Inscription {
  id: number;
  activite_id: number;
  nom_participant: string;
  email_participant: string;
  created_at: string;
}

// Données statiques pour le déploiement permanent
const categoriesStatiques: Categorie[] = [
  { id: 1, nom: 'Football', created_at: new Date().toISOString() },
  { id: 2, nom: 'Course à pied', created_at: new Date().toISOString() },
  { id: 3, nom: 'Tennis', created_at: new Date().toISOString() },
  { id: 4, nom: 'Natation', created_at: new Date().toISOString() },
  { id: 5, nom: 'Yoga', created_at: new Date().toISOString() },
  { id: 6, nom: 'Cyclisme', created_at: new Date().toISOString() }
];

const activitesStatiques: Activite[] = [
  {
    id: 1,
    nom: 'Match de football',
    description: 'Match amical de football à 5 contre 5. Tous niveaux bienvenus !',
    date_activite: '2025-05-10',
    heure_debut: '18:00',
    heure_fin: '20:00',
    lieu: 'Stade municipal',
    max_participants: 10,
    categorie_id: 1,
    organisateur: 'Pierre Dupont',
    created_at: new Date().toISOString(),
    categorie_nom: 'Football',
    participants_inscrits: 3
  },
  {
    id: 2,
    nom: 'Sortie running',
    description: 'Course à pied en groupe dans le parc. Parcours de 5km à allure modérée.',
    date_activite: '2025-05-15',
    heure_debut: '12:30',
    heure_fin: '13:30',
    lieu: 'Parc des Buttes-Chaumont',
    max_participants: 15,
    categorie_id: 2,
    organisateur: 'Marie Lambert',
    created_at: new Date().toISOString(),
    categorie_nom: 'Course à pied',
    participants_inscrits: 7
  },
  {
    id: 3,
    nom: 'Tournoi de tennis',
    description: 'Petit tournoi de tennis en simple. Apportez votre raquette !',
    date_activite: '2025-05-20',
    heure_debut: '14:00',
    heure_fin: '18:00',
    lieu: 'Tennis Club',
    max_participants: 8,
    categorie_id: 3,
    organisateur: 'Thomas Martin',
    created_at: new Date().toISOString(),
    categorie_nom: 'Tennis',
    participants_inscrits: 4
  },
  {
    id: 4,
    nom: 'Séance de yoga',
    description: 'Séance de yoga pour débutants et intermédiaires. Apportez votre tapis.',
    date_activite: '2025-05-12',
    heure_debut: '17:30',
    heure_fin: '18:30',
    lieu: 'Salle de sport - Étage 2',
    max_participants: 12,
    categorie_id: 5,
    organisateur: 'Sophie Petit',
    created_at: new Date().toISOString(),
    categorie_nom: 'Yoga',
    participants_inscrits: 8
  },
  {
    id: 5,
    nom: 'Sortie vélo',
    description: 'Balade à vélo de 30km sur les bords de Seine. Casque obligatoire.',
    date_activite: '2025-05-25',
    heure_debut: '09:00',
    heure_fin: '12:00',
    lieu: 'Point de départ : Pont de Sèvres',
    max_participants: 10,
    categorie_id: 6,
    organisateur: 'Lucas Bernard',
    created_at: new Date().toISOString(),
    categorie_nom: 'Cyclisme',
    participants_inscrits: 5
  }
];

const inscriptionsStatiques: Inscription[] = [
  {
    id: 1,
    activite_id: 1,
    nom_participant: 'Jean Dupont',
    email_participant: 'jean.dupont@example.com',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    activite_id: 1,
    nom_participant: 'Marie Martin',
    email_participant: 'marie.martin@example.com',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    activite_id: 1,
    nom_participant: 'Paul Durand',
    email_participant: 'paul.durand@example.com',
    created_at: new Date().toISOString()
  }
];

// Fonctions pour simuler les opérations de base de données
export async function getCategories(db: D1Database | null): Promise<Categorie[]> {
  if (!db) {
    console.log('Base de données non disponible, utilisation des données statiques');
    return categoriesStatiques;
  }
  
  try {
    const { results } = await db.prepare('SELECT * FROM categories ORDER BY nom').all();
    return results as Categorie[];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return categoriesStatiques;
  }
}

export async function createCategorie(db: D1Database | null, nom: string): Promise<number> {
  if (!db) {
    console.log('Base de données non disponible, simulation de création');
    const newId = categoriesStatiques.length + 1;
    categoriesStatiques.push({
      id: newId,
      nom,
      created_at: new Date().toISOString()
    });
    return newId;
  }
  
  try {
    const result = await db.prepare('INSERT INTO categories (nom) VALUES (?)').bind(nom).run();
    return result.meta.last_row_id;
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    return 0;
  }
}

export async function getActivites(db: D1Database | null): Promise<Activite[]> {
  if (!db) {
    console.log('Base de données non disponible, utilisation des données statiques');
    return activitesStatiques;
  }
  
  try {
    const { results } = await db.prepare(`
      SELECT a.*, c.nom as categorie_nom, 
      (SELECT COUNT(*) FROM inscriptions WHERE activite_id = a.id) as participants_inscrits
      FROM activites a
      LEFT JOIN categories c ON a.categorie_id = c.id
      ORDER BY date_activite, heure_debut
    `).all();
    return results as Activite[];
  } catch (error) {
    console.error('Erreur lors de la récupération des activités:', error);
    return activitesStatiques;
  }
}

export async function getActiviteById(db: D1Database | null, id: number): Promise<Activite | null> {
  if (!db) {
    console.log('Base de données non disponible, utilisation des données statiques');
    const activite = activitesStatiques.find(a => a.id === id);
    return activite || null;
  }
  
  try {
    const { results } = await db.prepare(`
      SELECT a.*, c.nom as categorie_nom, 
      (SELECT COUNT(*) FROM inscriptions WHERE activite_id = a.id) as participants_inscrits
      FROM activites a
      LEFT JOIN categories c ON a.categorie_id = c.id
      WHERE a.id = ?
    `).bind(id).all();
    
    if (results.length === 0) {
      return null;
    }
    
    return results[0] as Activite;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'activité:', error);
    return null;
  }
}

export async function createActivite(db: D1Database | null, activite: Omit<Activite, 'id' | 'created_at'>): Promise<number> {
  if (!db) {
    console.log('Base de données non disponible, simulation de création');
    const newId = activitesStatiques.length + 1;
    const newActivite = {
      ...activite,
      id: newId,
      created_at: new Date().toISOString(),
      participants_inscrits: 0
    };
    activitesStatiques.push(newActivite);
    return newId;
  }
  
  try {
    const result = await db.prepare(`
      INSERT INTO activites (
        nom, description, date_activite, heure_debut, heure_fin, 
        lieu, max_participants, categorie_id, organisateur
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      activite.nom,
      activite.description,
      activite.date_activite,
      activite.heure_debut,
      activite.heure_fin,
      activite.lieu,
      activite.max_participants,
      activite.categorie_id,
      activite.organisateur
    ).run();
    
    return result.meta.last_row_id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'activité:', error);
    return 0;
  }
}

export async function createInscription(db: D1Database | null, inscription: Omit<Inscription, 'id' | 'created_at'>): Promise<number> {
  if (!db) {
    console.log('Base de données non disponible, simulation de création');
    const newId = inscriptionsStatiques.length + 1;
    inscriptionsStatiques.push({
      ...inscription,
      id: newId,
      created_at: new Date().toISOString()
    });
    
    // Mettre à jour le nombre de participants inscrits
    const activite = activitesStatiques.find(a => a.id === inscription.activite_id);
    if (activite && activite.participants_inscrits !== undefined) {
      activite.participants_inscrits += 1;
    }
    
    return newId;
  }
  
  try {
    const result = await db.prepare(`
      INSERT INTO inscriptions (activite_id, nom_participant, email_participant)
      VALUES (?, ?, ?)
    `).bind(
      inscription.activite_id,
      inscription.nom_participant,
      inscription.email_participant
    ).run();
    
    return result.meta.last_row_id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'inscription:', error);
    return 0;
  }
}

export async function getInscriptionsByActiviteId(db: D1Database | null, activiteId: number): Promise<Inscription[]> {
  if (!db) {
    console.log('Base de données non disponible, utilisation des données statiques');
    return inscriptionsStatiques.filter(i => i.activite_id === activiteId);
  }
  
  try {
    const { results } = await db.prepare(`
      SELECT * FROM inscriptions WHERE activite_id = ? ORDER BY created_at
    `).bind(activiteId).all();
    
    return results as Inscription[];
  } catch (error) {
    console.error('Erreur lors de la récupération des inscriptions:', error);
    return [];
  }
}

export async function getActivitesByCategorie(db: D1Database | null, categorieId: number): Promise<Activite[]> {
  if (!db) {
    console.log('Base de données non disponible, utilisation des données statiques');
    return activitesStatiques.filter(a => a.categorie_id === categorieId);
  }
  
  try {
    const { results } = await db.prepare(`
      SELECT a.*, c.nom as categorie_nom, 
      (SELECT COUNT(*) FROM inscriptions WHERE activite_id = a.id) as participants_inscrits
      FROM activites a
      LEFT JOIN categories c ON a.categorie_id = c.id
      WHERE a.categorie_id = ?
      ORDER BY date_activite, heure_debut
    `).bind(categorieId).all();
    
    return results as Activite[];
  } catch (error) {
    console.error('Erreur lors de la récupération des activités par catégorie:', error);
    return [];
  }
}
