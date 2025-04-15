'use client';

import { useState, useEffect } from 'react';

export default function ActivitesFilter({ categories, onFilterChange }) {
  const [selectedCategorie, setSelectedCategorie] = useState('all');

  const handleCategorieChange = (e) => {
    const categorieId = e.target.value;
    setSelectedCategorie(categorieId);
    onFilterChange(categorieId);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="categorie-filter" className="text-sm font-medium">Filtrer par catégorie:</label>
      <select 
        id="categorie-filter" 
        className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pmu-green"
        value={selectedCategorie}
        onChange={handleCategorieChange}
      >
        <option value="all">Toutes les catégories</option>
        {categories.map(categorie => (
          <option key={categorie.id} value={categorie.id.toString()}>
            {categorie.nom}
          </option>
        ))}
      </select>
    </div>
  );
}
