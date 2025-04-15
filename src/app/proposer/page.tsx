import { getCategories } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';

export default async function ProposerActivite() {
  const { env } = getCloudflareContext();
  const categories = await getCategories(env.DB);
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pmu-green">Proposer une activité sportive</h1>
      
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <form action="/api/activites" method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'activité *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
                placeholder="Ex: Match de football"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date_activite"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
              />
            </div>
            
            <div>
              <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie *
              </label>
              <select
                id="categorie"
                name="categorie_id"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.nom}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="heure_debut" className="block text-sm font-medium text-gray-700 mb-1">
                Heure de début *
              </label>
              <input
                type="time"
                id="heure_debut"
                name="heure_debut"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
              />
            </div>
            
            <div>
              <label htmlFor="heure_fin" className="block text-sm font-medium text-gray-700 mb-1">
                Heure de fin
              </label>
              <input
                type="time"
                id="heure_fin"
                name="heure_fin"
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
              />
            </div>
            
            <div>
              <label htmlFor="lieu" className="block text-sm font-medium text-gray-700 mb-1">
                Lieu *
              </label>
              <input
                type="text"
                id="lieu"
                name="lieu"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
                placeholder="Ex: Stade municipal"
              />
            </div>
            
            <div>
              <label htmlFor="max_participants" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre maximum de participants *
              </label>
              <input
                type="number"
                id="max_participants"
                name="max_participants"
                required
                min="1"
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
                placeholder="Ex: 10"
              />
            </div>
            
            <div>
              <label htmlFor="organisateur" className="block text-sm font-medium text-gray-700 mb-1">
                Votre nom (organisateur) *
              </label>
              <input
                type="text"
                id="organisateur"
                name="organisateur"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
                placeholder="Ex: Jean Dupont"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:ring-pmu-green focus:border-pmu-green"
                placeholder="Décrivez l'activité, le niveau requis, l'équipement nécessaire, etc."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pmu-red hover:bg-pmu-red-dark text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Proposer l'activité
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6">
        <a href="/activites" className="text-pmu-green hover:underline">
          Retour à la liste des activités
        </a>
      </div>
    </div>
  );
}
