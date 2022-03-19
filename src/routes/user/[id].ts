import db from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);

  const user = await db.user.findFirst({ where: { id } });

  if (!user) {
    return {
      status: 404,
      body: {
        error: 'User not found'
      }
    }
  }

  return {
    body: { user }
  }
}

export const del: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    await db.user.delete({ where: { id } });
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
    status: 204
  }
}

export const put: RequestHandler = async ({ request }) => {
  const user = await request.json();
  const id = parseInt(user.id);

  try {
    const existingUser = await db.user.findFirst({ where: { id: id } });

    if (!existingUser) {
      return {
        status: 404,
        body: {
          error: 'User not found'
        }
      }
    }

    await db.user.update({
      where: { id: user.id },
      data: user
    });
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
    status: 204
  }
}