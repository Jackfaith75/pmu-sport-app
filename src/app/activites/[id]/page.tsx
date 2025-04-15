import { getActiviteById, getInscriptionsByActiviteId, createInscription } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';
import Link from 'next/link';

// Fonction generateStaticParams pour permettre l'export statique
export async function generateStaticParams() {
  // Retourner les IDs des activités statiques
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default async function ActiviteDetail({ params }: { params: { id: string } }) {
  const { env } = getCloudflareContext();
  const activiteId = parseInt(params.id);
  const activite = await getActiviteById(env.DB, activiteId);
  const inscriptions = await getInscriptionsByActiviteId(env.DB, activiteId);
  
  if (!activite) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Activité non trouvée</h1>
        <p className="mb-6">L'activité que vous recherchez n'existe pas ou a été supprimée.</p>
        <Link 
          href="/activites" 
          className="bg-pmu-green hover:bg-pmu-green-dark text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Retour à la liste des activités
        </Link>
      </div>
    );
  }
  
  const estComplet = activite.participants_inscrits >= activite.max_participants;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-pmu-green">{activite.nom}</h1>
        <span className="inline-block bg-pmu-green bg-opacity-10 text-pmu-green text-sm px-3 py-1 rounded-full mt-2 md:mt-0">
          {activite.categorie_nom}
        </span>
      </div>
      
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-pmu-green">Détails de l'activité</h2>
              <div className="space-y-3">
                <p className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(activite.date_activite).toLocaleDateString('fr-FR')}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Heure de début:</span>
                  <span>{activite.heure_debut}</span>
                </p>
                {activite.heure_fin && (
                  <p className="flex justify-between">
                    <span className="font-medium">Heure de fin:</span>
                    <span>{activite.heure_fin}</span>
                  </p>
                )}
                <p className="flex justify-between">
                  <span className="font-medium">Lieu:</span>
                  <span>{activite.lieu}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Organisateur:</span>
                  <span>{activite.organisateur}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Participants:</span>
                  <span className={estComplet ? 'text-pmu-red font-semibold' : ''}>
                    {activite.participants_inscrits} / {activite.max_participants}
                    {estComplet && ' (Complet)'}
                  </span>
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4 text-pmu-green">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{activite.description}</p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4 text-pmu-green">Participants inscrits</h2>
            {inscriptions.length > 0 ? (
              <ul className="divide-y">
                {inscriptions.map((inscription) => (
                  <li key={inscription.id} className="py-2">
                    <p className="font-medium">{inscription.nom_participant}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Aucun participant inscrit pour le moment.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-pmu-green">S'inscrire à cette activité</h2>
          
          {estComplet ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
              <p className="text-pmu-red font-medium">Cette activité est complète. Il n'est plus possible de s'y inscrire.</p>
            </div>
          ) : (
            <form action={`/api/inscriptions?activiteId=${activite.id}`} method="POST" className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium mb-1">Votre nom *</label>
                <input 
                  type="text" 
                  id="nom" 
                  name="nom" 
                  required 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pmu-green"
                  placeholder="Ex: Jean Dupont"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Votre email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pmu-green"
                  placeholder="Ex: jean.dupont@example.com"
                />
              </div>
              
              <button 
                type="submit"
                className="bg-pmu-red hover:bg-pmu-red-dark text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                S'inscrire à l'activité
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Link 
          href="/activites" 
          className="text-pmu-green hover:text-pmu-green-dark font-medium"
        >
          ← Retour à la liste des activités
        </Link>
      </div>
    </div>
  );
}
