import { networkInterfaces } from 'node:os'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import fetch from 'ky'

const API_ALWAYS_PREPARED_SPELLS = "https://character-service.dndbeyond.com/character/v5/game-data/always-prepared-spells?sharingSetting=2"
const networks = networkInterfaces()
const netResults = {}
const app = express()

app.use('/', express.static('public'))

app.disable('x-powered-by')

app.use(helmet())
app.use(morgan('tiny'))

app.get('/get-always-prepped-spells', async (req, res) => {
	const [,params]= req.originalUrl.split('?')

	const response = await fetch(`${API_ALWAYS_PREPARED_SPELLS}&${params}`)
	
	if (response.status > 200 || response.status < 200) {
		console.error(`Failed status: ${response.status} | ${response.statusText}`)
	}

	const { data } = await response.json()

	res.json(data)
})

const PORT = (() => {
  if (process.env.PORT !== undefined) {
    if (parseInt(process.env.PORT) !== NaN) {
      return parseInt(process.env.PORT)
    }
  }

  return 8000
})()

// getting local ip addresses
for (const name of Object.keys(networks)) {
  for (const net of networks[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!netResults[name]) {
        netResults[name] = [];
      }
      netResults[name].push(net.address);
    }
  }
}

app.listen(PORT)

console.log(`App now listening on addresses:\n\n`)
console.log(`http://localhost:${PORT}`)
console.log(`http://127.0.0.1:${PORT}`)

for (const name in netResults) {
  console.log(`http://${netResults[name][0]}:${PORT} - NETWORK_NAME: [${name}]`)
}
