import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/db';

export const get: RequestHandler = async () => {
  const users = await db.user.findMany();

  return {
    body: { users }
  }
}

export const post: RequestHandler = async ({ request }) => {
  const user = await request.json();

  try {
    await db.user.create({ data: user });
  }
  catch (error) {
    return {
      status: 500,
      body: {
        error: error.message
      }
    }
  }

  return {
    status: 201
  }
}
