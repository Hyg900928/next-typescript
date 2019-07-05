
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const mobxReact = require('mobx-react')

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()


mobxReact.useStaticRendering(true)

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()


    // --------------------------------- example config setting--------------------------------------
    router.get('/api/userInfo', (ctx) => {
        ctx.body = {
            name: 'jack',
            age: 11,
        }
    })
    router.get('/api/changeInfo', (ctx) => {
        ctx.body = {
            name: 'lily',
            age: 32,
        }
    })
    // example page.
    router.get('/example', async (ctx) => {
        const actualPage = '/example'
        const queryParams = {}
        await app.render(ctx.req, ctx.res, actualPage, queryParams)
    })
    router.get('/example/antd', async (ctx) => {
        const actualPage = '/example-antd'
        const queryParams = {}
        await app.render(ctx.req, ctx.res, actualPage, queryParams)
    })
    // ------------------------------------example end-------------------------------------------------
    // error page.
    router.get('/error', async (ctx) => {
        const actualPage = '/error'
        const queryParams = {}
        await app.render(ctx.req, ctx.res, actualPage, queryParams)
    })
    // root url, return home page. Just index page.
    router.get('/', async (ctx) => {
        const actualPage = '/index'
        const queryParams = { key: 'home' }
        await app.render(ctx.req, ctx.res, actualPage, queryParams)
    })
    router.get('', async (ctx) => {
        const actualPage = '/index'
        const queryParams = { key: 'home' }
        await app.render(ctx.req, ctx.res, actualPage, queryParams)
    })
    // other url, return 404 page
    router.get('*', async (ctx) => {
        await handle(ctx.req, ctx.res)
        // await app.render(ctx.req, ctx.res, '/404', {})
    })
    server.use(async (ctx, _next) => {
        ctx.res.statusCode = 200
        await _next()
    })

    server.use(router.routes()).use(router.allowedMethods())
    server.listen(PORT)
})
