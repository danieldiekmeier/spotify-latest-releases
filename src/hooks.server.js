import { env } from '$env/dynamic/private'
import { handleSession } from 'svelte-kit-cookie-session'
import { sequence } from '@sveltejs/kit/hooks'

const secret = env.SESSION_SECRET

const sessionHandler = handleSession({
  key: 'releases.session',
  secret,
  rolling: true,
  expires: 7,
})

export const handle = sequence(sessionHandler)
