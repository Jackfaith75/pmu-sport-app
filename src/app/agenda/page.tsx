import { getActivites } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';
import Link from 'next/link';
import AgendaFilter from '../components/AgendaFilter';

export default async function Agenda() {
  const { env } = getCloudflareContext();
  const activites = await getActivites(env.DB);
  
  // Organiser les activités par date
  const activitesParDate = activites.reduce((acc, activite) => {
    const date = activite.date_activite;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activite);
    return acc;
  }, {} as Record<string, typeof activites>);
  
  // Trier les dates
  const datesSorted = Object.keys(activitesParDate).sort();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-pmu-green">Agenda des activités</h1>
        
        {/* Composant client pour le filtrage */}
        <div className="mt-4 md:mt-0">
          <AgendaFilter 
            dates={datesSorted} 
            onFilterChange={(date) => {
              // Cette fonction sera exécutée côté client
              console.log('Filtrage côté client');
            }} 
          />
        </div>
      </div>
      
      {datesSorted.length > 0 ? (
        <div className="space-y-8">
          {datesSorted.map(date => (
            <div key={date} data-date={date} className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-pmu-green text-white px-6 py-3">
                <h2 className="text-lg font-semibold">
                  {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
              </div>
              <div className="divide-y">
                {activitesParDate[date].map(activite => (
                  <div key={activite.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{activite.nom}</h3>
                          <span className="inline-block bg-pmu-green bg-opacity-10 text-pmu-green text-xs px-2 py-1 rounded-full">
                            {activite.categorie_nom}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Heure:</span> {activite.heure_debut} {activite.heure_fin ? `- ${activite.heure_fin}` : ''}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Lieu:</span> {activite.lieu}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Organisateur:</span> {activite.organisateur}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                        <span className="text-sm text-gray-600">
                          {activite.participants_inscrits} / {activite.max_participants} participants
                        </span>
                        <Link 
                          href={`/activites/${activite.id}`}
                          className="mt-2 md:mt-4 text-pmu-red hover:text-pmu-red-dark text-sm font-medium"
                        >
                          Voir détails →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-lg p-6 text-center">
          <p className="text-gray-600">Aucune activité à venir pour le moment.</p>
          <Link 
            href="/proposer" 
            className="mt-4 inline-block text-pmu-red hover:text-pmu-red-dark font-medium"
          >
            Proposer une nouvelle activité
          </Link>
        </div>
      )}
    </div>
  );
}
