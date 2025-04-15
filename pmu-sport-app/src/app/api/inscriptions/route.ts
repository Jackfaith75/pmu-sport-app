import { NextRequest, NextResponse } from 'next/server';
import { createInscription, getActiviteById } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activiteId = parseInt(searchParams.get('activiteId') || '0');
    
    if (!activiteId) {
      return NextResponse.json(
        { error: 'ID d\'activité manquant' },
        { status: 400 }
      );
    }
    
    const { env } = getCloudflareContext();
    
    // Vérifier si l'activité existe et s'il reste des places
    const activite = await getActiviteById(env.DB, activiteId);
    if (!activite) {
      return NextResponse.json(
        { error: 'Activité non trouvée' },
        { status: 404 }
      );
    }
    
    const placesDisponibles = activite.max_participants - (activite.participants_inscrits || 0);
    if (placesDisponibles <= 0) {
      return NextResponse.json(
        { error: 'Cette activité est complète' },
        { status: 400 }
      );
    }
    
    const formData = await request.formData();
    
    const inscription = {
      activite_id: activiteId,
      nom_participant: formData.get('nom') as string,
      email_participant: formData.get('email') as string,
    };
    
    await createInscription(env.DB, inscription);
    
    return NextResponse.redirect(new URL(`/activites/${activiteId}?inscription=success`, request.url));
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}
