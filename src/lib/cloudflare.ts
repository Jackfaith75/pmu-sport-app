import { D1Database } from '@cloudflare/workers-types';

export interface CloudflareContext {
  env: {
    DB: D1Database | null;
  };
}

export function getCloudflareContext(): CloudflareContext {
  return {
    env: {
      // En déploiement statique, DB sera toujours null
      DB: null
    }
  };
}
