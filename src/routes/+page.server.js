import * as db from '$lib/server/db';
 
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
  return {
    post: await db.getMenu(locals)
  };
}
