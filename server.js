import express, { response } from 'express'
import morgan from 'morgan'
// import cors from 'cors'
import fetch from 'ky'
// import helmet from 'helmet'

const app = express()

app.use('/', express.static('public'))

app.disable('x-powered-by')

// app.use(cors())
app.use(morgan('tiny'))

app.get('/get-always-prepped-spells', async (req, res) => {
	const {
		classId,
		classLevel,
		campaignId,
	} = req.query

	const API_ALWAYS_PREPARED_SPELLS = "https://character-service.dndbeyond.com/character/v5/game-data/always-prepared-spells?sharingSetting=2"
	const requestURL = `${API_ALWAYS_PREPARED_SPELLS}&classLevel=${classLevel}&classId=${classId}${campaignId ? `&campaignId=${campaignId}` : ''}`

	const response = await fetch(requestURL) 

	const { data } = await response.json()

	res.json(data)
})

console.log(`App listening on port: 8000`)

app.listen(8000)

// import { serve } from 'esbuild'
// import { 
// 	request,
// 	createServer 
// } from 'node:http'

// serve({
// 	servedir: 'public'
// }, {
// 	bundle: true,
// 	sourcemap: true,
// 	entryPoints: ['src/site.ts']
// })
// .then(({ port, host }) => {
// 	const proxyPort = 5000

// 	console.log(`Started proxy server on: ${host}:${port}`)

// 	createServer((req, res) => {
// 		res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none')

// 		const opts = {
// 			hostname: host,
// 			path: req.url,
// 			method: req.method,
// 			headers: req.headers,
// 			port,
// 		}

// 		const proxyReq = request(opts, (proxy) => {
// 			res.writeHead(proxy.statusCode, proxy.headers)
// 			proxy.pipe(res, { end: true })
// 		})

// 		req.pipe(proxyReq)
// 	})
// 	.listen(proxyPort)

// 	console.log(`Proxy listening on ${host}:${proxyPort}`)
// })