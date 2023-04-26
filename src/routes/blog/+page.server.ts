import type { Action } from '@sveltejs/kit';
import * as db from '$lib/server/db';
import * as token from '$lib/server/token';

type User = {
  isAdmin: boolean; 
  isEditor: boolean;
}

let cat_id = 1;
 
export const load:Action= async ({ locals, cookies }) => {
  let user:User = await token.getUser(cookies);
  return {
    posts: await db.getPosts(locals, cat_id, user),
  };
}
