import { NextRequest, NextResponse } from 'next/server';
import { createActivite } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const activite = {
      nom: formData.get('nom') as string,
      description: formData.get('description') as string,
      date_activite: formData.get('date_activite') as string,
      heure_debut: formData.get('heure_debut') as string,
      heure_fin: formData.get('heure_fin') as string || null,
      lieu: formData.get('lieu') as string,
      max_participants: parseInt(formData.get('max_participants') as string),
      categorie_id: parseInt(formData.get('categorie_id') as string),
      organisateur: formData.get('organisateur') as string,
    };
    
    const { env } = getCloudflareContext();
    const activiteId = await createActivite(env.DB, activite);
    
    return NextResponse.redirect(new URL(`/activites/${activiteId}`, request.url));
  } catch (error) {
    console.error('Erreur lors de la création de l\'activité:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de l\'activité' },
      { status: 500 }
    );
  }
}
