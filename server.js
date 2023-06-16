import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import fetch from 'ky'

const app = express()

app.use('/', express.static('public'))

app.disable('x-powered-by')

app.use(helmet())
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
	
	// if (response.status > 200 || response.status < 200) {
	// 	console.error(`Failed status: ${response.status} | ${response.statusText}`)
	// }

	const { data } = await response.json()

	res.json(data)
})

console.log(`App listening on port: 8000`)

app.listen(8000)