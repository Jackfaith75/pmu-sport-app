import { getActivites, getCategories } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';
import Link from 'next/link';
import ActivitesFilter from '../components/ActivitesFilter';

export default async function Activites() {
  const { env } = getCloudflareContext();
  const activites = await getActivites(env.DB);
  const categories = await getCategories(env.DB);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-pmu-green">Toutes les activités</h1>
        
        {/* Composant client pour le filtrage */}
        <div className="mt-4 md:mt-0">
          <ActivitesFilter 
            categories={categories} 
            onFilterChange={(categorieId) => {
              // Cette fonction sera exécutée côté client
              console.log('Filtrage côté client');
            }} 
          />
        </div>
      </div>
      
      {activites.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-pmu-green text-white">
              <tr>
                <th className="py-3 px-4 text-left">Activité</th>
                <th className="py-3 px-4 text-left">Catégorie</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Heure</th>
                <th className="py-3 px-4 text-left">Lieu</th>
                <th className="py-3 px-4 text-left">Organisateur</th>
                <th className="py-3 px-4 text-left">Participants</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {activites.map(activite => (
                <tr 
                  key={activite.id} 
                  className="hover:bg-gray-50 transition-colors"
                  data-categorie-id={activite.categorie_id.toString()}
                >
                  <td className="py-3 px-4">
                    <span className="font-medium">{activite.nom}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block bg-pmu-green bg-opacity-10 text-pmu-green text-xs px-2 py-1 rounded-full">
                      {activite.categorie_nom}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(activite.date_activite).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4">
                    {activite.heure_debut}
                  </td>
                  <td className="py-3 px-4">
                    {activite.lieu}
                  </td>
                  <td className="py-3 px-4">
                    {activite.organisateur}
                  </td>
                  <td className="py-3 px-4">
                    <span className={activite.participants_inscrits >= activite.max_participants ? 'text-pmu-red font-medium' : ''}>
                      {activite.participants_inscrits} / {activite.max_participants}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link 
                      href={`/activites/${activite.id}`}
                      className="text-pmu-red hover:text-pmu-red-dark text-sm font-medium"
                    >
                      Voir détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border rounded-lg p-6 text-center">
          <p className="text-gray-600">Aucune activité disponible pour le moment.</p>
          <Link 
            href="/proposer" 
            className="mt-4 inline-block text-pmu-red hover:text-pmu-red-dark font-medium"
          >
            Proposer une nouvelle activité
          </Link>
        </div>
      )}
      
      <div className="flex justify-end">
        <Link 
          href="/proposer" 
          className="bg-pmu-red hover:bg-pmu-red-dark text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Proposer une activité
        </Link>
      </div>
    </div>
  );
}
