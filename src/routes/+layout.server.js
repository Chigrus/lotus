import * as db from '$lib/server/db';
 
/** @type {import('./$types').PageServerLoad} */
export async function load({ locals  }) {
  return {
    menu: await db.getMenu(locals),
  };
}
