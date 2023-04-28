import type { Action } from '@sveltejs/kit';
import * as db from '$lib/server/db';
import * as token from '$lib/server/token';

type User = {
  isAdmin: boolean; 
  isEditor: boolean;
}

let cat_id:number = 1;
let og_id:number = 4;
 
export const load:Action= async ({ locals, cookies }) => {
  let user:User = await token.getUser(cookies);
  return {
    og_data: await db.getOG(locals, og_id),
    posts: await db.getPosts(locals, cat_id, user),
    user: await token.getUser(cookies),
  };
}
