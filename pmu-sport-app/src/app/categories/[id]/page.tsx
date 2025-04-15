import { getActivitesByCategorie } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';
import Link from 'next/link';

// Fonction generateStaticParams pour permettre l'export statique
export async function generateStaticParams() {
  // Retourner les IDs des catégories statiques
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

export default async function CategorieDetail({ params }: { params: { id: string } }) {
  const { env } = getCloudflareContext();
  const categorieId = parseInt(params.id);
  const activites = await getActivitesByCategorie(env.DB, categorieId);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pmu-green mb-6">
        Activités de la catégorie
      </h1>
      
      {activites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activites.map((activite) => (
            <div key={activite.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <span className="inline-block bg-pmu-green bg-opacity-10 text-pmu-green text-xs px-2 py-1 rounded-full">
                  {activite.categorie_nom}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-pmu-green">{activite.nom}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Date:</span> {new Date(activite.date_activite).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Heure:</span> {activite.heure_debut}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Lieu:</span> {activite.lieu}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Organisateur:</span> {activite.organisateur}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {activite.participants_inscrits} / {activite.max_participants} participants
                  </span>
                  <Link 
                    href={`/activites/${activite.id}`}
                    className="text-pmu-red hover:text-pmu-red-dark text-sm font-medium"
                  >
                    Voir détails →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-lg p-6 text-center">
          <p className="text-gray-600">Aucune activité dans cette catégorie pour le moment.</p>
          <Link 
            href="/proposer" 
            className="mt-4 inline-block text-pmu-red hover:text-pmu-red-dark font-medium"
          >
            Proposer une nouvelle activité
          </Link>
        </div>
      )}
      
      <div className="mt-6">
        <Link 
          href="/" 
          className="text-pmu-green hover:text-pmu-green-dark font-medium"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
