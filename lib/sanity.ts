// lib/sanity.ts

import { createClient } from "@sanity/client";

export const client = createClient({
  // --- Utilise les variables d'environnement pour garder vos clés secrètes ---

  // Votre Project ID Sanity (trouvé sur manage.sanity.io ou dans sanity.json)
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

  // Le nom de votre "dataset" (généralement "production")
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  
  // La date de la version de l'API à utiliser. Important pour éviter les mauvaises surprises.
  apiVersion: "2024-01-01", 

  /**
   * Mettez `useCdn` à `true` en production pour des performances optimales.
   * En développement (`false`), vous aurez toujours les données les plus fraîches.
   */
  useCdn: process.env.NODE_ENV === 'production',
});