const Koa = require('koa')
const Router = require('koa-router')
const SpotifyWebApi = require('spotify-web-api-node')
const _ = require('lodash')
const bluebird = require('bluebird')
const moment = require('moment')
const serve = require('koa-static')
const path = require('path')

const config = require('../config')

const router = Router()
const app = new Koa()
const spotifyApi = new SpotifyWebApi(config)

router.get('/callback', async (ctx, next) => {
  const { code } = ctx.request.query

  const data = await spotifyApi.authorizationCodeGrant(code)

  // console.log('The token expires in ' + data.body['expires_in'])
  // console.log('The access token is ' + data.body['access_token'])
  // console.log('The refresh token is ' + data.body['refresh_token'])

  // Set the access token on the API object to use it in later calls
  // spotifyApi.setAccessToken(data.body['access_token'])
  // spotifyApi.setRefreshToken(data.body['refresh_token'])

  ctx.cookies.set('token', data.body['access_token'], {
    httpOnly: false,
    maxAge: 60 * 60 * 1000,
    overwrite: true
  })

  ctx.response.redirect('/')
})

app
  .use(serve(path.resolve(__dirname, '../dist')))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port)
