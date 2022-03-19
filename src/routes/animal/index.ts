import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';

export const get: RequestHandler = async () => {
  const animals = await db.animal.findMany();

  return {
    body: animals,
  }
}
