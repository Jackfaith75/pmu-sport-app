import { NextRequest, NextResponse } from 'next/server';
import { createCategorie } from '@/lib/db';
import { getCloudflareContext } from '@/lib/cloudflare';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const nom = formData.get('nom') as string;
    
    if (!nom) {
      return NextResponse.json(
        { error: 'Le nom de la catégorie est requis' },
        { status: 400 }
      );
    }
    
    const { env } = getCloudflareContext();
    await createCategorie(env.DB, nom);
    
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de la catégorie' },
      { status: 500 }
    );
  }
}
