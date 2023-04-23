import type { Action } from '@sveltejs/kit';
import * as db from '$lib/server/db';
import * as token from '$lib/server/token';
 
export const load:Action= async ({ locals, params, cookies }) => {
  let post = await db.getSinglePost(locals, params.slug);
  let og_id = post[0].og_id;
  return {
    og_data: await db.getOG(locals, og_id),
    post: post,
    user: await token.getUser(cookies),
  };
}
