import express from 'express'
import { dailiesRouter } from './routes/dailies-router'

const app = express()
const port = process.env.PORT || 5000

const parseBodyMiddleware = express.json()
app.use(parseBodyMiddleware)

export const db = {
  dailies: [
    { id: 1, name: 'Walking', exp: 13000 },
    { id: 2, name: 'Warm up', exp: 7000 },
    { id: 3, name: 'Job', exp: 26000 },
    { id: 4, name: 'NLP', exp: 17000 },
  ]
}

app.get('/', (req, res) => {
  res.send('Hello boys! Let\' practice a little')
})
app.get('/joyme', (req, res) => {
  res.send('Hello Joyme!')
})

app.use('/dailies', dailiesRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
