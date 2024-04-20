import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import * as z from 'zod'
import { redirect } from '@sveltejs/kit'

const tokenSchema = z.object({
  access_token: z.string(),
})

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
  const code = url.searchParams.get('code')

  const auth = new Buffer.from(
    publicEnv.PUBLIC_CLIENT_ID + ':' + env.CLIENT_SECRET
  ).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: publicEnv.PUBLIC_REDIRECT_URI,
    }),
  })

  const data = await response.json()
  const token = tokenSchema.parse(data).access_token
  await locals.session.update(() => ({ token }))

  redirect(302, '/');
}
