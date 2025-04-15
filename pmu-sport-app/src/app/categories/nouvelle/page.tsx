import { getCategories } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';

export default async function NouvelleCategorie() {
  const { env } = getCloudflareContext();
  const categories = await getCategories(env.DB);
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Créer une nouvelle catégorie</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ajouter une catégorie</h2>
          <form action="/api/categories" method="post" className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Ex: Tennis"
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Créer la catégorie
            </button>
          </form>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Catégories existantes</h2>
          {categories.length > 0 ? (
            <ul className="divide-y">
              {categories.map((categorie) => (
                <li key={categorie.id} className="py-2">
                  {categorie.nom}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucune catégorie n'existe pour le moment.</p>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <a href="/" className="text-blue-600 hover:underline">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
