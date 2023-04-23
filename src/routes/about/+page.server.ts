import type { Action } from '@sveltejs/kit';
import * as db from '$lib/server/db';
import * as token from '$lib/server/token';

let og_id = 55;
let post_id = 14;
 
export const load:Action= async ({ locals, cookies }) => {
  return {
    og_data: await db.getOG(locals, og_id),
    post: await db.getPost(locals, post_id),
    user: await token.getUser(cookies),
  };
}