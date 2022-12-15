import express from 'express'
import { dailiesRouter } from './routes/dailies-router'
import { DailiesViewModel } from './models/dailies/DailiesViewModel'

const app = express()
const port = process.env.PORT || 5000

const parseBodyMiddleware = express.json()
app.use(parseBodyMiddleware)

export const db: { dailies: DailiesViewModel[] } = {
  dailies: [
    { id: 1, title: 'Walking', exp: 13000 },
    { id: 2, title: 'Warm up', exp: 7000 },
    { id: 3, title: 'Job', exp: 26000 },
    { id: 4, title: 'NLP', exp: 17000 },
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
