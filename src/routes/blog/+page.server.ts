import type { Action } from '@sveltejs/kit';
import * as db from '$lib/server/db';

let cat_id = 1;
 
export const load:Action= async ({ locals }) => {
  return {
    posts: await db.getPosts(locals, cat_id),
  };
}
