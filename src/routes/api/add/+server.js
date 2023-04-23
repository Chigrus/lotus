import { json } from '@sveltejs/kit';
 
export async function POST({ request, locals }) {
  const { textPost } = await request.json();

  const { dbconn } = locals;

  const result = await dbconn.query(`UPDATE public.posts 
                                      SET post = $1 
                                      WHERE id = 14`, [JSON.stringify(textPost)]);               

  return json(result);
}