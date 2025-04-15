import { getCategories, getActivites } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';
import Image from 'next/image';

export default async function Home() {
  const { env } = getCloudflareContext();
  const categories = await getCategories(env.DB);
  const activites = await getActivites(env.DB);
  
  // Filtrer les activités à venir
  const today = new Date();
  const activitesAVenir = activites.filter(activite => {
    const dateActivite = new Date(activite.date_activite);
    return dateActivite >= today;
  }).slice(0, 5); // Limiter à 5 activités à venir
  
  return (
    <div className="space-y-8">
      <section className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-pmu-green">Bienvenue sur PMU Sport</h2>
            <p className="text-lg mb-4">
              Découvrez et rejoignez les activités sportives organisées par les collaborateurs du PMU.
              Vous pouvez également proposer vos propres activités !
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href="/activites" 
                className="bg-pmu-green hover:bg-pmu-green-dark text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Voir toutes les activités
              </a>
              <a 
                href="/proposer" 
                className="bg-pmu-red hover:bg-pmu-red-dark text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Proposer une activité
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <Image 
              src="/images/pmu-logo.png" 
              alt="PMU Sport Logo" 
              width={250} 
              height={150}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-pmu-green">Prochaines activités</h2>
        {activitesAVenir.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activitesAVenir.map((activite) => (
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
                    <a 
                      href={`/activites/${activite.id}`}
                      className="text-pmu-red hover:text-pmu-red-dark text-sm font-medium"
                    >
                      Voir détails →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-6 text-center">
            <p className="text-gray-600">Aucune activité à venir pour le moment.</p>
            <a 
              href="/proposer" 
              className="mt-4 inline-block text-pmu-red hover:text-pmu-red-dark font-medium"
            >
              Proposer une nouvelle activité
            </a>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-pmu-green">Catégories d'activités</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((categorie) => (
            <a 
              key={categorie.id}
              href={`/categories/${categorie.id}`}
              className="bg-white border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-pmu-green">{categorie.nom}</span>
            </a>
          ))}
          <a 
            href="/categories/nouvelle"
            className="bg-white border border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors text-pmu-red"
          >
            <span className="font-medium">+ Nouvelle catégorie</span>
          </a>
        </div>
      </section>
    </div>
  );
}
