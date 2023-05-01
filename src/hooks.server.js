import { handleSession } from 'svelte-kit-cookie-session'
import { sequence } from '@sveltejs/kit/hooks'

const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

const sessionHandler = handleSession({
  key: 'releases.session',
  secret,
  rolling: true,
  expires: 7,
})

export const handle = sequence(sessionHandler)
